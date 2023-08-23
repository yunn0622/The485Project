import React from "react";
import { Flex, TextField } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

const InputBox = ({ label, name, onChange }) => {

    return (
        <Flex>
            <TextField 
                label={label}
                name={name}
                onChange={onChange}
                errorMessage="There is an error"
            />
        </Flex>
    );
}
export default InputBox;