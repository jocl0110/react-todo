import React, { useRef } from "react";

const InputWithLabel = (props) => {
        const inputRef = useRef();
        React.useEffect(() => {
            inputRef.current.focus();
        })
    return(
        <div className="input-container">
        <label htmlFor={props.id}>{props.children}Title</label>
        <input 
            id={props.id}
            required={props.required}
            value={props.value} 
            onChange={props.onChange}
            ref={inputRef}
            placeholder="Task"
            type="text"
        />
        
        </div>
    );
}



export default InputWithLabel