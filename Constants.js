import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

export default class Constants extends Component {
  constructor() {
    super();
  }
  getUniqueIDKey () {
    return 'uniqueID';
  }

  getOpenedSetsKey () {
    return 'openedSets';
  }

  getIsOnboardingSeenKey () {
    return 'isOnboardingSeen';
  }
}

AppRegistry.registerComponent('Constants',()=>Constants);
