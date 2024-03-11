import React from 'react';

interface ButtonProps {
    onPress: () => void;
    children?: React.ReactNode;
}

const ExportButton: React.FC<ButtonProps> = ({ onPress, children }) => {
    return (
        <button onClick={onPress} style={{ backgroundColor:"#29E0A9" }} className=" text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
            {children}
        </button>
    );
};

export default ExportButton;
