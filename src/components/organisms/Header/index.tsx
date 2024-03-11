import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"; 

interface headerProps {
  title?: string
  onPress?: () => void; 
}

const Header: React.FC<headerProps> = ({ title, onPress }) => {
  return (
    <aside style={{ backgroundColor: "#202224" }} className="h-20 flex items-center">
       {onPress && (
        <button onClick={onPress} className=" flex items-start text-white ml-8">
          <ArrowBackIosIcon />
          <span>Voltar</span>
        </button>
      )}
      <div className="flex justify-center w-full">
        <span style={{ color: "#29E0A9", fontSize: 32 }}>
          React Geo Quest - POWER2GO {title}
        </span>
      </div>
    </aside>
  );
};

export default Header;
