import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Registered Users',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '' ,
      password: '',
      response: ''
    };
  }

  componentDidMount() {
    this.callApi();
    
  }

  callApi = async () => {
    return fetch('http://localhost:5000/api/show')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          response: responseJson,
        }, function(){
          alert(JSON.stringify(this.state.response));
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  
  render() {
    return (
        <ScrollView style={styles.container}>
          {/* {u.map((item, key) => (
            <Text key={key}>{item}</Text>
          ))} */}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
