import React from "react";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onPress?: () => void;
  label?: string;
  children?: React.ReactNode;
}

const SimpleModal: React.FC<ModalProps> = ({
  open,
  onClose,
  label,
  children
}) => {
  return (
    <Modal
      className="flex items-center justify-center"
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        style={{
          width: "500px",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#16181A",
          borderRadius: "5px",
          gap: "40px",
        }}
      >
        <Typography id="modal-description" className="text-white text-center">
          {label}
        </Typography>
        
        {children}
      </div>
    </Modal>
  );
};

export default SimpleModal;
