import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

const ProfileInstructor = ({ user }) => {
  const [profileImage, setProfileImage] = useState(require('../assets/me.jpg'));

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfileImage({ uri: result.uri });
      }
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

  const handleEditPress = () => {
    pickImage();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        
        <Image source={profileImage} style={styles.profileImage} />

        <TouchableOpacity
          style={styles.editIcon}
          onPress={handleEditPress}
        >
          {/* FontAwesome edit icon */}
          <FontAwesome name="pencil" size={18} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.text}>
          <FontAwesome name="user" size={18} color="#000" /> {user?.name ? user.name : 'Alex Simon Dacer'}
        </Text>
        <Text style={styles.email}>
          <FontAwesome name="envelope" size={18} color="#000" /> {user?.email ? `Email: ${user.email}` : 'alexsimon35@gmail.com'}
        </Text>
        <Text style={styles.bio}>
          <FontAwesome name="graduation-cap" size={18} color="#000" /> {user?.bio ? `Bio: ${user.bio} Instructor` : 'Instructor'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  editIcon: {
    position: 'absolute',
    bottom: 380,
    right: 130,
    backgroundColor: '#9E1B32',
    padding: 11,
    borderRadius: 100,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default ProfileInstructor;
