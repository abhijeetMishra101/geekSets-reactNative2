import React, {Component} from 'react';
import {AppRegistry,StyleSheet, View, Text, TextInput} from 'react-native';

import TextField from './TextField';

var width, height;

export default class InputField extends Component {
  constructor(props) {
    super(props);
    width = this.props.width;
    height = this.props.height;
  }

blah (text) {
  console.log('blah'+text);
}

  render () {
    return (
      <View style={styles.baseViewStyle,{height:this.props.height,width:(this.props.width),backgroundColor:'white',flexDirection:'row',paddingLeft:40}}>
      <Text style={styles.textStyle}> {this.props.typeText}</Text>
      <TextField placeholder={this.props.placeholder} width={200} height={50} onChangeText={(text)=>this.props.onTextChange(text)}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  baseViewStyle:{
    backgroundColor:'white',
  },
  textStyle: {
    backgroundColor:'white',
    paddingTop:16,
    height:50,
    width:100
  },
});

AppRegistry.registerComponent('InputField',()=>InputField);
