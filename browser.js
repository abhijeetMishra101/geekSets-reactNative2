import React, {Component} from 'react';
import {View, AppRegistry, Text, WebView} from 'react-native';

// import {
//   processColor, // make sure to add processColor to your imports if you want to use hex colors as shown below
// } from 'react-native';

//import Webbrowser from 'react-native-webbrowser';

// at the top of your file near the other imports
//var Browser = require('react-native-browser');


export default class browserClass extends Component {
  constructor(props) {
    super(props);

var url = this.props.data;


    this.state = {
        id: 'browserView',
        url:url
        };
  }

  componentDidMount () {
    // wherever you want to trigger a browser modal appearing
    //Browser.open('https://google.com/');

    // // OR pass in options to customize
    // Browser.open('https://google.com/', {
    //                     showUrlWhileLoading: true,
    //                     loadingBarTintColor: processColor('#d64bbd'),
    //                     navigationButtonsHidden: false,
    //                     showActionButton: true,
    //                     showDoneButton: true,
    //                     doneButtonTitle: 'Done',
    //                     showPageTitles: true,
    //                     disableContextualPopupMenu: false,
    //                     hideWebViewBoundaries: false,
    //                     buttonTintColor: processColor('#d64bbd')
    //                   });
  }

render () {
  return (
    <WebView
        source={{uri: this.state.url}}
        style={{marginTop: 20}}
      />
  );
}
}

AppRegistry.registerComponent('browserClass',()=>browserClass);
