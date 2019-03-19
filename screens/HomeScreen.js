import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RkTextInput,RkButton} from 'react-native-ui-kitten';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
  }
  
  constructor(props) {
    super(props);

    this.state = {
      username: '' ,
      password: '',
      userEnable: false,
      passEnable: false,
      btnEnable: this.userEnable && this.passEnable
    };
  }
  
  _handlePress() {
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.username,
        pass: this.state.password
      }),
    });
    alert('Registered');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <RkTextInput
            rkType="rounded"
            placeholder="Enter username"
            style={
              styles.welcome
            }
            onChangeText={(text) => {
              var letters = /^[a-zA-Z]*[0-9]*$/                
              if (text.match(letters)) {
                this.setState({ username: text.trim() });
                this.setState({ userEnable : true });
              }
              else { 
                alert('Invalid username, try again!');
                this.setState({ userEnable : false });
                }
          }} 
          />
          
          <RkTextInput
            rkType="rounded"
            secureTextEntry={true}
            placeholder="Enter password"
            style={
              styles.welcome
            }
            onChangeText={(text) => {
              if (text == "") {
                alert("Password field is empty!");
              }
              else {
                this.setState({ password: text.trim()});
                this.setState({ passEnable : true });
              }
            }} />
          
          <RkButton
            style={styles.button}
            disabled = {!(this.state.userEnable&&this.state.passEnable)}
            onPress={
              () => this._handlePress()
            }>Register.
          </RkButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    margin: 10
  },
  button: {
    marginTop: 30
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container2: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  button2: {
    marginTop: -10
  }
});
