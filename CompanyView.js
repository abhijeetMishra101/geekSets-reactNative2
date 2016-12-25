import React, {Component} from 'react';
  import {AppRegistry, ListView, View, Image, Text, TouchableOpacity, AsyncStorage} from 'react-native';
  import {Actions} from 'react-native-router-flux';

  import Constants from './Constants';
  import CommonAdapter from './CommonAdapter';

  var urlList;

  var setList;

  var userCompletedSetList;

  var companyName;

  var completedURLList;

  class SetCell extends Component {
    constructor(props) {
  super(props);
    this._saveURL = this._saveURL.bind(this);
    this.state = {isPressed:false};
    }

  async _saveURL(url) {

    try {
    const value = await AsyncStorage.getItem(companyName)
    if (value !== null) {
      completedURLList = JSON.parse(value);
       }
      } catch (error) {
        completedURLList = [];
    }

if (completedURLList == undefined) {
  completedURLList = [];
}
else {
  completedURLList.push(url);
}

   try {
     await AsyncStorage.setItem(companyName, JSON.stringify(completedURLList));
     this.props.onPressTest();
   } catch (error) {
    }
  }

    _pressRow (rowData) {
  var selectedCompany = rowData;

  var compnayInfo = this.props.setInfo;

  var url = this.props.url;

  this._saveURL(this.props.text);

this.state = {isPressed:true}
this.forceUpdate();

  Actions.browserView(url)
      }

    render () {
      return (
        <TouchableOpacity style={{flex:1}} onPress={()=> this._pressRow(this.props.text)}>
         <Text style = {{flex:1, paddingLeft:20, backgroundColor:'#EFE7DE', color:this.state.isPressed?'#FF3D92':(this.props.isCompleted?'#FF3D92':'#00C26D'),height:60}}>{this.props.text} </Text>
        </TouchableOpacity>
      );
    }
  }

  export default class CompanyViewController extends Component {
  constructor(props) {
  super(props);

  AsyncStorage.getItem((new Constants()).getOpenedSetsKey()).then((value)=>{
if (value != null && value != undefined) {
  userCompletedSetList = value.split(',');

}
    });

  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>(r1 !== r2)});

  var companyInfo = this.props.set;

  companyName = this.props.name;

   var arr = Object.keys(companyInfo).map(function (key) { return companyInfo[key]; });

  setList = [];

  urlList = [];

  for (var i = 0; i < arr.length; i++) {
   var child =  arr[i];
   setList.push(child.name);
   urlList.push(child.url);
  }
  this.state = {
      id: 'companyView',
  dataSource: ds.cloneWithRows(setList)
    };
    this._fetchCompletedURLs = this._fetchCompletedURLs.bind(this);
  }


  componentDidMount() {
    this._fetchCompletedURLs();
    Actions.refresh({title: this.props.name})
  }

async _fetchCompletedURLs () {
    try {
    const value = await AsyncStorage.getItem(companyName);
    if (value !== null) {
      completedURLList = JSON.parse(value);
        this.forceUpdate();
       }
      } catch (error) {
        completedURLList = [];
    }
}

  _checkIfCompleted (rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
var setname = rowData;
  if (userCompletedSetList == undefined) {
   return false;
  }

  var result;
    for (var i = 0; i < userCompletedSetList.length; i++) {
     if ( userCompletedSetList[i] == setName) {
       return true;
     }
    }
    return false;
  }

isURLCompleted(url) {
  for (var i = 0; i < completedURLList.length; i++) {
    if (completedURLList[i] == url) {
      return true;
    }
  }
  return false;
}
_renderRow (rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {

var list = userCompletedSetList;
var completedState = false;

if (completedURLList != undefined) {
  for (var i = 0; i < completedURLList.length; i++) {
    if (completedURLList[i] == rowData) {
      completedState = true;
    }
  }
}

  return (<SetCell text={rowData} url={urlList[rowID]} isCompleted={completedState} onPressTest={()=>this._fetchCompletedURLs}/>);
  }

  render() {
      return (
   <ListView
   style={{paddingTop:80,backgroundColor:'#EFE7DE'}}
   enableEmptySections={true}
   dataSource = {this.state.dataSource}
   renderRow = {this._renderRow}/>
      );
    }
  }

  AppRegistry.registerComponent('CompanyViewController',()=>CompanyViewController);
