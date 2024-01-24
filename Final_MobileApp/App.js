import React from "react";
import { StyleSheet, Text, SafeAreaView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./srceens/HomeScreen";
import LogIn from "./srceens/LogInScreen";
import Register from "./srceens/Register";
import ViewStudent from "./srceens/ViewStudent";
import DeleteData from "./srceens/DeleteData";
import Students from "./srceens/Students";
import Update from "./srceens/Update";
import LogOut from './srceens/LogOut'
import Courses from "./srceens/Courses";
import RegisterCourse from "./srceens/RegisterCourse";
import ViewCourse from "./srceens/ViewCourse";
import UpdateCourse from "./srceens/UpdateCourse";
import DeleteCourse from "./srceens/DeleteCourse";
import DrawerNav from "./DrawerNav";
import SplashScreen from "./srceens/SplashScreen";
import Profile from "./srceens/Profile";
import Remind from "./srceens/Remind";
import Choose from "./srceens/Choose";
import Instructor from "./srceens/Instructor";
import ProfileInstructor from "./srceens/ProfileInstructor";
import TaskItem from "./srceens/TaskItem";
// >>>>>>> a06f63de3170c91174bd4cde2fc8536d5c1d3b52
import CourseDetails from './srceens/CourseDetails';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Progress Tracker"
      screenOptions={{
        gestureEnabled: false,
        headerLeft: null, gestureEnabled: Platform.OS === "ios",
        gestureEnabled: Platform.OS === "android"
      }}
      >
      <Stack.Screen options={{ headerShown: false}} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={DrawerNav}
        options= {{headerShown: false}}
        />
        <Stack.Screen options={{ title: 'Choose', headerShown: false }} name="Choose" component={Choose} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen options={{ headerShown: false }} name="Remind" component={Remind} />
        <Stack.Screen options={{ headerShown: false }} name="LogIn" component={LogIn} />
        <Stack.Screen options={{ headerShown: false }}  name="Register" component={Register} />
        <Stack.Screen name="Courses" component={Courses} />
        <Stack.Screen name="TaskItem" component={TaskItem} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="View" component={ViewStudent} />
        <Stack.Screen options={{ title: 'Instructor', headerShown: false }} name="Instructor" component={Instructor}/>
        <Stack.Screen name="ProfileInstructor" component={ProfileInstructor} />
        <Stack.Screen options={{ title: 'Students', headerShown: false }} name="Students" component={Students} />
        <Stack.Screen name="Delete" component={DeleteData} />
        <Stack.Screen name="Update" component={Update} />
        <Stack.Screen options={{ headerShown: false }} name="RegisterCourse" component={RegisterCourse} />
        <Stack.Screen name="ViewCourse" component={ViewCourse} />
        <Stack.Screen name="UpdateCourse" component={UpdateCourse}/>
        <Stack.Screen name="DeleteCourse" component={DeleteCourse} />
        <Stack.Screen name="Logout" component={LogOut}/>
        <Stack.Screen name="CourseDetails" component={CourseDetails}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

