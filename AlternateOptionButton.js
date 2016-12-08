import React, { Component } from 'react';
import {AppRegistry, TouchableOpacity, Image, Text} from 'react-native';


export default class AlternateOptionButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={()=> this.props.action('hello')} style={{paddingTop:20}}>
       <Text style={{color:'blue',backgroundColor:'white'}}> {this.props.text} </Text>
      </TouchableOpacity>
    );
  }
}

AppRegistry.registerComponent('AlternateOptionButton',()=>AlternateOptionButton);
