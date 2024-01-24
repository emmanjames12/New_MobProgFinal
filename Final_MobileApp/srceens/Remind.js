import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const Remind = () => {
  const [note, setNote] = useState('');
  const [reminder, setReminder] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSpinnerVisible, setSpinnerVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [activityCounter, setActivityCounter] = useState(0);
  const [quizCounter, setQuizCounter] = useState(0);
  const [labCounter, setLabCounter] = useState(0);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    setReminder(selectedDate);
    // Spinner remains visible until explicitly hidden
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
    setSpinnerVisible(true); // Show spinner when date picker is shown
  };

  const hideSpinner = () => {
    setShowDatePicker(false);
    setSpinnerVisible(false);
  };

  const finishReminder = () => {
    // Subtract the counter based on the selected option of the last deleted reminder
    if (reminders.length > 0) {
      const lastDeletedReminder = reminders[reminders.length - 1];
      switch (lastDeletedReminder.type) {
        case 'Activity':
          setActivityCounter(activityCounter - 1);
          break;
        case 'Quiz':
          setQuizCounter(quizCounter - 1);
          break;
        case 'Lab':
          setLabCounter(labCounter - 1);
          break;
        default:
          break;
      }
    }
  };

  const saveReminder = () => {
    let newText = note;
    if (reminder) {
      const formattedDateTime = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(reminder);

      newText += `, ${formattedDateTime}`;
    }

    const newReminder = { text: newText, type: selectedOption, id: Date.now() };
    setReminders([...reminders, newReminder]);

    // Increment the counter based on the selected option
    switch (selectedOption) {
      case 'Activity':
        setActivityCounter(activityCounter + 1);
        break;
      case 'Quiz':
        setQuizCounter(quizCounter + 1);
        break;
      case 'Lab':
        setLabCounter(labCounter + 1);
        break;
      default:
        break;
    }

    setNote('');
    setReminder(null);
    setSelectedOption(null);
    hideSpinner(); // Hide spinner when saving reminder
  };

  const deleteReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
    finishReminder(); // Subtract counters when a reminder is deleted
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/bar.png')} style={styles.headerImage} />
      <Text style={styles.headerText}>Overall Progress</Text>

      <ScrollView>
        <View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.optionButton, selectedOption === 'Activity' && styles.selectedOption]}
              onPress={() => setSelectedOption('Activity')}
            >
              <Icon name="rocket" size={20} color="#fff" />
              <Text style={styles.optionText}>Activity</Text>
              <Text style={styles.counterText}>{activityCounter}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, selectedOption === 'Quiz' && styles.selectedOption]}
              onPress={() => setSelectedOption('Quiz')}
            >
              <Icon name="pencil" size={20} color="#fff" />
              <Text style={styles.optionText}>Quiz</Text>
              <Text style={styles.counterText}>{quizCounter}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, selectedOption === 'Lab' && styles.selectedOption]}
              onPress={() => setSelectedOption('Lab')}
            >
              <Icon name="laptop" size={20} color="#fff" />
              <Text style={styles.optionText}>Lab</Text>
              <Text style={styles.counterText}>{labCounter}</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter your note"
            value={note}
            onChangeText={(text) => setNote(text)}
            multiline
          />

          <TouchableOpacity style={styles.minimizedDateButton} onPress={showDatepicker}>
            <Icon name="calendar" size={20} color="#fff" />
            <Text style={styles.minimizedDateButtonText}>Select Date & Time</Text>
          </TouchableOpacity>

          {isSpinnerVisible && (
            <TouchableOpacity style={styles.minimizedDateButton} onPress={hideSpinner}>
              <Icon name="eye-slash" size={20} color="#fff" />
              <Text style={styles.hideSpinnerText}>Hide Spinner</Text>
            </TouchableOpacity>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={reminder || new Date()}
              mode="datetime"
              is24Hour={true}
              display="spinner"
              onChange={handleDateChange}
              style={{ alignSelf: 'center', width: 300, height: 200 }}
            />
          )}

          <TouchableOpacity style={styles.saveButtonContainer} onPress={saveReminder}>
            <Icon name="save" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Save Reminder</Text>
          </TouchableOpacity>

          {reminders.map((reminder) => (
            <View key={reminder.id} style={styles.savedReminderContainer}>
              <Text>{reminder.text}</Text>

              <TouchableOpacity onPress={() => deleteReminder(reminder.id)}>
                {/* Change from "Delete Reminder" to "Finished" with color '#03C04A' */}
                <Text style={styles.finishReminderText}>I've Finished This</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginVertical: 3,
  },
  counterText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
  },
  savedReminderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  finishReminderText: {
    color: '#00563B', // Change color to '#03C04A'
  },
  finishButton: {
    backgroundColor: '#03C04A',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  saveButtonContainer: {
    backgroundColor: '#9E1B32',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    marginLeft: 8,
  },
  headerImage: {
    width: 90,
    height: 60,
    marginTop: 20,
    marginBottom: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#03C04A',
    padding: 10,
    borderRadius: 5,
    marginRight: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedOption: {
    backgroundColor: '#006400',
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
    marginLeft: 8,
  },
  input: {
    height: 100,
    borderColor: '',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 16,
    paddingHorizontal: 25,
  },
  minimizedDateButton: {
    backgroundColor: '#03C04A',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minimizedDateButtonText: {
    color: '#fff',
    textAlign: 'center',
    marginLeft: 10,
  },
  hideSpinnerButton: {
    backgroundColor: '#03C04A',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hideSpinnerText: {
    color: '#fff',
    textAlign: 'center',
    marginLeft: 8,
  },
});

export default Remind;
    