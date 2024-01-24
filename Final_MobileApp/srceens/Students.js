import React, { useEffect } from "react";
import { KeyboardAvoidingView, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppButton from "../components/AppButton";
import ViewStudent from "./ViewStudent";
import Profile from './Profile';
import DeleteData from "./DeleteData";
import Subject from "./Subject";

import { DatabaseConnection } from "../DataBase/Database";
import Remind from "./Remind";
import LogOut from "./LogOut";
import ViewCourse from "./ViewCourse";

const db = DatabaseConnection.getConnection();
const Tab = createBottomTabNavigator();

const Students = () => {
  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS table_student(student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_firstname VARCHAR(25), student_lastname VARCHAR(25), student_address VARCHAR(250), student_email VARCHAR(50))",
        [],
        (tx, results) => {
          console.log("Table Created Successfully");
        }
      );
    });
  }, []);

  return (
    <Tab.Navigator>

      <Tab.Screen
        name="Subject"
        component={ViewCourse}
        options={{
          tabBarLabel: 'Courses',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="library-books" color={focused ? '#028A0F' : color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Tracker"
        component={Remind}
        options={{
          tabBarLabel: 'Tracker',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="time" color={focused ? '#028A0F' : color} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="account-circle" color={focused ? '#028A0F' : color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SignOut"
        component={LogOut}
        options={{
          tabBarLabel: 'LogOut',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="logout" color='#9E1B32' size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="View"
        component={ViewStudent}
        options={{
          tabBarLabel: 'View',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="eye" color={color} size={size} />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="Delete"
        component={DeleteData}
        options={{
          tabBarLabel: 'Delete',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="delete" color={color} size={size} />
          ),
        }}
      /> */}

    </Tab.Navigator>
  );
};

const HomeScreen = () => {
const navigation = useNavigation(); // Initialize navigation

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.text}>Welcome to Progress Tracker Admin Account.</Text>
      {/* Include your components here */}
    </KeyboardAvoidingView>
  );
};

export default Students;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000033",
    padding: 15,
    margin: 4,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
