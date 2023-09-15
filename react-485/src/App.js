import React, { useState } from 'react';
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
  if(isAuthenticated){
    console.log(user.sub);
  }

  function handleAddInput(name, inputVal) {
    setInput(prevInput => {
      let updatedInput = { ...prevInput, [name]: inputVal };

      if (name === 'Pt1Line6_Gender[1]' && updatedInput['Pt1Line6_Gender[0]']) {
        delete updatedInput['Pt1Line6_Gender[0]'];
      } else if (name === 'Pt1Line6_Gender[0]' && updatedInput['Pt1Line6_Gender[1]']) {
        delete updatedInput['Pt1Line6_Gender[1]'];
      }
      return updatedInput;
    });
}

  function handleSubmit() {
    const data = {
        'ID': user.sub,
        'values': JSON.stringify(input)
    };
    const inputData = Object.entries(input);
    console.log("Data to be saved:", inputData);
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
            userId: user.sub
          }
        });
      console.log(response.data);
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
              <div style={{ height: '30px' }}></div>
              <LoginButton />
              <Form onAddInput={handleAddInput} input={input} />
              <Flex direction="row" gap="1rem">
                <Button onClick={handleSubmit} disabled={!isAuthenticated}>Save</Button>
                <Button onClick={generatePDF} disabled={!isAuthenticated}>Download PDF</Button>
              </Flex>
            </Flex>
          </View>
      );
    }

// TODO: reset button, make the inputs stay after logging out