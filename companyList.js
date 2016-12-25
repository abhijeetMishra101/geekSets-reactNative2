    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     * @flow
     */

     import React, { Component} from 'react';
     import { ListView, TouchableHighlight, TouchableOpacity, Image, ActivityIndicator, StatusBar } from 'react-native';
     import * as firebase from 'firebase';
     import {
       AppRegistry,
       StyleSheet,
       Text,
       View
     } from 'react-native';
     import {Actions} from 'react-native-router-flux';

     // Initialize Firebase
     var config = {
         apiKey: "AIzaSyApv7GxQj7W70Mfv5uFQ3jF3CnaDQEv804",
         authDomain: "amazonsets-298b8.firebaseapp.com",
         databaseURL: "https://amazonsets-298b8.firebaseio.com",
         messagingSenderId: "671195492996"
       };
    var firebaseApp = firebase.initializeApp(config);
    var companyData;

     class CompanyCell extends Component {
       constructor(props) {
     super(props);
       }

     _pressRow (rowData) {
    var selectedCompany = rowData;

    var compnayInfo = this.props.setInfo;

    Actions.companyView(compnayInfo)
         }
    render () {
      return (
        <TouchableOpacity style={{flex:1, flexDirection:'column',alignItems:'center',justifyContent:'center'}} onPress={()=> this._pressRow(this.props.text)}>
         <Text style = {{fontSize:16,fontWeight:'600', paddingTop:20, paddingBottom:20, paddingLeft:20, backgroundColor:'#EFE7DE', color:'#00C26D',height:68}}>{this.props.text} </Text>
        </TouchableOpacity>
      );
         }
       }

     export default class geekSets extends Component {

     constructor(props) {
       super(props);
       let ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>(r1 !== r2)});
       this.itemsRef = firebaseApp.database().ref('/sets/');
       this.state = {
       dataSource: ds.cloneWithRows([]),
       animating:true,
       showProgress:true,
     };
     }
     static getCurrentFirebaseRef() {
       return firebaseApp;
     }

     componentDidMount() {
         this.listenForItems(this.itemsRef);
         Actions.refresh({hideNavBar:false});
         isScreenToBeDismissed = false;
       }

     listenForItems(itemsRef) {
         itemsRef.on('value', (snap) => {
           var items = [];
           var values = [];

            var localSnap = snap.ref;
           snap.forEach((child) => {
     items.push(child.key);

    var childRef = child.val();

    var companyName = child.key;

     values.push({'name':companyName,'set':childRef});
            });
            companyData = values;
           this.setState({
             dataSource: this.state.dataSource.cloneWithRows(items),
             animating:true,
             showProgress:false,
           });
         });
       }

       _renderPush(data) {

       }
       renderSeparator(sectionID, rowID) {
           return (
               <View style={styles.separator} key={sectionID+rowID}/>
           );
       }
       login(email, password) {
          if (this.props.onLoginRequested) {
              this.props.onLoginRequested();
          }
          firebase.auth().signInWithEmailAndPassword(email, password)
          .then((data) => {
  var userName = firebase.user;
            Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {text: userName, onPress: () => console.log('Ask me later pressed')},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  )
              if (this.props.onLoginSuccess) {
                  this.props.onLoginSuccess(data)
              }
          })
          .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;

              Alert.alert(
          'Alert Title',
          'My Alert Msg',
          [
          {text: 'fail', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
          )
              if (this.props.onLoginError) {
                  this.props.onLoginError(error.code, error.message)
              }
          });
        }
       _renderRow (rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {

    var values = companyData;

    var companySetInfo;

    for (var i = 0; i < values.length; i++) {

    var valueSnapShot = values[i];

    if (  values[i].name == rowData) {
      companySetInfo = values[i];
    }
    }

           return (
               <CompanyCell text={rowData} setInfo={companySetInfo}></CompanyCell>
           );
         }

       _pressRow (rowData) {

    var selectedCompany = rowData;
         }
    render () {
if (this.state.showProgress) {
  return (
  <View style={{flex:1, backgroundColor:'#EFE7DE'}}>
  <Text style={{textAlign:'center', paddingTop:160, color:'#075E54',flex:1,fontSize:20,fontWeight:'bold'}}> Initialising... </Text>
  <Text style={{textAlign:'center', color:'#075E54', flex:1,fontSize:14}}> Please wait for a moment </Text>
  <ActivityIndicator style={{flex:this.state.showProgress ? 12:0, opacity: this.state.showProgress ? 12.0 : 0.0}} color='#075E54' animating={true} size="large"/>
  </View>
     );
}
else {
  return (
  <View style={{flex:1,backgroundColor:'#EFE7DE'}}>
  <ListView

style = {{flex:this.state.showProgress ? 0:1,paddingTop:80,backgroundColor:'#EFE7DE'}}

   dataSource={this.state.dataSource}
enableEmptySections={true}
   renderRow={this._renderRow}
 />
   </View>
     );
}

    }
     }

     const styles = StyleSheet.create({
       container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: '#F5FCFF',
       },
       separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
      },
       welcome: {
         fontSize: 20,
         textAlign: 'center',
         margin: 10,
       },
       instructions: {
         textAlign: 'center',
         color: '#333333',
         marginBottom: 5,
       },
     });

     AppRegistry.registerComponent('geekSets', () => geekSets);
