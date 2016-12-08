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
    Actions.signup();
    try {
      await AsyncStorage.setItem((new Constants()).getIsOnboardingSeenKey(), JSON.stringify(true));
      alert('Saved value:'+JSON.stringify(true)+' for key:'+(new Constants()).getIsOnboardingSeenKey());
   } catch (error) {
    // Error saving data
    console.log('failure in setting async storage');
    alert('Save Error');
   }
}


render () {
if (Platform.OS === 'ios') {
  return (
  <Onboarding
    pages={[
      { backgroundColor: '#00C26D', image: <Image source={require('./img/onboarding_ios_1.png')} />, title: 'geekSets', subtitle: 'Lets you prepare for major tech company interviews' },
        { backgroundColor: "#00C26D", image: <Image source={require('./img/onboarding_ios_2.png')} />, title: 'Choose your category', subtitle: 'Find the list of companies' },
        { backgroundColor: "#00C26D", image: <Image source={require('./img/onboarding_ios_2.png')} />, title: 'Choose the interview set', subtitle: 'Choose the set of inteview' },
    ]}
    onEnd={()=> this.onEndCallback('test')}
  >
  <StatusBar backgroundColor="blue" barStyle="light-content" />
  </Onboarding>
  );
}
else {
  return (
  <Onboarding
    pages={[
      { backgroundColor: '#00C26D', image: <Image source={require('./img/onboarding_1.png')} />, title: 'geekSets', subtitle: 'Lets you prepare for major tech company interviews' },
        { backgroundColor: "#00C26D", image: <Image source={require('./img/onboarding_2.png')} />, title: 'Choose your category', subtitle: 'Find the list of companies' },
        { backgroundColor: "#00C26D", image: <Image source={require('./img/onboarding_2.png')} />, title: 'Choose the interview set', subtitle: 'Choose the set of inteview' },
    ]}
    onEnd={()=> this.onEndCallback('test')}
  >
  <StatusBar backgroundColor="blue" barStyle="light-content" />
  </Onboarding>
  );
}
}
}

AppRegistry.registerComponent('OnboardingClass', ()=> OnboardingClass);