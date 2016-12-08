import React, { Component } from 'react';
import {AppRegistry, Alert, AsyncStorage} from 'react-native';
import * as firebase from 'firebase';

import Constants from './Constants';

export default class CommonAdapter extends Component {
  constructor() {
    super();
this.listenForUsers();
  }

listenForUsers () {

  firebase.database().ref('/users/').on('value', (snap) => {
   snap.forEach((child) => {
var userName = child.key;
var asynKey = (new Constants()).getUniqueIDKey();

var currentUserKey = 'abhijeetmishra101';//this.getAsyncStorage(asynKey);

console.log('abhijeetasynckey1 '+currentUserKey);

if (userName == currentUserKey) {
  var userData = child.val();
  var userOpenedSets = userData.opened;
  var val1 = userOpenedSets.toString();
  console.log('value3 '+userOpenedSets.toString());
  this.setAsyncStorage((new Constants()).getOpenedSetsKey(),userOpenedSets.toString());
}
   });
});
}


  performSignUp(email, password, signUpCallback) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .catch(function(error) {

    var successStatus ;
    if (error) {
      successStatus = 'signup failure';
    }
    else {
       successStatus = 'signup success';
       if (signUpCallback != null && signUpCallback != undefined) {
         signUpCallback();
       }
    }
                  Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                {text: successStatus, onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
                )
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
            });
  }
  performSignIn(email, password) {
    var key = (new Constants()).getUniqueIDKey();

var emailValue = this.getParsedUniquIDForEmail(email);

    console.log('Email thing '+emailValue);
    this.setAsyncStorage(key,emailValue);

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {

        if (this.props.onLoginSuccess) {
            this.props.onLoginSuccess(data)
        }
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
  }

getParsedUniquIDForEmail(email) {
//write the parsing logic for the emailID
var parsedEmail = email.split('.')[0];
  return parsedEmail;
}



async  setAsyncStorage(key, value) {

       try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
       // Error saving data
       console.log('failure in setting async storage');
    }
  }

async getAsyncStorage(key) {
console.log('getting async storage');
    try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null){
      // We have data!!
      alert(value);
      console.log('value from async storage1'+ value);
return value;
     }
      } catch (error) {
  // Error retrieving data
  //generate a key
console.log('error in getting async'+error);
  return 'abhijeetmishra101';
    }
  }
}
AppRegistry.registerComponent('CommonAdapter',()=>CommonAdapter);
