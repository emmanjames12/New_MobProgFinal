import { StyleSheet, TextInput, Text, View } from 'react-native'
import React, { useState} from 'react'
import AppButton from '../components/AppButton'
import { DatabaseConnection } from '../DataBase/Database'

const db = DatabaseConnection.getConnection();

const DeleteCourse = () => {
  const [course_id, setcourse_id] = useState('')
  const [student_id, setStudent_id] = useState('')

  const delete_course = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'DELETE FROM table_courses where course_id=?',
        [course_id],
        (tx, results) => {
          console.log('Course data deleted successfully')
        }
      )
    })
  }
  const delete_student = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'DELETE FROM table_student where student_id=?',
        [student_id],
        (tx, results) => {
          console.log('Student data deleted successfully')
        }
      )
    })
  }
  return (
    <View style={styles.view}>
      <Text style={styles.heading}>Delete Student Data from Database</Text>
      <TextInput
        placeholder='Enter Course ID'
        value={course_id}
        onChangeText={(course_id)=>setcourse_id(course_id)}
        style={styles.input}
      />

      <AppButton
        title='Delete Course'
        onPress={delete_course}/>
    
      <TextInput
        placeholder='Enter Student ID'
        value={student_id}
        onChangeText={(student_id) => setStudent_id(student_id)}
        style={styles.input}
      />

      <AppButton
        title='Delete Student'
        onPress={delete_student} />
    </View>
    
  )
}


export default DeleteCourse

const styles = StyleSheet.create({
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000033",
    padding: 10,
    margin: 10,
},
  view: {
    borderWidth: 0,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 60,
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height:55,
    
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 7,

},
})