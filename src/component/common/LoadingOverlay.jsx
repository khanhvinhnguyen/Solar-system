// src/component/common/LoadingOverlay.tsx
import React from "react";
import { useProgress } from "@react-three/drei";
import { Spin } from "antd";

const LoadingOverlay: React.FC = () => {
  const { progress } = useProgress();

  return (
    <div className="loading-overlay">
      <div align="center" gap="middle">
        <Spin size="large" />
        <p>{progress.toFixed(2)}% loaded</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
