import { useEffect } from "react";
import React, { useRef } from "react";

interface InputProps {
  id: string;
  required?: boolean;
  value: string;
  onChange: (Event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, required, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });
  return (
    <div className="input-container">
      <input
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        ref={inputRef}
        placeholder="What do you want to do?"
        type="text"
      />
    </div>
  );
};

export default Input;
