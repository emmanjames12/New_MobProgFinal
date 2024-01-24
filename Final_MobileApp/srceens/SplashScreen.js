import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a loading process
    setTimeout(() => {
      // Navigate to the Login screen after the splash screen
      navigation.replace('LogIn'); // Replace 'LogIn' with the actual name of your Login screen
    }, 2000); // Adjust the timeout as needed
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="bounceIn"
        easing="ease-in-out"
        iterationCount={1}
        source={require('../assets/logo.png')} // Adjust the path to match your actual image location
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Adjust the background color
  },
  logo: {
    width: 500, // Adjust the width of your logo
    height: 330, // Adjust the height of your logo
    resizeMode: 'contain', // Adjust the resizeMode based on your image aspect ratio
  },
});

export default SplashScreen;
