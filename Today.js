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
        this.setState({
          goalMinutes: res.goalDailyActivity,
        });
      });
  }
  getAllExercises() {
    fetch("http://cs571.cs.wisc.edu:5000/activities/", {
      method: "GET",
      headers: { "x-access-token": this.props.accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          activities: res.activities,
        });
      });

    this.state.activities.forEach((element) => {
      this.setState((prevState) => {
        return {
          exerciseMinutes: (prevState.exerciseMinutes += element.duration),
        };
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
        <Text>Your activities today!</Text>
        <Text>Exercise</Text>
        {this.state.activities.map((key, index) => {
          return (
            <View>
              <Text>Name: {key.name}</Text>
              <Text>Duration: {key.duration}</Text>
              <Text>Calories: {key.calories}</Text>
              <Text>Date: {key.date}</Text>
            </View>
          );
        })}
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
