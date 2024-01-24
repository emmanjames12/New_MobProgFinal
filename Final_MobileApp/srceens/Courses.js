import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterCourse from "./RegisterCourse";
import ViewCourse from "./ViewCourse";
import DeleteCourses from "./DeleteCourse"; // Import DeleteCourses component

import { DatabaseConnection } from "../DataBase/Database";

const db = DatabaseConnection.getConnection();
const Stack = createStackNavigator();

const Courses = () => {
  const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS table_courses(course_id INTEGER PRIMARY KEY AUTOINCREMENT, course_name VARCHAR(25), course_code VARCHAR(25), course_tutor VARCHAR(35))",
        [],
        (tx, results) => {
          console.log("Table Created Successfully");
        }
      );
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName="RegisterCourse">
      <Stack.Screen
        name="RegisterCourse"
        component={RegisterCourse}
        options={{
          headerShown: false,
          tabBarLabel: 'Register',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-add" size={size} color={color} />
          ),
        }}
      />

      <Stack.Screen
        name="ViewCourse"
        component={ViewCourse}
        options={{
          headerShown: false,
          tabBarLabel: 'View',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="eye" size={size} color={color} />
          ),
        }}
      />

      <Stack.Screen
        name="DeleteCourse"
        component={DeleteCourses}
        options={{
          headerShown: false,
          tabBarLabel: 'Delete',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-trash" size={size} color={color} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Courses;
