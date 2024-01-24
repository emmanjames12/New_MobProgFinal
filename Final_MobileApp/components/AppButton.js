import React from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";

function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        Platform.OS === "android"
          ? { elevation: 5 }  // Add elevation for Android
          : { shadowColor: "black", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },  // Add shadow styles for iOS
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    backgroundColor: '#9E1B32',
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
