import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, View, Text} from 'react-native';
import {Router, Scene, Actions} from 'react-native-router-flux';

import Onboarding from './Onboarding';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CompanyList from './companyList';
import CompanyView from './CompanyView';
import Browser from './browser';
import Constants from './Constants';

export default class geekSets extends Component {
  constructor(props) {
    super(props);

var isIOS = this.isIOS();
    this.state = {
      isLoading:true,
      isOnboardingSeen: false,
      isIOS:isIOS
    };
  }

isIOS () {
  if (this.props.deviceType == 'iOS') {
    return true;
  }
  return false;
}

   componentDidMount() {
     AsyncStorage.getItem('isOnboardingSeen').then((value)=>{
     if (value == null || value == undefined) {
     this.state = {
      isLoading: false,
      isOnboardingSeen:false,
      isIOS:this.isIOS()
     };
     }
     else {
     this.state = {
      isLoading: false,
      isOnboardingSeen:JSON.parse(value),
      isIOS:this.isIOS()
     };
     }
     this.forceUpdate();
   });
}
  render () {
  if (this.state.isLoading) {
    return (<View>
    <Text>Loading...</Text></View>);
  }
  else {
     if (this.state.isOnboardingSeen) {
    return (
      <Router>
        <Scene key="root">
        <Scene key="companyList" component={CompanyList} title="Companies" navigationBarStyle={{ backgroundColor: '#00C26D' }}
titleStyle={{ color: 'white' }} initial/>
        <Scene key="onboarding"  component={Onboarding} hideNavBar={true} type="JUMP"/>
        <Scene key='signin' component={SignIn}/>
        <Scene key='signup' component={SignUp}/>
        <Scene key="companyView" component={CompanyView} title="test" navigationBarStyle={{ backgroundColor: '#00C26D' }}
titleStyle={{ color: 'white' }}/>
        <Scene key='browserView' component={Browser} title="" navigationBarStyle={{ backgroundColor: '#00C26D' }}
titleStyle={{ color: 'white' }}  onBack={() => {Actions.pop({ refresh: {} }); }}/>
       </Scene>
      </Router>
    );
     }
     else {
    return (
      <Router>
        <Scene key="root">
        <Scene key="onboarding"  component={Onboarding} hideNavBar={true} type="JUMP" intial/>
        <Scene key="companyList" component={CompanyList} title="Companies"/>
        <Scene key='signin' component={SignIn}/>
        <Scene key='signup' component={SignUp}/>
        <Scene key="companyView" component={CompanyView}/>
        <Scene key='browserView' component={Browser} title=""/>
       </Scene>
      </Router>
    );
     }
  }
  }
}
