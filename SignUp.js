import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, Image, Alert, ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import * as firebase from 'firebase';

import EmailPasswordGenericView from './EmailPasswordGenericView';
import AlternateOptionButton from './AlternateOptionButton';
import ActionButton from './ActionButton';

import CommonAdapter from './CommonAdapter';

var isScreenToBeDismissed1;

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    var window = Dimensions.get('window');
    this.state = {'width':window.width,
    'height':window.height,
  showProgress:false};
  }
  componentDidUnMount () {
    isSubsequentInvocation = false;
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
if (isScreenToBeDismissed1) {
  Actions.pop();
  Actions.pop();
  isScreenToBeDismissed1 = false;
}
    });
  }
submitTapped (text) {
this.performSignUp(this.state.email,this.state.password,()=>{this.onSubmitSuccess('test')});
var window = Dimensions.get('window');
this.state = {'width':window.width,
'height':window.height,
showProgress:true};
isScreenToBeDismissed1 = true;
this.forceUpdate();
}

onSubmitSuccess (text) {

}

signInTapped (text) {
Actions.signin();
}

performSignUp(email, password) {
    new CommonAdapter().performSignUp(email, password,()=>{});
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
    <AlternateOptionButton text='Already a user? Log in' action ={()=>this.signInTapped()}/>
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

AppRegistry.registerComponent('SignUp',()=>SignUp);
