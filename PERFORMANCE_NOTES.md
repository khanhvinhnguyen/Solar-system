# Ghi chú tối ưu hiệu năng Three.js / react-three-fiber

> Khảo sát ngày 2026-07-22. Stack: `three@^0.165.0`, `@react-three/fiber@^8.16.8`, `@react-three/drei@^9.106.0`.

## Tóm tắt ưu tiên

**Lưu ý quan trọng: 2 loại "chậm" khác nhau, sửa ở 2 chỗ khác nhau:**
- **Chậm khi đang chạy (FPS/độ mượt)** → mục 1, 2 → runtime re-render.
- **Chậm lúc khởi động (start/load time)** → mục 4a (ISS lazy-load) → network payload. Đây là chỗ trả lời trực tiếp câu hỏi "vẫn tốn bằng đó thời gian để start".

1. ✅ **Đã sửa** — `setState` mỗi frame trong animation loop (9 file hành tinh) — cải thiện FPS/độ mượt
2. ✅ **Đã sửa** — Context Provider không memo hóa → re-render toàn cây — cải thiện FPS/độ mượt
3. ⬜ Quá nhiều shadow-casting point light
4. ✅ **Đã sửa (4a)** — ISS model (21MB) tải ngay từ đầu dù vô hình ở overview → giờ lazy-load — **cải thiện thời gian start**
   ⬜ (4b) Texture các hành tinh + dead assets vẫn chưa nén/dọn
5. ⬜ Vài chỗ nhỏ (memo sai, dead code, lỗi hình học)

> Build (`npm run build`) pass sau tất cả các lần sửa. Đã verify bằng Playwright thực tế (xem mục 4a) cho phần lazy-load; mục 1, 2 nên đo bằng React DevTools Profiler hoặc `r3f-perf` (`<Perf />` từ package `r3f-perf` đã có sẵn trong dependencies nhưng chưa được render trong `App.jsx` — thêm vào trong `<Canvas>` nếu muốn xem FPS/re-render trực quan).

---

## 1. `setState` mỗi frame trong `useFrame` (nghiêm trọng nhất) — ✅ Đã sửa

Cả 9 file hành tinh + Mặt Trăng đều lặp lại pattern:

```js
useFrame(({ clock }) => {
  if (planetSpeed !== 0) {
    mercuryRef.current.position.set(x, 0, z);   // ✅ mutate ref - đúng cách
    mercuryRef.current.rotation.y += ...;         // ✅ OK
    setCurrentMercuryPosition(new THREE.Vector3(x, 0, z)); // ❌ setState 60 lần/giây
  }
});
```

**File bị ảnh hưởng:**
- `src/component/scenes/mercury/Mercury.jsx:30`
- `src/component/scenes/venus/Venus.jsx:30`
- `src/component/scenes/earth/EarthStructure.jsx:59`
- `src/component/scenes/mars/Mars.jsx:31`
- `src/component/scenes/jupiter/Jupiter.jsx:29`
- `src/component/scenes/saturn/Saturn.jsx:33`
- `src/component/scenes/uranus/Uranus.jsx:30`
- `src/component/scenes/neptune/Neptune.jsx:31`
- `src/component/scenes/earth/Moon.jsx:30`

**Tại sao tệ:** Nguyên lý cốt lõi của r3f là mutate trực tiếp object3D (`ref.current.position`) trong animation loop, không bao giờ `setState` — vì object3D nằm ngoài React reconciliation, mutate nó không cần re-render. Ở đây mỗi hành tinh gọi `setState` mỗi frame chỉ để lưu vị trí lúc dừng (`planetSpeed === 0`), gây ra:
- ~540 lần re-render/giây cho toàn hệ (9 hành tinh × 60fps)
- Tạo `new THREE.Vector3()` mới mỗi frame → áp lực GC không cần thiết
- Cộng hưởng với vấn đề Context (mục 2) → lan re-render ra toàn cây

**Cách sửa:** thay `useState` bằng `useRef` để lưu vị trí tạm — chỉ cần đọc/ghi giá trị, không cần trigger render.

**Đã áp dụng:** cả 9 file (`Mercury`, `Venus`, `EarthStructure`, `Mars`, `Jupiter`, `Saturn`, `Uranus`, `Neptune`, `Moon`) đã đổi `const [currentXxxPosition, setCurrentXxxPosition] = useState(...)` thành `const currentXxxPosition = useRef(...)`, và trong `useFrame` đổi `setCurrentXxxPosition(new THREE.Vector3(x, 0, z))` thành `currentXxxPosition.current.set(x, 0, z)` (mutate tại chỗ, không tạo object mới, không setState).

