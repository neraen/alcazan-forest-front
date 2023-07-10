import React from 'react';

const Field = ({name, label, value, onChange, placeholder = "", type = "text", error = "", disabled = "", enableStyle= true}) => {
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input value={value}
                   onChange={onChange}
                   type={type} id={name}
                   placeholder={placeholder || label}
                   name={name}
                   disabled= {disabled}
                   className={(enableStyle && "form-control") + (error && " is-invalid")}/>
        {error && <p className="invalid-feedback">{error}</p>}
        </div>
    )
}

export default Field;