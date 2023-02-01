import React, { useState } from 'react';
import { fields } from './fields';

export default function Form({onAddInput}) {
    return(
        <>
            <label>{fields[0].label}</label>
            <input 
                name={fields[0].name}
                onChange={e =>onAddInput(fields[0].name, e.target.value)}
            />
            <label>{fields[1].label}</label>
            <input 
                onChange={e => onAddInput(fields[1].name, e.target.value)}
            />
            {/* <button onClick={() => {
                setInput('');
                onAddInput(input);
            }}>add</button> */}
        </>
    )
}