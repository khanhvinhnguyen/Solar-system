// ModalDetail.jsx
import React, { useState } from "react";
import { Modal } from "antd";

const ModalDetail = ({ planetName, openModal }) => {
  console.log("ModalDetail: ", planetName, openModal);

  const [isModalOpen, setIsModalOpen] = useState(openModal);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {planetName}
    </Modal>
  );
};

export default ModalDetail;
