import React, { useState } from 'react';
import { fields } from './fields';
import { Flex, TextField } from '@aws-amplify/ui-react';

export default function Form({ label, name, onAddInput }) {
    const fieldsArray = fields.map((field, idx) => 
        <React.Fragment key={idx}>
            <TextField 
                label={field.label}
                name={field.name}
                onChange={e =>onAddInput(field.name, e.target.value)}
                errorMessage="There is an error"
            />
        </React.Fragment>
        
    );
        return (
            <>
                {fieldsArray}
            </>
        )
};
