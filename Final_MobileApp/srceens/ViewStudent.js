import { StyleSheet, Text, Image, View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { DatabaseConnection } from "../DataBase/Database";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const db = DatabaseConnection.getConnection();

const ViewStudent = ({ navigation }) => {
  const [FlatListItems, setFlatListItems] = useState([]);
  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM table_student",
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

  const listViewItems = (item) => {
    return (
      <ScrollView>
        <View style={styles.touchableContainer}>
          <View style={styles.view}>
            {/* Update icon for updating student info */}
            <TouchableOpacity onPress={() => navigation.navigate("Update", { item })} style={styles.updateIcon}>
              <Ionicons name="md-create" size={32} color="#FAF9F6" />
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.text}>Student ID:{item.student_id}</Text>
              <Text style={styles.text}>First Name:{item.student_firstname}</Text>
              <Text style={styles.text}>Last Name:{item.student_lastname}</Text>
              <Text style={styles.text}>Address:{item.student_address}</Text>
              <Text style={styles.text}>Email Address:{item.student_email}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View>
      {/* <Text style={styles.heading}>View The List Here of All Our Students</Text> */}
      <Image
        style={styles.image}
        source={require('../assets/bar.png')} // Replace with the actual path to your image
      />
      <Text style={styles.wow}>DASHBOARD</Text>

      <FlatList
        data={FlatListItems}
        keyExtractor={(item, index) => index.toString()}
        // renderItem={({item})=>listViewItems(item)}
        renderItem={({ item }) => listViewItems(item)}
      />
    </View>
  );
};

export default ViewStudent;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000033",
    padding: 15,
    margin: 4,
  },
  wow: {
    fontSize: 32,
    fontStyle: 'Poppins',
    fontWeight: 'bold',
    color: '#000033',
    padding: 15,
    marginTop: -91,
    textAlign: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 80,
    height: 60,
    marginRight: 20,
    margin: 35,
    marginTop: 10,
    transform: [{ rotate: '53deg' }], // Adjust the degree as needed
  },
  touchableContainer: {
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 11,
    padding: 15, // Increased padding for a larger container
    backgroundColor: '#9E1B32',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10, // Adjust the spacing as needed
  },
  text: {
    fontSize: 15,
    color: "#FAF9F6",
    margin: 1,
    fontWeight: "bold"
  },
  updateIcon: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
