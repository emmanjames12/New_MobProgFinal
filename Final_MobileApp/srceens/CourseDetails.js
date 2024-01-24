
import React from 'react';
import { View, Text, } from 'react-native';
import { StyleSheet, Image, ScrollView,} from "react-native";
import ViewCourse from './ViewCourse';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



const CourseDetails = ({ route }) => {
    
    const { courseDetails } = route.params;
  
    return (
        
<View>
        <Image
          style={styles.image}
          source={require('../assets/bar.png')}
        />
        <Text style={styles.coursecode}>{courseDetails.course_code}</Text>
        <Text style={styles.coursename}>{courseDetails.course_name}</Text>
<ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
        <Text style={styles.containerchildHeader}>OVER ALL PROGRESS</Text>
        <View style= {styles.containerchild1}>
            <Text style={styles.containerchildText}>ACTIVITY</Text>
            <Text style={styles.containerchildText}>QUIZ</Text>
            <Text style={styles.containerchildText}>LAB</Text>
        </View>
    </View>

    <View style={styles.containerActivity}>
        <Text style={styles.containerchildHeader}>ACTIVITY</Text>
        <Text style={styles.containerchildText}>[insert data here]</Text>
        <View style= {styles.containerchild1}>
        </View>
    </View>

    <View style={styles.containerActivity}>
        <Text style={styles.containerchildHeader}>QUIZ</Text>
        <Text style={styles.containerchildText}>[insert data here]</Text>
        <View style= {styles.containerchild1}>
        </View>
    </View>

    <View style={styles.containerActivity}>
        <Text style={styles.containerchildHeader}>LAB</Text>
        <Text style={styles.containerchildText}>[insert data here]</Text>
        <View style= {styles.containerchild1}>
        </View>
    </View>
    </ScrollView>  
</View>

    
    );
    
  };

export default CourseDetails;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
      },
    container: {
        flex: 1,
        borderRadius: 100,
      },
      image: {
        width: 65.045,
        height: 54,
        marginRight: 10,
        margin: 5,
        marginTop: 10,
        marginBottom: 20,
        transform: [{ rotate: '50deg' }],
        alignSelf: "center"
      },
    
    coursecode: {
        
        color: "red",
        textAlign:"center",
        fontSize: 32,
        fontStyle: 'Poppins',
        fontWeight: 'bold',
        color: '#000033',
        padding: 15,
        marginTop: -30,
        textAlign: 'center',
        alignSelf: 'center',

    },
    coursename: {
        color: "red",
        textAlign:"center",
        fontSize: 14,
        fontStyle: 'Poppins',
        fontWeight: 'bold',
        color: '#000033',
        padding: 15,
        marginTop: -35,
        marginBottom: -30,
        textAlign: 'center',
        alignSelf: 'center',

    },

    container: {
        borderRadius: 8,
        marginRight:20,
        marginLeft:20,
        borderWidth: 0,
        backgroundColor: "#E1E1E1",
        width: 320,
        height: 175,
        boxShadow: 'inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      
    },
    containerActivity: {
        borderRadius: 8,
        marginTop: 45,
        marginRight:20,
        marginLeft:20,
        borderWidth: 0,
        backgroundColor: "#E1E1E1",
        width: 320,
        height: 175,
        boxShadow: 'inset 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      
    },

    containerchildHeader: {
        marginTop: 10,
        color: "#930706",
        textAlign: "center",
        fontSize: 24,
        // supposedly bold and inter ng font gamit ani para nice
        fontStyle: 'Poppins',
        fontWeight: 'bold',
        
    },
    containerchildText: {
        textAlign: "center",
        fontStyle: 'Poppins',
        fontWeight: 'bold',
        
    },
    containerchild1: {
        textAlign: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        fontStyle: 'Poppins',
        fontWeight: 'bold',
        

        
    },



});