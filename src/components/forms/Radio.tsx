import React from 'react';

const Field = ({name, label, value, onChange, error = "", disabled = ""}) => {
    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input value={value}
                   onChange={onChange}
                   type="radio" id={name}
                   name={name}
                   disabled= {disabled}
                   className={"form-control" + (error && " is-invalid")}/>
        {error && <p className="invalid-feedback">{error}</p>}
        </div>
    )
}

export default Field;