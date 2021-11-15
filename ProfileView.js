import React from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Today from "./Today";
import Exercise from "./Exercise";
import Goals from "./Goals";
class ProfileView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const Tabs = createBottomTabNavigator();
    return (
      <Tabs.Navigator>
        <Tabs.Screen
          name="Today"
          options={{
            title: "Today's Report",
          }}
        >
          {(props) => (
            <Today
              {...props}
              username={this.props.username}
              accessToken={this.props.accessToken}
              revokeAccessToken={this.props.revokeAccessToken}
            />
          )}
        </Tabs.Screen>
        <Tabs.Screen
          name="Exercise"
          options={{
            title: "Add Exercise",
          }}
        >
          {(props) => (
            <Exercise
              {...props}
              username={this.props.username}
              accessToken={this.props.accessToken}
              revokeAccessToken={this.props.revokeAccessToken}
            />
          )}
        </Tabs.Screen>
        <Tabs.Screen
          name="Goals"
          options={{
            title: "Daily Goals",
          }}
        >
          {(props) => (
            <Goals
              {...props}
              username={this.props.username}
              accessToken={this.props.accessToken}
              revokeAccessToken={this.props.revokeAccessToken}
            />
          )}
        </Tabs.Screen>
      </Tabs.Navigator>
    );
  }
}

export default ProfileView;
