import React, { Component } from 'react';
import './App.css';
import { Flex, Button, ButtonGroup, View, TextField } from '@aws-amplify/ui-react';
import InputBox from './InputBox';
import { fields } from './fields';
import '@aws-amplify/ui-react/styles.css';
import Form from './Form';
// import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async handleChange(event) {
    this.setState({key: event.target.name});
    this.setState({value: event.target.value})
    const inputArr = []
    
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log("this.state: ", this.state)
    const key = this.state.key;
    const value = this.state.value;
    console.log("key:", key, "inputval: ", value)
    const raw = JSON.stringify({"key": key, "value": value})
    try{
      fetch("https://7ctegn7d3j.execute-api.us-west-2.amazonaws.com/dev", {method: 'POST', body: raw})
      .then(response => response.text())
      .then(result => alert(JSON.parse(result).body))
      .catch(error => console.log('error', error));
    }catch(e) {
      console.log("error: ", e)
    };
  }

  render () {
    const fieldsArray = fields.map((field, i) => {
      return (
          <InputBox 
              key={i}
              label={fields[i].label}
              name={fields[i].name}
              onChange={this.handleChange}
              />
      );
    })
    return( 
      <View as="form" onSubmit={this.handleSubmit}>
        <Flex direction="column" padding="2rem" alignItems="center">
          {/* <InputBox 
            label={fields[0].label}
            name={fields[0].name}
            onChange={this.handleChange}
            />
          <InputBox 
            label={fields[1].label}
            name={fields[1].name}
            onChange={this.handleChange}
            /> */}
            { fieldsArray }
        <View direction="row">
          <ButtonGroup>
            <Button
              loadingText=""
              type="submit"
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
    )
  };
};
export default App;
