import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, Image, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Dimensions from 'Dimensions';

import EmailPasswordGenericView from './EmailPasswordGenericView';
import AlternateOptionButton from './AlternateOptionButton';
import ActionButton from './ActionButton';

import CommonAdapter from './CommonAdapter';

export default class SignIn extends Component {
  constructor() {
    super();
    var window = Dimensions.get('window');
    this.state = {'width':window.width,
    'height':window.height,
'email':'',
'password':''
  };
  }
submitTapped (text) {
this.performSignIn(this.state.email,this.state.password);
}
onSubmitSuccess () {
  var window = Dimensions.get('window');
  this.state = {'width':window.width,
  'height':window.height,
showProgress:false};
//TODO:: dismiss the UI
}
performSignIn(email, password) {
  var adapter = new CommonAdapter();
  adapter.performSignIn(email, password);
}

onEmailChange(emailText) {
  console.log('email entered1 '+emailText );
  this.state.email = emailText;
}

onPasswordChange(passwordText) {
this.state.password = passwordText;
}

render () {
    return (
    <View style={{width:this.state.width, height:this.state.height,paddingTop:64,alignItems:'center'}}>
    <Image style={styles.imageStyle} resizeMode='contain' source={require('./img/login.png')}/>
    <EmailPasswordGenericView width={this.state.width} height={this.state.height} onEmailChange={(email)=>this.onEmailChange(email)} onPasswordChange={(password)=>this.onPasswordChange(password)}/>
    <ActionButton text='Submit' action={()=> this.submitTapped()}/>
    </View>
    );
  }
}

var styles = StyleSheet.create({
  imageStyle:{
    backgroundColor:'white',
  height:200,
  width:200
  }
});

AppRegistry.registerComponent('SignIn',()=>SignIn);
