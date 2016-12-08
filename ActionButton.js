import React , { Component } from 'react';
import {AppRegistry, View, TouchableOpacity, Text, Alert} from 'react-native';


export default class ActionButton extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <TouchableOpacity onPress={()=> this.props.action('hello')} style={{paddingTop:40}}>
        <View>
         <Text style={{color:'#00C26D',fontSize:16,fontWeight:'600'}}> {this.props.text} </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

AppRegistry.registerComponent('ActionButton',()=>ActionButton);
