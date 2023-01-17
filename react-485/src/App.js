import React, { Component } from 'react';
import './App.css';
import { Flex, Button, ButtonGroup, View, TextField } from '@aws-amplify/ui-react';
import InputBox from './InputBox';
import { fields } from './fields';
import '@aws-amplify/ui-react/styles.css';
// import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async handleChange(event) {
    this.setState({lname: event.target.value});
    this.setState({key: event.target.name});
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log("this.state: ", this.state)
    const inputValue = this.state.lname;
    const keyy = this.state.key;
    console.log("key:", keyy, "inputval: ", inputValue)
    const raw = JSON.stringify({"key": keyy, "value": inputValue})
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
    return( 
      <View as="form" onSubmit={this.handleSubmit}>
        <Flex direction="column" padding="2rem" alignItems="center">
          <InputBox 
            label={fields[0].label}
            name={fields[0].attr}
            onChange={this.handleChange}
            />
          {/* <TextField 
            label={fields[0].label}
            attr={fields[0].attr}
            errorMessage="There is an error"
            // onChange={this.handleChange}
            onChange={event => console.log(event.target.value)}

          /> */}
          {/* <InputBox label={fields[1].label}/> */}
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
