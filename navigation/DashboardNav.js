import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Dashboard } from '../screens/Dashboard';
import { LinksScreen } from '../screens/LinksScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
    Dash: {screen: Dashboard}
}
);

const App = createAppContainer(MainNavigator);

export class DashboardNav extends Component {
  render() {
    return (
      <App/>
    )
  }
}


  
