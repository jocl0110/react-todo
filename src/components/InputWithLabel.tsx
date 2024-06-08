import { useEffect } from "react";
import React, { useRef } from "react";
import PropTypes from 'prop-types';

interface InputWithLabelProps {
    id: string,
    required?: boolean,
    value: string,
    onChange: (Event: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({id, required, value, onChange, children}) => {
        const inputRef = useRef<HTMLInputElement>(null);
        useEffect(() => {
            if(inputRef.current)
            inputRef.current.focus();
        })
    return(
        <div className="input-container">
        <label htmlFor={id}>{children}Title</label>
        <input 
            id={id}
            required={required}
            value={value} 
            onChange={onChange}
            ref={inputRef}
            placeholder="Task"
            type="text"
        />
        
        </div>
    );
}

InputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
  };




export default InputWithLabel