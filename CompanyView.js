import React, {Component} from 'react';
  import {AppRegistry, ListView, View, Image, Text, TouchableOpacity, AsyncStorage, StyleSheet} from 'react-native';
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
      var colorIndex = this.props.rowID % 4;

          var colorCode;

      switch (colorIndex) {
        case 0:
          colorCode = '#F0D15D';
          break;
          case 1:
            colorCode = '#DF734F';
            break;
            case 2:
              colorCode = '#9D3951';
              break;
              case 3:
                colorCode = '#532F5B';
                break;
                case 4:
                  colorCode = '#E7009A';
                  break;
                  case 5:
                    colorCode = '#005399';
                    break;
                    case 6:
                      colorCode = '#00C5EC';
                      break;
        default:

      }

      var textColorCode;

      switch (colorIndex) {
      case 0:
      textColorCode = '#532F5B';
      break;
      case 1:
        textColorCode = '#F0D15D';
        break;
        case 2:
          textColorCode = '#532F5B';
          break;
          case 3:
            textColorCode = '#F0D15D';
            break;
            case 4:
              textColorCode = '#E7009A';
              break;
              case 5:
                textColorCode = '#005399';
                break;
                case 6:
                  textColorCode = '#00C5EC';
                  break;
      default:

      }
      colorCode = 'white';
      textColorCode = '#00C26D';


    if (this.props.sequence/100 == 0) {
      //1 or 2 digit no
      return (
        <TouchableOpacity style={{flex:1, flexDirection:'row',height:64, backgroundColor:colorCode}} onPress={()=> this._pressRow(this.props.text)}>
        <Text style = {{flex:1,fontSize:16, paddingLeft:20,paddingTop:20, marginRight:12, backgroundColor:colorCode, color:this.state.isPressed?'#F8A1AB':(this.props.isCompleted?'#F8A1AB':'#075E54'), color:textColorCode,height:60}}>{this.props.sequence + ')'} </Text>
         <Text style = {{flex:13,fontSize:16, marginRight:12,textDecorationLine:this.state.isPressed?'line-through':'none', paddingLeft:20,paddingTop:20, backgroundColor:colorCode, color:this.state.isPressed?'#F8A1AB':(this.props.isCompleted?'#F8A1AB':'#075E54'), color:textColorCode,height:60}}>{this.props.text} </Text>
        </TouchableOpacity>
      );
    }
    else {
      //3 digit no
      return (
        <TouchableOpacity style={{flex:1, flexDirection:'row',height:64, backgroundColor:colorCode}} onPress={()=> this._pressRow(this.props.text)}>
        <Text style = {{flex:1,fontSize:16,marginRight:12, paddingLeft:20,paddingTop:20, backgroundColor:colorCode, color:this.state.isPressed?'#F8A1AB':(this.props.isCompleted?'#F8A1AB':'#075E54'), color:textColorCode,height:60}}>{this.props.sequence + ')'} </Text>
         <Text style = {{flex:9,fontSize:16,marginRight:12, textDecorationLine:this.state.isPressed?'line-through':'none',paddingTop:20, paddingLeft:20, backgroundColor:colorCode, color:this.state.isPressed?'#F8A1AB':(this.props.isCompleted?'#F8A1AB':'#075E54'), color:textColorCode,height:60}}>{this.props.text} </Text>
        </TouchableOpacity>
      );
    }
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

   arr.sort(function(a, b) {
       return parseFloat(a.order) - parseFloat(b.order);
   });
  //arr.reverse();
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

var sequenceID = rowID.valueOf();
//sequenceID += 1;

  return (<SetCell text={rowData} rowID={rowID} sequence={++sequenceID} url={urlList[rowID]} isCompleted={completedState} onPressTest={()=>this._fetchCompletedURLs}/>);
  }

  render() {
      return (
   <ListView
   style={{paddingTop:54,backgroundColor:'#EFE7DE'}}
   enableEmptySections={true}
  renderSeparator={(sectionId, rowId) => <View key={rowId} style={{
   flex: 1,
   height: StyleSheet.hairlineWidth,
   backgroundColor: '#8E8E8E',
 }} />}
   dataSource = {this.state.dataSource}
   renderRow = {this._renderRow}/>
      );
    }
  }

  AppRegistry.registerComponent('CompanyViewController',()=>CompanyViewController);
