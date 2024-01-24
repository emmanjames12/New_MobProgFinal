import "react-native-gesture-handler";
import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons"; // Import icons

import Students from "./srceens/Students";
import LogOut from "./srceens/LogOut";
import Courses from "./srceens/Courses";

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <Image
        source={require('./assets/logo.png')}  // Replace with the correct path to your image
        style={styles.logo}
      />
      {props.state.routes.map((route, index) => (
        <DrawerItem
          key={index}
          label={route.name}
          focused={props.state.index === index}
          onPress={() => props.navigation.navigate(route.name)}
          icon={() => renderIcon(route.name)}
          style={styles.drawerItem} 
          labelStyle={styles.drawerItemLabel}
        />
      ))}
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>We make your</Text>
        <Text>
          <Text style={{ color: '#03C04A', fontWeight: 'bold', fontSize: 16 }}>DREAMS </Text>
          <Text style={{ color: '#800000', fontWeight: 'bold', fontSize: 16 }}>PROGRESSIVE</Text>
        </Text>
      </View>
    </DrawerContentScrollView>
  );

  const renderIcon = (routeName) => {
    const iconSize = 24; // Adjust the icon size
    switch (routeName) {
      case 'Student':
        return <Ionicons name="person" size={iconSize} color="#930706" />;
      case 'Instructor':
        return <MaterialCommunityIcons name="account-tie" size={iconSize} color="#930706" />;
      case 'Logout':
        return <AntDesign name="logout" size={iconSize} color="#930706" />;
      default:
        return null;
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: "red",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={styles.drawerStyle}
      drawerAct
    >
      <Drawer.Screen
        name="Student"
        component={Students}
      />
      <Drawer.Screen
        name="Instructor"
        component={Courses}
      />
      <Drawer.Screen
        name="Logout"
        component={LogOut}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginLeft: 30,
    marginBottom: 10,
  },
  drawerStyle: {
    marginTop: 10,
  },
  drawerItem: {
    marginLeft: 10,
  },
  drawerItemLabel: {
    marginLeft: -10,
    fontSize: 16, // Adjust the font size of the drawer item label
    
  },
  bottomTextContainer: {
    marginTop: 470, // This will move the container to the bottom
    marginBottom: 20, // Increase the margin to move it even more down
    marginLeft: 10,
  },
  bottomText: {
    fontSize: 14,
    color: 'black',
  },
});

export default DrawerNav;
