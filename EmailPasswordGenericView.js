//sign up view
import React, { Component } from 'react';
import {AppRegistry,StyleSheet, View, TextInput, Text, Button} from 'react-native';

import InputField from './InputField';

export default class EmailPasswordGenericView extends Component {
  constructor(props) {
    super(props);
}
render () {
  return (
    <View style={{width:this.props.width, paddingTop:40}}>
       <InputField typeText='Email' placeholder='Enter your email ID' width={this.props.width} height={60} onTextChange={(text)=>this.props.onEmailChange(text)}/>
       <InputField typeText='Password' placeholder='Enter your password' width={this.props.width} height={60} onTextChange={(text)=>this.props.onPasswordChange(text)}/>
    </View>
  );
}
}

var styles = StyleSheet.create({
container: {
  flex:1,
  backgroundColor:'white',
  height:200
},

});

AppRegistry.registerComponent('EmailPasswordGenericView',()=>EmailPasswordGenericView);
