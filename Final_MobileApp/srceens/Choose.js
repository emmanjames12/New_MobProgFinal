import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Choose = () => {
  const navigation = useNavigation();

  const handleButtonPress = (role) => {
    console.log(`Selected role: ${role}`);

    if (role === 'Student') {
      navigation.navigate('Students');
    } else if (role === 'Instructor') {
      navigation.navigate('Instructor');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress('Student')}
      >
        <Icon name="school" size={30} color="#fff" />
        <Text style={styles.buttonTextStudent}>Student</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => handleButtonPress('Instructor')}
      >
        <Icon name="person" size={30} color="#fff" />
        <Text style={styles.buttonTextInstructor}>Instructor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#03C04A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
    }),
  },
  button2: {
    flexDirection: 'row',
    backgroundColor: '#9E1B32',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
    }),
  },
  buttonTextStudent: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: "uppercase",
    marginLeft: 10,
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 33,
  },
  buttonTextInstructor: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: "uppercase",
    marginLeft: 10,
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});

export default Choose;
