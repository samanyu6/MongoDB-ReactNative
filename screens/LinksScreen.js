import React from 'react';
import { ScrollView, StyleSheet , Button,Image,View,TouchableOpacity,FlatList,Text} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { DashboardNav} from '../navigation/DashboardNav';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Registered Users'
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '' ,
      password: '',
      response: '',
      users: [],
      key: []
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
        }, function () {
            const len = (this.state.response).length;
            for (i = 0; i < len; i++){
              this.state.users.push( {
                id: i, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: this.state.response[i].username, comment:"working!"
              })
              this.forceUpdate();
            }
        });
 
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  
  render() {
  
    return (
      <FlatList
      style={styles.root}
      data={this.state.users}
      ItemSeparatorComponent={() => {
        return (
          <View style={styles.separator}/>
        )
      }}
      keyExtractor={(item)=>{
        return item.id;
      }}
        renderItem={(item) => {
          x = item.toString();
          const Notification = item.item;
        return(
          <View style={styles.container}>
            <TouchableOpacity onPress={() =>
              this.props.navigation.navigate('Dashboard', {
                details: Notification
              })
            }>
              <Image style={styles.image} source={{ uri: Notification.image }} />
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text  style={styles.name}>{Notification.name}</Text>
                <Text style={styles.time}>
                  10:45pm
                </Text>
              </View>
                <Text rkType='primary3 mediumLine'>{Notification.comment}</Text>
              </View>
          </View>
        );
      }}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop:10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
});

