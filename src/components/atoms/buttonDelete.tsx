import React from 'react';

interface ButtonProps {
    onPress: () => void;
    children?: React.ReactNode;
}

const DeleteButton: React.FC<ButtonProps> = ({ onPress, children }) => {
    return (
        <button onClick={onPress} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
            {children}
        </button>
    );
};

export default DeleteButton;
