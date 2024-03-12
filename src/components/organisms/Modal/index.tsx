import React from "react";
import SimpleModal from "@/components/atoms/simpleModal";
import ExportButton from "@/components/atoms/buttonExport";
import Button from "@/components/atoms/button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onPress?: () => void;
  label?: string;
}

const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  label,
  onPress,
}) => {
  return (
    <SimpleModal onClose={onClose} open={open} label={label} onPress={onPress}>
      <div className="ml-64 flex flex-row w-full gap-4">
        {onPress && (
          <ExportButton onPress={onPress}>Check history</ExportButton>
        )}
        <Button onPress={onClose}>OK</Button>
      </div>
    </SimpleModal>
  );
};

export default CustomModal;
