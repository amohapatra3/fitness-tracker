import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { Dimensions } from "react-native";
var totalExercise = 0;
var goal = 0;
var activities = [];
class Today extends React.Component {
  constructor() {
    super();
    // Initialize states which will be used for TextInputs
    this.state = {
      goalMinutes: 0.0,
      exerciseMinutes: 0.0,
      activities: [],
    };
  }
  componentDidUpdate() {
    fetch("http://cs571.cs.wisc.edu:5000/users/" + this.props.username, {
      method: "GET",
      headers: { "x-access-token": this.props.accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        goal = res.goalDailyActivity;
      });
    fetch("http://cs571.cs.wisc.edu:5000/activities/", {
      method: "GET",
      headers: { "x-access-token": this.props.accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        activities = res.activities;
      });

    activities.forEach((element) => {
      totalExercise += element.duration;
    });
  }
  getAllExercises() {}

  render() {
    let today = new Date();
    return (
      <View>
        <Text> Your goals for the day! </Text>
        <Text> {totalExercise + "/" + goal}</Text>
        <Text>Your activities today!</Text>
        {activities
          ? activities.map((key, index) => {
              //if (key.date.toDateString() === today.toDateString())
              return (
                <View>
                  <Text>{key.name}</Text>
                  <Text>Duration: {key.duration}</Text>
                  <Text>Calories: {key.calories}</Text>
                  <Text>Date: {key.date.toDateString()}</Text>
                </View>
              );
            })
          : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get("window").height,
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bigText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 5,
  },
  spaceSmall: {
    width: 20, // or whatever size you need
    height: 10,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  spaceHorizontal: {
    display: "flex",
    width: 20,
  },
  buttonInline: {
    display: "flex",
    margin: 5,
    padding: 10,
  },
  input: {
    width: 200,
    padding: 10,
    margin: 5,
    height: 40,
    borderColor: "#c9392c",
    borderWidth: 1,
  },
  inputInline: {
    flexDirection: "row",
    display: "flex",
    width: 200,
    padding: 10,
    margin: 5,
    height: 40,
    borderColor: "#c9392c",
    borderWidth: 1,
  },
  bottomButtons: {
    flexDirection: "row",
    display: "flex",
    margin: 5,
  },
});
export default Today;
