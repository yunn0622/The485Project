
import React, { Component, useState } from 'react';
import './App.css';
import { Flex, Button, ButtonGroup, View, TextField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Form from './Form';
import axios from 'axios';


export default function App() {
  const [input, setInput] = useState({});

  function handleAddInput(name, inputVal){
    setInput(()=> {
      return{
        ...input,
        [name]: inputVal,
      };
    });
  }

  function handleSubmit() {
    const inputData = Object.entries(input)
    console.log(inputData)
    inputData.map(([key, value]) => {
      const data = {'key': key, 'value': value}
      console.log('data ', data)
      axios.post('https://7ctegn7d3j.execute-api.us-west-2.amazonaws.com/dev', data)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    })
  }

  return(
     <View>
        <Flex direction="column" padding="2rem" alignItems="center">
          <Form onAddInput={handleAddInput}/>
          {/* <InputBox 
            label={fields[0].label}
            // name={fields[0].name}
            onChange={e => handleAddInput(fields[0].name, e.target.value)}
            />
          <InputBox 
            label={fields[1].label}
            // name={fields[1].name}
            onChange={e => handleAddInput(fields[1].name, e.target.value)}
            /> */}
        <View direction="row">
          <ButtonGroup>
            <Button
              loadingText=""
              type="submit"
              onClick={e => handleSubmit()}
            >
              Save
            </Button>
            <Button
              gap="2rem"
              loadingText=""
              onClick={() => alert('')}
            >
              Download PDF
            </Button>
          </ButtonGroup>  
          </View>
        </Flex>
      </View>
  );
}