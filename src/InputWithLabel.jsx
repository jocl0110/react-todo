import React, { useRef } from "react";

const InputWithLabel = (props) => {
        const inputRef = useRef();
        React.useEffect(() => {
            inputRef.current.focus();
        })
    return(
        <span>
        <label htmlFor={props.id}>{props.children}</label>
        <input 
            id={props.id}
            name={props.name} 
            required={props.required}
            value={props.value} 
            onChange={props.onChange}
            ref={inputRef}
        />
        </span>
    );
}



export default InputWithLabel