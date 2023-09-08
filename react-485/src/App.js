
import React, { useState, useId } from 'react';
import './App.css';
import { Flex, Button, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Form from './Form';
import axios from 'axios';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';



export default function App() {
  const [input, setInput] = useState({});
  const { isAuthenticated, user } = useAuth0();
  const apiGatewayEndpoint = 'https://7ctegn7d3j.execute-api.us-west-2.amazonaws.com/dev'

  function handleAddInput(name, inputVal){
    setInput(()=> {
      return{
        ...input,
        [name]: inputVal,
      };
    });
  }

  function handleSubmit() {
    const inputData = Object.entries(input);
    console.log(inputData);

    const data = {
        'ID': user.email,
        'values': JSON.stringify(input)
    };

    axios.post(apiGatewayEndpoint, data)
    .then(response => {
      if (response.status === 200) {
        alert("Data successfully saved.");
      } else {
        alert("An error occurred while saving data.");
      }
    })
    .catch(error => {
      console.error('An error occurred:', error);
      alert('An error occurred while saving data.');
    });
  }


  //triggers the lambda function 'generatePDF' when click 'download PDF' button
  async function generatePDF() {
    try {
        const response = await axios.get(apiGatewayEndpoint, {
          params: {
            userId: user.email
          }
        });
      console.log(response.data);
      const alertMessage = response.data['body'];
      const downloadURL = response.data['url'];
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
              <LoginButton />
              <Form onAddInput={handleAddInput} />
              <Flex direction="row" gap="1rem">
                <Button onClick={handleSubmit} disabled={!isAuthenticated}>Save</Button>
                <Button onClick={generatePDF} disabled={!isAuthenticated}>Download PDF</Button>
              </Flex>
            </Flex>
          </View>
      );
    }