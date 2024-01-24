import { View, Image, Text, TouchableOpacity, StyleSheet, useWindowDimensions, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Button, TextInput, HelperText, BottomNavigation} from 'react-native-paper';
import { Formik } from "formik";
import { useNavigation } from '@react-navigation/native';
import Register from './Register';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });


const LogInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = React.useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Choose")
            }
        })
        return unsubscribe

    }, [])

    const handleLogIn = () => {
        auth 
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log('Logged In With:', user.email)
                navigation.replace("Choose")
            })
            .catch(error => alert(error.message))
    }

    const { height } = useWindowDimensions();

    return (
        <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        await handleLogin(values);
      }}
      validationSchema={validationSchema}
        >
            <KeyboardAvoidingView behavior='padding'>
                <View style={Styles.container}>
                <Image
                    source={require('../assets/logo.png')} // Adjust the path to match your actual image location
                    style={[Styles.logo, { height: height * 0.3 }]} // Adjust the height as needed
                    resizeMode="contain"
                />

                    <TextInput
                        placeholder='Email'
                        mode='outlined'
                        label="Email"
                        value={email}
                        left={<TextInput.Icon icon="email" style={{ marginTop: 14 }} />}
                        keyboardType="email-address"
                        onChangeText={text => setEmail(text)}
                        style={{width: 300, height: 45}}
                        theme={{
                        colors: {
                        primary: 'green',
                        underlineColor: 'transparent',
                        },}} 
                    /> 
                        
                    
                    <TextInput
                        placeholder='Password'
                        mode="outlined"
                        label="Password"
                        left={<TextInput.Icon icon="lock" style={{ marginTop: 14 }} />}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={!showPass}
                        style={{width: 300, height: 45, marginVertical: 20}}
                        theme={{
                        colors: {
                        primary: 'green',
                        underlineColor: 'transparent',
                        },}}
                        right={<TextInput.Icon
                        icon={showPass ? "eye" : "eye-off"}
                         onPress={() => setShowPass(!showPass)}
                    />}/>

                    
                    <Button
                        onPress={handleLogIn}
                        icon="login"
                        title="Login"
                        mode="contained"
                        style={{ borderRadius: 50,
                        backgroundColor: '#9E1B32',
                        width: '100%',
                        padding: 7,
                        marginVertical: 30,
                        alignItems: 'center',
                        borderRadius: 30, }}
                    >Login
                    </Button>

                    <Button
                    
                        onPress={() => navigation.navigate("Register")}
                        icon="account-plus"
                        title="SignIN"
                        mode="contained"
                        style={{ borderRadius: 50,
                        backgroundColor: '#3AB54A',
                        width: '100%',
                        padding: 7,
                        marginVertical: -15,
                        alignItems: 'center',
                        borderRadius: 30, }}
                    >SIGN Up 
                    </Button>

                    <Text style={Styles.textClick} onPress={() => navigation.navigate("UpdateCourse", (item = item))}>
                    {" "}
                    Forgot Password?
                    </Text>


                    <Text style={Styles.text}>We make your</Text>
                    <Text>
                        <Text style={{ color: '#03C04A', fontWeight: 'bold', fontSize: 20 }}>DREAMS </Text>
                        <Text style={{ color: '#800000', fontWeight: 'bold', fontSize: 20 }}>PROGRESSIVE</Text>
                    </Text>

                    </View>
            </KeyboardAvoidingView>
        </Formik>
    )
};

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        color: '#800000',
        padding: 30,
        marginTop: 10,
    },
    logo: {
        width: 230,
        height: 100,
        alignSelf: 'center',
        marginTop: 35,
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        height:55,
        
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 7,
    },
    text: {
        fontSize: 23,
        fontWeight: '400',
        color: "#000033",
        margin: 1,
        marginTop: 90,
        textAlign: 'center', // Center the text
    },
    textClick: {
        fontSize: 15,
        color: "black",
        textAlign:'center',
        marginBottom: 10,
        marginVertical: 30,
        textDecorationLine: 'underline',
    },
    red: {
        backgroundColor: '#800000',
    },
    green: {
        color: '#03C04A',
    },
})

export default LogInScreen;