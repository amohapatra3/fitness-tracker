import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React from "react";
class Today extends React.Component {
  constructor() {
    super();

    // Initialize states which will be used for TextInputs
    this.state = {
      goalMinutes: 0.0,
      exerciseMinutes: 0.0,
    };
  }
  componentDidUpdate() {
    fetch("http://cs571.cs.wisc.edu:5000/users/" + this.props.username, {
      method: "GET",
      headers: { "x-access-token": this.props.accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          goalMinutes: res.goalDailyActivity,
        });
      });
  }
  render() {
    return (
      <View>
        <Text> Your goals for the day! </Text>
        <Text>
          {" "}
          {this.state.exerciseMinutes + "/" + this.state.goalMinutes}
        </Text>
      </View>
    );
  }
}
export default Today;
