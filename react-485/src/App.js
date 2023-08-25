
import React, { useState, useId } from 'react';
import './App.css';
import { Flex, Button, ButtonGroup, View, TextField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Form from './Form';
import axios from 'axios';


export default function App() {
  const [input, setInput] = useState({});
  // const userId = useId();
  const apiGatewayEndpoint = 'https://7ctegn7d3j.execute-api.us-west-2.amazonaws.com/dev'

  function handleAddInput(name, inputVal){
    setInput(()=> {
      return{
        ...input,
        [name]: inputVal
      };
    });
  }

  function handleSubmit() {
    const inputData = Object.entries(input);
    console.log(inputData);
  
    Promise.all(
      inputData.map(([key, value]) => {
        // why did I make uniqueID??
        // const uniqueID = userId + key;
        // const data = { 'ID': uniqueID, 'key': key, 'value': value };
        const data = { 'ID': key, 'value': value };
  
        return axios.post(apiGatewayEndpoint, data);
      })
    )
    .then(responses => {
  
      const successCount = responses.filter(res => res.status === 200).length;
      const errorCount = responses.length - successCount;
  
      const alertMessage = `Data saved: ${successCount} items. Errors: ${errorCount} items.`;
      alert(alertMessage);
    })
    .catch(error => {
      console.error('An error occurred:', error);
      alert('An error occurred while saving data.');
    });
  }


  //triggers the lambda function 'generatePDF' when click 'download PDF' button
  async function generatePDF() {
    try {
      const response = await axios.get(apiGatewayEndpoint
      );
      // console.log(response.data);
      const alertMessage = response.data['body'];
      const downloadURL = response.data['url'];
      alert(alertMessage);
      window.open(downloadURL);
      return response.data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }
  
  return (
    <View>
      <Flex direction="column" padding="2rem" alignItems="center">
        <Form onAddInput={handleAddInput} />
        <ButtonGroup>
          <Button onClick={handleSubmit}>Save</Button>
          <Button gap="2rem" onClick={generatePDF}>Download PDF</Button>
        </ButtonGroup>
      </Flex>
    </View>
  );
  




}