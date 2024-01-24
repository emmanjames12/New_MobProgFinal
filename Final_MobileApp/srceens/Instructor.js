import React from "react";
import { KeyboardAvoidingView, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo, MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Import icons
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

import DeleteCourse from './DeleteCourse'
import ViewCourse from "./ViewCourse";
import RegisterCourse from "./RegisterCourse";
import LogOut from "./LogOut";
import ViewStudent from "./ViewStudent";
import ProfileInstructor from "./ProfileInstructor";
import TaskItem from "./TaskItem";

const Tab = createBottomTabNavigator();

const Instructor = () => {
return (
  <Tab.Navigator>

  {/* <Tab.Screen
    name="Courses"
    component={ViewCourse}
    options={{
      tabBarLabel: 'Courses',
      headerShown: false,
      tabBarIcon: ({ color, size, focused }) => (
        <MaterialIcons name="library-books" color={focused ? '#028A0F' : color} size={size} />
      ),
    }}
  /> */}

  <Tab.Screen
    name="TaskItem"
    component={TaskItem}
    options={{
      tabBarLabel: 'Task',
      headerShown: false,
      tabBarIcon: ({ color, size, focused }) => (
        <FontAwesome name="list" color={focused ? '#028A0F' : color} size={size} />
      ),
    }}
  />

  <Tab.Screen
    name="Register Course"
    component={RegisterCourse}
    options={{
      tabBarLabel: 'Register Course',
      headerShown: false,
      tabBarIcon: ({ color, size, focused }) => (
        <Entypo name="add-to-list" color={focused ? '#028A0F' : color} size={size} />
      ),
    }}
  />
  <Tab.Screen
    name="Delete"
    component={DeleteCourse}
    options={{
      tabBarLabel: 'Delete',
      headerShown: false,
      tabBarIcon: ({ color, size, focused }) => (
        <MaterialIcons name="delete" color={focused ? '#028A0F' : color} size={size} />
      ),
    }}
  />

<Tab.Screen
    name="ProfileInstructor"
    component={ProfileInstructor}
    options={{
      tabBarLabel: 'Profile',
      headerShown: false,
      tabBarIcon: ({ color, size, focused}) => (
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
      tabBarIcon: ({ color, size,}) => (
        <MaterialIcons name="logout" color="#800000" size={size} />
      ),
    }}
  />

</Tab.Navigator>

 );
};

export default Instructor;

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