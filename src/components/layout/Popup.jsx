import { X } from "lucide-react";

const Popup = ({ onClose, children }) => {
  return (
    <div className="fixed flex flex-col justify-center items-center bg-mauve-950/80 top-0 left-0 w-full h-screen">
      <div className="w-full max-w-xl p-4 bg-mauve-600">
        <div className="mb-4 flex justify-end">
          <button onClick={() => onClose(false)} className="p-4 cursor-pointer">
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
