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
import Icon from "react-native-vector-icons/Ionicons";
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
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Today") {
              iconName = "today-outline";
            } else if (route.name === "Exercise") {
              iconName = "barbell-outline";
            } else if (route.name === "Goals") {
              iconName = "analytics-outline";
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tabs.Screen
          name="Today"
          options={{
            title: "Today's Report",
            headerRight: () => (
              <Button
                onPress={() => this.props.revokeAccessToken()}
                title="Sign Out"
                color="#000"
              />
            ),
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
            headerRight: () => (
              <Button
                onPress={() => this.props.revokeAccessToken()}
                title="Sign Out"
                color="#000"
              />
            ),
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
            headerRight: () => (
              <Button
                onPress={() => this.props.revokeAccessToken()}
                title="Sign Out"
                color="#000"
              />
            ),
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
