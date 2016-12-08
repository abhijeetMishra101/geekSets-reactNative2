import React, {Component} from 'react';
  import {AppRegistry, ListView, View, Image, Text, TouchableOpacity, AsyncStorage} from 'react-native';
  import {Actions} from 'react-native-router-flux';

  import Constants from './Constants';
  import CommonAdapter from './CommonAdapter';

  var urlList;

  var setList;

  var userCompletedSetList;

  class SetCell extends Component {
    constructor(props) {
  super(props);
    }
    _pressRow (rowData) {
  var selectedCompany = rowData;

  var compnayInfo = this.props.setInfo;

  var url = this.props.url;

  Actions.browserView(url)
      }
    render () {
      return (
        <TouchableOpacity style={{flex:1}} onPress={()=> this._pressRow(this.props.text)}>
         <Text style = {{flex:1, paddingLeft:20, backgroundColor:'white', color:this.props.isCompleted?'#FF3D92':'#00C26D',height:60}}>{this.props.text} </Text>
        </TouchableOpacity>
      );
    }
  }

  export default class CompanyViewController extends Component {
  constructor(props) {
  super(props);

  AsyncStorage.getItem((new Constants()).getOpenedSetsKey()).then((value)=>{
console.log('value from async '+value);
    userCompletedSetList = value.split(',');
  });

  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>(r1 !== r2)});

  var companyInfo = this.props.set;

  var companyName = this.props.name;

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
  }

  componentWillMount() {
    Actions.refresh({title: this.props.name, onRight:() => { Actions.login('test')}})
  }
  _checkIfCompleted (rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
var setname = rowData;
console.log('checking for setname:'+setname+'usersetlist:'+userCompletedSetList);

  if (userCompletedSetList == undefined) {
   return false;
  }

  var result;
  console.log('set name '+setName+'list '+userCompletedSetList);
    for (var i = 0; i < userCompletedSetList.length; i++) {
     if ( userCompletedSetList[i] == setName) {
       return true;
     }
    }
    return false;
  }
  _renderRow (rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {

var list = userCompletedSetList;
console.log('list1 '+userCompletedSetList);
var completedState = false;
if (userCompletedSetList == undefined) {
  completedState = false;
}
else {
  for (var i = 0; i < userCompletedSetList.length; i++) {
    console.log('user list:'+(i+1)+userCompletedSetList[i]+'url set:'+urlList[rowID]);
   if (userCompletedSetList[i] == urlList[rowID]) {
     completedState = true;
   }
  }
}
  return (<SetCell text={rowData} url={urlList[rowID]} isCompleted={completedState}/>);
  }

  render() {
      return (
   <ListView
   style={{paddingTop:80}}
   enableEmptySections={true}
   dataSource = {this.state.dataSource}
   renderRow = {this._renderRow}/>
      );
    }
  }

  AppRegistry.registerComponent('CompanyViewController',()=>CompanyViewController);
