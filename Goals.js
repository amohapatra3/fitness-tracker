import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
function Goals({ route, navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dailyCalories, setDailyCalories] = useState(0);
  const [dailyProtein, setDailyProtein] = useState(0);
  const [dailyCarbohydrates, setDailyCarbohydrates] = useState(0);
  const [dailyFats, setDailyFats] = useState(0);
  const [dailyActivity, setDailyActivity] = useState(0);
  const { userName, password, token } = route.params;
  console.log(userName);
  useEffect(() => {
    fetch("http://cs571.cs.wisc.edu:5000/users/" + userName, {
      method: "GET",
      headers: { "x-access-token": token },
    })
      .then((res) => res.json())
      .then((res) => {
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setDailyActivity(res.goalDailyCalories);
        setDailyProtein(res.goalDailyProtein);
        setDailyCarbohydrates(res.goalDailyCarbohydrates),
          setDailyFats(res.goalDailyFat);
        setDailyActivity(res.goalDailyActivity);
      });
  }, []);

  function editUserInfo() {
    fetch("http://cs571.cs.wisc.edu:5000/users/" + userName, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        username: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        goalDailyCalories: dailyCalories,
        goalDailyProtein: dailyProtein,
        goalDailyCarbohydrates: dailyCarbohydrates,
        goalDailyFat: dailyFats,
        goalDailyActivity: dailyActivity,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
      });
  }

  function deleteProfile() {
    fetch("http://cs571.cs.wisc.edu:5000/users/" + userName, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={dailyActivity}
        onChangeText={setDailyActivity}
        placeholder={dailyActivity}
      ></TextInput>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button title="Add Info" onPress={editUserInfo} />
        <View style={{ width: 20, height: 20 }} />
        <Button title="Delete Profile" onPress={deleteProfile} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default Goals;