---

## 2. Context Provider không được memo hóa — ✅ Đã sửa

- `src/component/context/settingContext.jsx:52-61` — `value={{...}}` tạo object mới mỗi lần Provider render, không bọc `useMemo`.
- `src/component/context/planetSelectContext.jsx:30-37` — tương tự.

Vì `planetSpeed` đổi liên tục khi kéo Slider, và mọi hành tinh đều `useContext(SettingContext)`, mỗi lần giá trị context đổi khiến **toàn bộ cây consumer re-render**.

**Cách sửa:** bọc value bằng `useMemo(() => ({...}), [deps])`.

**Đã áp dụng:** `settingContext.jsx` — bọc `toggleLanguage`, `toggleOrbitLine`, `handleSpeedPlanet` bằng `useCallback` (deps rỗng, dùng functional updater nên không cần deps) và bọc `value` bằng `useMemo`. `planetSelectContext.jsx` — bọc `selectPlanet` (dep `[handleSpeedPlanet]`) và `structurePlanet` bằng `useCallback`, bọc `value` bằng `useMemo`. Đã verify tất cả call site (`usePlanet()`, `useContext(SettingContext)`) vẫn destructure đúng field, không bị stale closure.

---

## 3. Shadow-casting lights quá nhiều

- `src/component/common/MainContainer.jsx:69` — `<ambientLight castShadow>` (prop vô nghĩa, ambient light không cast shadow được, harmless nhưng thừa)
- `src/component/common/MainContainer.jsx:70-77` — 1 `pointLight castShadow intensity={2} distance={100}`
- `src/component/scenes/sun/Sun.jsx:59-66` — thêm 1 `pointLight castShadow intensity={100} distance={10000}`
- `src/component/scenes/focus/Focus.jsx:32-39` — khi focus vào hành tinh, thêm 1 point light castShadow nữa

→ **2-3 point light cast shadow cùng lúc.** Point light shadow map dùng cube map 6 mặt — mỗi light phải render lại scene tối đa 6 lần/frame chỉ để tạo shadow, nhân với ~9 mesh có `castShadow receiveShadow`. Không có `shadow-mapSize` nào được set ở bất kỳ đâu trong `src` → three.js dùng default (512×512) × 6 mặt × 2-3 lights.

**Cách sửa:** bỏ `castShadow` khỏi ambientLight, giảm còn 1 light cast shadow duy nhất, hoặc set `shadow-mapSize` thấp hơn, hoặc tắt hẳn shadow (bóng đổ không quan trọng khi nhìn hệ mặt trời từ xa).

---

## 4. Asset nặng / dead assets

### 4a. ISS model (21MB) tải ngay từ đầu — ✅ Đã sửa — đây là fix chính cho "thời gian start"

**Phát hiện:** `public/ISSModel/` nặng **21MB** (gltf + bin + 15 `baseColor_*.png` + 4 `normal_*.png`, không nén) — chiếm **~70% tổng dung lượng asset** của toàn app (tổng asset ~30MB: 21MB ISS + ~8.9MB texture hành tinh). Trước khi sửa, `EarthStructure.jsx` render `<ISS />` **vô điều kiện** (`{!showStructure && <ISS />}`) — nghĩa là ngay ở overview ban đầu (khi chưa chọn hành tinh nào), toàn bộ 21MB này đã bị tải, dù ISS ở scale 0.005 gần như vô hình ở góc nhìn tổng thể. Đây chính là lý do các fix runtime (mục 1, 2) không giúp giảm thời gian start — hai bottleneck hoàn toàn khác nhau (runtime re-render vs network payload lúc load).

