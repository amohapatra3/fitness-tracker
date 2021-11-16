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
import DateTimePicker from "@react-native-community/datetimepicker";

class Exercise extends React.Component {
  constructor() {
    super();

    // Initialize states which will be used for TextInputs
    this.state = {
      id: 0,
      name: "",
      duration: 0.0,
      date: new Date(),
      calories: 0.0,
      show: false,
      mode: "date",
    };
  }
  onChange(event, selectedDate) {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      show: Platform.OS === "ios",
      date: currentDate,
    });
  }

  showMode(currentMode) {
    this.setState({
      show: true,
      mode: currentMode,
    });
  }

  showDatepicker() {
    this.showMode("date");
  }

  showTimepicker() {
    this.showMode("time");
  }
  /**
   * On first load, fetch the user data from the `/users` endpoint.
   *
   */
  componentDidMount() {
    fetch("http://cs571.cs.wisc.edu:5000/activities/" + this.state.id, {
      method: "GET",
      headers: { "x-access-token": this.props.accessToken },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          name: res.name,
          duration: res.duration,
          date: res.date,
          calories: res.calories,
        });
      });
  }

  /**
   * Handler for Save Exercise button. Sends a PUT request to the `/users` endpoint.
   *
   */
  handleSaveExercise() {
    fetch("http://cs571.cs.wisc.edu:5000/activities/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.props.accessToken,
      },
      body: JSON.stringify({
        name: this.state.name,
        duration: this.state.duration,
        date: this.state.date,
        calories: this.state.calories,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        this.setState({ id: res.id });
      })
      .catch((err) => {
        alert(
          "Something went wrong! Verify you have filled out the fields correctly."
        );
      });
  }

  /**
   * Handler for Exit button. Revokes accessToken in the state, automatically redirecting to the LoginView.
   */
  handleExit() {
    this.props.revokeAccessToken();
  }

  render() {
    return (
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{
          flexGrow: 11,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.space} />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Icon
            name="male"
            size={40}
            color="#900"
            style={{ marginRight: 20 }}
          />
          <Text style={styles.bigText}>Exercise</Text>
        </View>
        <View style={styles.spaceSmall}></View>
        <Text>Exercise is key to a healthy life!</Text>
        <Text>Specify your exercise activity below.</Text>
        <View style={styles.space} />

        <Text
          style={{
            textAlignVertical: "center",
            fontWeight: "700",
            fontSize: 20,
          }}
        >
          Your Exercise Activity
        </Text>
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>
            Activity Name
          </Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="e.g Running"
            placeholderTextColor="#d9bebd"
            onChangeText={(activity) => this.setState({ name: activity })}
            value={this.state.name}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>
            Duration
          </Text>
        </View>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="in minutes"
          placeholderTextColor="#d9bebd"
          onChangeText={(duration) =>
            this.setState({
              duration: !duration ? 0 : parseFloat(duration),
            })
          }
          value={this.state.duration + ""}
          autoCapitalize="none"
        />
        <View style={styles.spaceSmall}></View>

        <View>
          <View>
            <Button
              onPress={() => this.showTimepicker()}
              style={styles.buttonInline}
              title="Pick date"
            />
          </View>
          <View>
            <Button
              onPress={() => this.showTimepicker()}
              style={styles.buttonInline}
              title="Pick Time"
            />
          </View>
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={() => this.onChange()}
            />
          )}
        </View>

        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>
            Calories Burnt
          </Text>
        </View>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="35"
          placeholderTextColor="#d9bebd"
          onChangeText={(calories) =>
            this.setState({
              calories: !calories ? 0 : parseFloat(calories),
            })
          }
          value={this.state.calories + ""}
          autoCapitalize="none"
        />

        <View style={styles.bottomButtons}>
          <Button
            color="#942a21"
            style={styles.buttonInline}
            title="Add exercise"
            onPress={() => this.handleSaveExercise()}
          />
          <View style={styles.spaceSmall} />
          <Button
            color="#942a21"
            style={styles.buttonInline}
            title="Exit"
            onPress={() => this.handleExit()}
          />
        </View>
        <View style={styles.space} />
      </ScrollView>
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

export default Exercise;
