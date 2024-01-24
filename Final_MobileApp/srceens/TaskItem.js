// TaskItem.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskItem = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [points, setPoints] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setDueDate(selectedDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = () => {
    const newTask = {
      title,
      instructions,
      points,
      dueDate,
      attachment,
    };

    setTasks([...tasks, newTask]);

    setTitle('');
    setInstructions('');
    setPoints('');
    setDueDate('');
    setAttachment(null);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>

      {/* <Image source={require('../assets/bar.png')} style={styles.headerImage} /> */}

      <View style={styles.mainContent}>
        <Text style={styles.headerText}>Create a Task:</Text>

        <ScrollView>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Instructions"
            value={instructions}
            onChangeText={setInstructions}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Points"
            value={points}
            onChangeText={setPoints}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.attachmentButton}
            onPress={() => alert('Upload attachment')}
          >
            {/* <Icon name="paperclip" size={20} color="black" /> */}
            <Text style={styles.attachmentText}>Attach File</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.minimizedDateButton} onPress={showDatepicker}>
          <Icon name="calendar" size={20} color="#fff" />
            <Text style={styles.minimizedDateButtonText}>SELECT DUE DATE</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="datetime"
              is24Hour={true}
              display="spinner"
              onChange={handleDateChange}
              style={{ alignSelf: 'center', width: 300, height: 200 }}
            />
          )}

          {attachment && (
            <Text style={styles.attachmentInfo}>Attached: {attachment.name}</Text>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="save" size={18} color="#fff" />
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>

          {tasks.map((task, index) => (
            <View key={index} style={styles.submittedDataContainer}>
              <Text style={styles.submittedDataTitle}>Task {index + 1}:</Text>
              <Text>{`Title: ${task.title}`}</Text>
              <Text>{`Instructions: ${task.instructions}`}</Text>
              <Text>{`Points: ${task.points}`}</Text>
              <Text>{`Due Date: ${task.dueDate}`}</Text>
              {task.attachment && (
                <Text>{`Attachment: ${task.attachment.name}`}</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // White background
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
    marginBottom: -30,
  },
  headerImage: {
    width: 50,
    height: 60,
    marginVertical: 20,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginVertical: 20,
    padding: 1,
    paddingTop: -50,
    alignSelf: 'center',
  },
  mainContent: {
    paddingHorizontal: 20,
    backgroundColor: 'white', // White background
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 70,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 16,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  minimizedDateButton: {
    backgroundColor: '#03C04A',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minimizedDateButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 7,
  },
  attachmentButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: -15,
    marginLeft: -10,
    textDecorationLine: 'underline',
  },
  attachmentText: {
    fontSize: 17,
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  attachmentInfo: {
    marginTop: 10,
    fontSize: 17,
    color: '#2ecc71',
  },
  submitButton: {
    backgroundColor: '#9E1B32',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 7,
  },
  submittedDataContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  submittedDataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TaskItem;