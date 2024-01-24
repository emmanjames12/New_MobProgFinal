import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import ViewCourse from './ViewCourse'; // Import the ViewCourse component

const Subject = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute to get the route object
  const { newCourse } = route.params || {};

  // If a new course is passed, update the posts state
  const [posts, setPosts] = useState(newCourse ? [newCourse] : []);

  useEffect(() => {
    // If a new course is passed, update the posts state
    if (newCourse) {
      setPosts((prevPosts) => [...prevPosts, newCourse]);
    }
  }, [newCourse]);

  const handleSubjectClick = (subject) => {
    // Navigate to TaskItem component with the selected subject
    navigation.navigate('TaskItem', { task: subject });
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => handleSubjectClick(item)}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Image source={require('../assets/bar.png')} style={styles.topImage} />
      </View>

      <View style={styles.subjectContainer}>
        <Text style={styles.mergedText}>
          <Text style={{ color: '#03C04A', textAlign: 'center' }}>PROGRESS </Text>
          <Text style={{ color: '#800000', textAlign: 'center' }}>TRACKER</Text>
        </Text>
      </View>

      {/* Render the ViewCourse component instead of the FlatList */}
      <ViewCourse />

      {/* Render the posts FlatList */}
      {posts.length > 0 && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPostItem}
          style={styles.postList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginVertical: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'flex-start', // Change justifyContent to 'flex-start'
    alignItems: 'center',
    marginTop: -100, // Adjust marginTop
  },
  topImage: {
    width: 90,
    height: 60,
    marginVertical: 83,
  },
  subjectContainer: {
    marginTop: 10, // Adjust marginTop
  },
  mergedText: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 5,
    marginTop: -350, // Adjust marginTop
    textAlign: 'center',
  },
  postList: {
    flex: 1,
    marginTop: -300,
    marginBottom: 20,
    marginVertical: -360,
  },
  postItem: {
    backgroundColor: '#930706',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    color: 'white',
  },
});

export default Subject;
