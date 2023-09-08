import React, { useState } from 'react';
import { fields } from './fields';
import { Flex, TextField } from '@aws-amplify/ui-react';
import { useAuth0 } from '@auth0/auth0-react';


export default function Form({ label, name, onAddInput }) {
    const { isAuthenticated } = useAuth0();

    const fieldsArray = fields.map((field, idx) => 
            <TextField
                key ={idx}
                label={field.label}
                name={field.name}
                onChange={e =>onAddInput(field.name, e.target.value)}
                disabled={!isAuthenticated}
                errorMessage="There is an error"
            />
    );
        return (
            <>{fieldsArray}</>
        )
}