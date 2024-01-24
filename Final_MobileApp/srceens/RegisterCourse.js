import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import { DatabaseConnection } from '../DataBase/Database';

// Assuming you are using React Navigation
import { useNavigation } from '@react-navigation/native';

const db = DatabaseConnection.getConnection();

const RegisterCourse = () => {
  const navigation = useNavigation();

  const [course_name, setcourse_name] = useState('');
  const [course_code, setcourse_code] = useState('');
  const [course_tutor, setcourse_tutor] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = () => {
    console.log(course_name, course_code, course_tutor);
  };

  const Register_Course = () => {
    console.log(course_name, course_code, course_tutor);

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_courses(course_name, course_code, course_tutor) VALUES (?, ?, ?)',
        [course_name, course_code, course_tutor],
        (tx, result) => {
          console.log('Course Added Successfully');
          setRefresh(!refresh);

          // Pass the newly registered course data to Subject component
          navigation.navigate('Subject', {
            newCourse: { id: result.insertId, title: course_name, content: course_tutor },
          });
        }
      );
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.view}>
      <Text style={styles.heading}>Please fill following information to register course:</Text>
      <TextInput
        placeholder='Enter Course Name'
        value={course_name}
        onChangeText={(course_name) => setcourse_name(course_name)}
        style={styles.input}
      />
      <TextInput
        placeholder='Enter Course Code'
        value={course_code}
        onChangeText={(course_code) => setcourse_code(course_code)}
        style={styles.input}
      />
      <TextInput
        placeholder='Enter Tutor for Course'
        value={course_tutor}
        onChangeText={(course_tutor) => setcourse_tutor(course_tutor)}
        style={styles.input}
      />

      <AppButton title='Register Course' onPress={Register_Course} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000033',
    padding: 10,
    margin: 8,
  },
  view: {
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 60,
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 55,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 7,
  },
});

export default RegisterCourse;
