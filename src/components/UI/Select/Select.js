import React, {Component} from 'react';
import "./Select.scss"

const Select = props => {
    const htmlfor = `${props.label}- ${Math.random()}`


    return (
        <div className='Select'>
            <label htmlFor={htmlfor}>{props.label}</label>
            <select
                id={htmlfor}
                value={props.value}
                onChange={props.onChange}
            >
                {props.options.map((option, index) => {
                    return (
                        <option
                            value={option.value}
                            key={option.value + index}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select;