import React, { Component } from 'react';
import Onboarding from 'react-native-simple-onboarding';
import {AppRegistry, AsyncStorage, Platform, StatusBar, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Constants from './Constants';

export default class OnboardingClass extends Component {
constructor (props) {
super(props);
this.state = {
  id: 'onboardingView'
};
}

async onEndCallback (test) {
    Actions.companyList({type: 'reset'});
  //  Actions.signup();
    try {
      await AsyncStorage.setItem('isOnboardingSeen', JSON.stringify(true));
   } catch (error) {
    // Error saving data
    console.log('failure in setting async storage');
   }
}


render () {
if (Platform.OS === 'ios') {
  return (
  <Onboarding
    pages={[
      { backgroundColor: '#00C26D', image: <Image source={require('./img/onboarding_ios_1.png')} />, title: 'geekSets', subtitle: 'Lets you prepare for interviews' },
        { backgroundColor: '#00C26D', image: <Image source={require('./img/onboarding_ios_2.png')} />, title: 'Choose your category', subtitle: 'Find the list of companies' },
        { backgroundColor: '#00C26D', image: <Image source={require('./img/onboarding_ios_3.png')} />, title: 'Choose the interview set', subtitle: 'Choose the set of inteview' },
    ]}
    onEnd={()=> this.onEndCallback('test')}
  >
  <StatusBar backgroundColor='#00C26D' barStyle="light-content" />
  </Onboarding>
  );
}
else {
  return (
  <Onboarding
    pages={[
        { backgroundColor: '#00C26D', image: <Image source={require('./img/onboarding_1.png')} />, title: 'geekSets', subtitle: '' },
        { backgroundColor: '#00C26D', image: <Image source={require('./img/onboarding_2.png')} />, title: 'Choose your category', subtitle: 'Find the list of companies' },
        { backgroundColor: '#00C26D', image: <Image source={require('./img/onboarding_3.png')} />, title: 'Choose the interview set', subtitle: 'Choose the set of inteview' },
    ]}
    onEnd={()=> this.onEndCallback('test')}
  >
  <StatusBar backgroundColor='#00C26D' barStyle="light-content" />
  </Onboarding>
  );
}
}
}

AppRegistry.registerComponent('OnboardingClass', ()=> OnboardingClass);