**Cách sửa:** gate `<ISS />` chỉ mount khi thực sự focus vào Trái Đất (`selectedPlanet === "Earth"`), bọc trong `<Suspense fallback={null}>` cục bộ để khi ISS đang tải, chỉ phần ISS "biến mất" tạm thời chứ không kéo theo toàn bộ scene (vì `@react-three/fiber`'s `<Canvas>` tự bọc children trong 1 `React.Suspense` global — nếu không có Suspense cục bộ, bất kỳ component nào suspend cũng làm cả Canvas trắng xoá cho tới khi xong).

**Đã áp dụng:**
- `src/component/scenes/earth/EarthStructure.jsx` — đổi thành:
  ```jsx
  {selectedPlanet === "Earth" && !showStructure && (
    <Suspense fallback={null}>
      <ISS />
    </Suspense>
  )}
  ```
- `src/component/scenes/earth/ISS.jsx` — dọn luôn code chết (dead code bị comment) và sửa `useMemo(() => useGLTF(...))` (thiếu deps, gọi hook trong callback — sai) thành gọi `useGLTF(...)` trực tiếp (drei đã tự cache theo URL, không cần `useMemo` bọc ngoài).

**Đã verify bằng Playwright (headless Chromium) thực tế**, không chỉ đọc code:
| Bước | Kết quả đo được |
|---|---|
| Tải overview ban đầu (chưa chọn hành tinh) | **0 request** đến `/ISSModel/*` |
| Click chọn Trái Đất để focus | **21 request** đến `/ISSModel/*` bắt đầu tải ngay (gltf, bin, 15 baseColor, 4 normal) |
| Console browser | Không có lỗi/warning nào liên quan Suspense/ISS/React |
| UI | Focus view Trái Đất + panel thông tin vẫn hiển thị đúng |

→ Kết quả: **~21MB (≈70% tổng payload) không còn nằm trên critical path lúc khởi động app** — chỉ tải khi người dùng thực sự bấm vào Trái Đất.

### 4b. Texture hành tinh / dead assets — ⬜ Chưa sửa

- `src/assets/planetMap/*` (~65MB) là bản trùng lặp **không được import ở đâu trong `src`** — dead asset, nên xoá khỏi repo để giảm dung lượng clone (không ảnh hưởng runtime vì Vite không bundle file không import).
- Toàn bộ texture hành tinh (~7.8-8.9MB qua `public/assets`) vẫn tải eager ngay từ đầu qua `MainContainer.jsx:10-20` — hợp lý vì tất cả hành tinh đều hiện diện cùng lúc ở overview (không giống ISS, không thể lazy-load theo lựa chọn).
- Không dùng compressed texture (ktx2/basis) ở đâu trong dự án.
- Texture nặng nhất: `mercury_map.jpg` 952K, `earth_nightmap.jpeg` 896K, `mars_map.jpeg` 832K, `sun_map.jpg` 804K, `venus_map.jpeg` 764K.

**Cách sửa (nếu muốn giảm thêm thời gian start):** xoá `src/assets/planetMap`, nén/resize lại texture trong `public/assets` (giảm chất lượng jpg hoặc resize xuống độ phân giải thực tế cần dùng trên màn hình), chuyển sang ktx2/basis nếu cần giảm mạnh hơn nữa.

---

## 5. Các điểm nhỏ khác

- `src/component/scenes/earth/ISS.jsx:40` — `useMemo(() => useGLTF(...))` thiếu deps array (`useMemo(fn)` không có mảng deps thứ 2) → memo không có tác dụng gì.
- `src/component/scenes/saturn/Saturn.jsx:59-63` — `torusGeometry` args `[13.9, 2.5, 2, 100]`, radialSegments = 2 → ring sẽ trông như lăng trụ khi nhìn gần (lỗi hình học, không phải hiệu năng).
- `src/component/scenes/earth/Earth.jsx` — trùng lặp gần như 100% logic với `EarthStructure.jsx` nhưng không còn được import ở đâu (`MainContainer.jsx` và `Focus.jsx` đều dùng `EarthStructure`) — có thể xoá.
- Không có `React.memo` hay `useCallback` nào trong toàn bộ `src` — không bắt buộc phải thêm khắp nơi, nhưng đáng cân nhắc cho các component hành tinh sau khi sửa mục 1 và 2.
- Không dùng postprocessing (bloom, DOF...) — không phải vấn đề, chỉ là điểm cần biết nếu sau này muốn thêm hiệu ứng (sẽ tốn GPU đáng kể).

---

## Nguyên lý chung rút ra (áp dụng cho các dự án r3f khác)

1. **Animation loop không setState** — mutate object3D ref trực tiếp trong `useFrame`, không tạo state mới mỗi frame.
2. **Context value phải memo hóa** (`useMemo`) khi nằm trong cây có nhiều consumer đổi giá trị thường xuyên.
3. **Instancing** cho object lặp lại nhiều (dự án này đã làm đúng nhờ dùng `<Stars>` của drei — không cần sửa).
4. **Shadow rẻ = ít light cast shadow + shadow map size vừa đủ**, đặc biệt lưu ý point light tốn gấp 6 lần directional/spot light (cube map 6 mặt).
5. **Texture nên nén (ktx2/basis) và lazy-load theo nhu cầu**, không tải hết ngay từ đầu nếu không cần thiết.
