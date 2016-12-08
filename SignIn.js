import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, Image, Alert, ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Dimensions from 'Dimensions';

import EmailPasswordGenericView from './EmailPasswordGenericView';
import AlternateOptionButton from './AlternateOptionButton';
import ActionButton from './ActionButton';

import CommonAdapter from './CommonAdapter';

var isScreenToBeDismissed2;

export default class SignIn extends Component {
  constructor() {
    super();
    var window = Dimensions.get('window');
    this.state = {'width':window.width,
    'height':window.height,
'email':'',
'password':'',
showProgress:false
  };
  }
  componentDidMount () {
    firebase.auth().onAuthStateChanged(function(user) {
  console.log('auth callback1');
    if (user) {
      // User is signed in.
    //TODO:: dismiss the UI
    }
    var window = Dimensions.get('window');
    this.state = {'width':window.width,
    'height':window.height,
  showProgress:false};
if (isScreenToBeDismissed2) {
  Actions.pop();
  isScreenToBeDismissed2 = false;
}
    });
  }
submitTapped (text) {
  this.state = {'width':window.width,
  'height':window.height,
  showProgress:true};
  isScreenToBeDismissed2 = true;
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
    <ActivityIndicator style={{flex:this.state.showProgress ? 1:0, opacity: this.state.showProgress ? 1.0 : 0.0}} color='#00C26D' animating={true} size="large"/>
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
