import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, KeyboardAvoidingView, TextInput, View, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { Formik } from "formik";
import AppButton from '../components/AppButton';
import { DatabaseConnection } from '../DataBase/Database';

const db = DatabaseConnection.getConnection();

const Register = ({ navigation }) => {
  const [student_firstname, setStudent_firstname] = useState('');
  const [student_lastname, setStudent_lastname] = useState('');
  const [student_address, setStudent_address] = useState('');
  const [student_email, setStudent_email] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = React.useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Students"); // Corrected navigation to "Students"
      }
    });
    return unsubscribe;
  }, [navigation]);

  const handleSignUp = () => {
    if (!email || !password) {
      // Check if email or password is missing
      alert("Please enter both email and password.");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        console.log('Registered with:', user.password);
        Register_student();
      })
      .catch(error => alert(error.message));
  };

  const Register_student = () => {
    if (!student_firstname || !student_lastname || !student_address || !student_email) {
      // Check if any student data is missing
      alert("Please enter all student details.");
      return;
    }

  const Register_student = () => {
    console.log(student_firstname, student_lastname, student_address, student_email);

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_student(student_firstname, student_lastname, student_address, student_email)VALUES(?,?,?,?)',
        [student_firstname, student_lastname, student_address, student_email],
        (tx, result) => {
          console.log('Student Register Successfully');
          navigation.navigate('SplashScreen'); // Corrected navigation to "Students"
        }
      );
    });
  }
};

  return (
    <Formik>
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/bar.png')} // Replace with the actual path to your image
      />

      <Text style={styles.heading}>SIGN UP</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder='First Name'
          value={student_firstname}
          onChangeText={(student_firstname) => setStudent_firstname(student_firstname)}
          style={styles.input}
        />
        <TextInput
          placeholder='Last Name'
          value={student_lastname}
          onChangeText={(student_lastname) => setStudent_lastname(student_lastname)}
          style={styles.input}
        />
        <TextInput
          placeholder='Address'
          value={student_address}
          onChangeText={(student_address) => setStudent_address(student_address)}
          style={styles.input}
        />
        <TextInput
          placeholder='Student Email'
          value={student_email}
          onChangeText={(student_email) => setStudent_email(student_email)}
          style={styles.input}
        />
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
        placeholder='Password'
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={!showPass}
        style={styles.input}
        />
        <TouchableOpacity
        onPress={() => setShowPass(!showPass)}
        style={styles.showPassButton}
        >
          <Text>{showPass ? 'Hide Password' : 'Show Password'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.login}>
        Already Have an Account?{' '}
        <Text style={styles.textClick} onPress={() => navigation.navigate("LogIn")}>
          Login
        </Text>
      </Text>

      <AppButton title='Register' onPress={() => { handleSignUp(); Register_student(); }} />


      <Text style={styles.text}>We make your</Text>
      <Text>
        <Text style={{ color: '#03C04A', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>DREAMS </Text>
        <Text style={{ color: '#800000', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>PROGRESSIVE</Text>
      </Text>
      
    </KeyboardAvoidingView>
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginHorizontal: 17,
    marginVertical: 17,
    padding: 20,
    backgroundColor: "White",
  },
  heading: {
    fontSize: 32,
    fontStyle: 'Poppins',
    fontWeight: 'bold',
    color: '#000033',
    padding: 15,
    textAlign: 'center',
    marginLeft: 10, // Adjust the left margin to position the heading after the image
  },
  image: {
    width: 80,
    height: 80,
    marginRight: -7, // Reduce the right margin
    marginTop: -20,
    transform: [{ rotate: '53deg' }],
  },
  
  login: {
    fontSize: 15,
    color: "black",
    textAlign: 'center',
    marginBottom: 40,
    marginVertical: 15,
  },
  textClick: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 10,
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 23,
    fontWeight: '400',
    color: "#000033",
    margin: 1,
    marginTop: 20, // Adjusted margin to move the "We make your" text higher
    textAlign: 'center',
  },
  formContainer: {
    // flexGrow: 1,
    marginTop: 25,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%', // Adjusted width to take up the entire width
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 55,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default Register;