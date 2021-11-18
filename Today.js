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
  componentDidMount() {
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
          exerciseMinutes: prevState.exerciseMinutes + element.duration,
        };
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    fetch("http://cs571.cs.wisc.edu:5000/users/" + this.props.username, {
      method: "GET",
      headers: { "x-access-token": this.props.accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        if (prevState.goalMinutes !== res.goalDailyActivity)
          this.setState({
            goalMinutes: res.goalDailyActivity,
          });
      });
    fetch("http://cs571.cs.wisc.edu:5000/activities/", {
      method: "GET",
      headers: { "x-access-token": this.props.accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        if (prevState.activities !== res.activities)
          this.setState({
            activities: res.activities,
          });
      });
  }

  render() {
    let totalMinutes = 0;
    return (
      <View>
        <Text>Your activities today!</Text>
        {this.state.activities
          ? this.state.activities.map((key, index) => {
              if (
                new Date(key.date).toDateString() === new Date().toDateString()
              ) {
                totalMinutes += key.duration;
                return (
                  <View>
                    <Text>{key.name}</Text>
                    <Text>Duration: {key.duration}</Text>
                    <Text>Calories: {key.calories}</Text>
                    <Text>
                      Date:{" "}
                      {new Date(key.date).toDateString() +
                        " " +
                        new Date(key.date).getHours() +
                        ":" +
                        new Date(key.date).getMinutes()}
                    </Text>
                    <View style={styles.space} />
                  </View>
                );
              }
            })
          : null}
        <Text> Your exercise minutes goal for the day! </Text>
        <Text> {totalMinutes + "/" + this.state.goalMinutes}</Text>
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
