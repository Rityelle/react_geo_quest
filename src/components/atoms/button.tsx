
interface buttonProps {
    onPress: () => void;
    children?: React.ReactNode;
}

const Button: React.FC<buttonProps> = ({ onPress, children}) => {
    return(
        <button onClick={onPress} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
            {children}
        </button>
    )
}

export default Button;