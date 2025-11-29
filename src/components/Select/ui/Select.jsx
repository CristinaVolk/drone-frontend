import React from "react";

export const Select = (props) => {
    const {
        label,
        name,
        value,
        onSelectionChange,
        options
    } = props;

    return (

        <label>
            {label}
            <select
                name={name}
                value={value}
                onChange={onSelectionChange}
            >
                {
                    options.map(option =>(
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))
                }
            </select>
        </label>
    );
}