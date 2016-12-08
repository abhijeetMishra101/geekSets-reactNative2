//the textfield for the emailID & password input

import React, {Component} from 'react';
import {AppRegistry,TextInput, StyleSheet, Platform} from 'react-native';

export default class GKTextField extends Component {

constructor (props) {
  super(props);
}

render () {
  var isIOS = false;
  if (Platform.OS === 'ios') {
    isIOS = true;
  }
if (isIOS) {
  return (
  <TextInput
           style={{width:this.props.width,height:this.props.height,backgroundColor:'white',color:'black',borderWidth:1,borderColor:'gray'}}
           placeholder={this.props.placeholder}
           onChangeText={(text) => this.props.onChangeText(text)}
         />
  );
}
else {
  return (
  <TextInput
           style={{width:this.props.width,height:this.props.height,backgroundColor:'white',color:'black'}}
           placeholder={this.props.placeholder}
           onChangeText={(text) => this.props.onChangeText(text)}
         />
  );
}
}
}

var styles = StyleSheet.create({
  textInputStyle:{
    backgroundColor:'blue',
  }
});


AppRegistry.registerComponent('GKTextField',()=>GKTextField);
