import React from "react";
import { Flex, TextField } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

const InputBox = ({ label, attr, onChange }) => {
    return (
        <Flex>
            <TextField 
            label={label}
            attr={attr}
            onChange={onChange}
            errorMessage="There is an error"
            />
        </Flex>
    );
}
export default InputBox;