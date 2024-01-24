import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View, FlatList, TouchableOpacity } from "react-native";
import { DatabaseConnection } from "../DataBase/Database";
import { Ionicons } from "@expo/vector-icons";
import CourseDetails from './CourseDetails';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";




const db = DatabaseConnection.getConnection();
const Stack = createStackNavigator();


const ViewCourse = () => {
  
  const [FlatListItems, setFlatListItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM table_courses",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  
  
  const AppNavigator = (courseId) => {
    console.log(`Open Course with ID: ${courseId}`);
    navigation.navigate("CourseDetails", { courseId });
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ViewCourse">
          <Stack.Screen name="ViewCourse" component={ViewCourse} />
          <Stack.Screen name="CourseDetails" component={CourseDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/bar.png')}
      />
      <Text style={styles.wow}>DASHBOARD</Text>

      <FlatList
        data={FlatListItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.touchableContainer}
            onPress={() => navigation.navigate("CourseDetails", { courseDetails: item })}
          >
            <View style={styles.view}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.course_name}</Text>
                <Text style={styles.text}>{item.course_code}</Text>
                <Text style={styles.text}>Course Instructor: {item.course_tutor}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>

    

  );
};

export default ViewCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 40,
  },
  wow: {
    fontSize: 32,
    fontStyle: 'Poppins',
    fontWeight: 'bold',
    color: '#000033',
    padding: 15,
    marginTop: -93,
    textAlign: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 80,
    height: 65,
    marginRight: 10,
    margin: 35,
    marginTop: 10,
    transform: [{ rotate: '53deg' }],
  },
  touchableContainer: {
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 3,
    padding: 15,
    backgroundColor: '#9E1B32',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
    color: '#FAF9F6',
    margin: 1,
    fontWeight: 'bold',
  },
});
