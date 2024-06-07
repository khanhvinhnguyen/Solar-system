import React from "react";
import { useProgress } from "@react-three/drei";
import { Spin, Flex } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingOverlay = () => {
  const { progress } = useProgress();

  return (
    <div className="loading-overlay">
      <div className="loading-border" align="center" gap="middle">
        <Flex gap="small">
          {/* <Spin tip="Loading" size="large" /> */}
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 50,
                }}
                spin
              />
            }
          />
        </Flex>
      </div>
    </div>
  );
};

export default LoadingOverlay;
