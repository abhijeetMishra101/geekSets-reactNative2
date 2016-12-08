//the textfield for the emailID & password input

import React, {Component} from 'react';
import {AppRegistry,TextInput, StyleSheet} from 'react-native';

export default class GKTextField extends Component {

constructor (props) {
  super(props);
}

render () {
return (
<TextInput
         style={{width:this.props.width,height:this.props.height,backgroundColor:'white',color:'black',borderWidth:1,borderColor:'gray'}}
         placeholder={this.props.placeholder}
         onChangeText={(text) => this.props.onChangeText(text)}
       />
);
}
}

var styles = StyleSheet.create({
  textInputStyle:{
    backgroundColor:'blue',
  }
});


AppRegistry.registerComponent('GKTextField',()=>GKTextField);
