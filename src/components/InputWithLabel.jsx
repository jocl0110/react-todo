import React, { useRef } from "react";
import PropTypes from 'prop-types';

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

InputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node,
  };




export default InputWithLabel