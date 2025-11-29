import React from "react";

import './Input.css';

export const Input = (props) => {
    const {
        min,
        label,
        type,
        name,
        step,
        value,
        required,
        onInputChange
    } = props;

    return (
        <label>
            {label}
            <input
                min={type === 'number' ? min: undefined}
                type={type}
                name={name}
                step={step}
                value={value}
                required={required}
                onChange={onInputChange}
            />
        </label>
    )
}