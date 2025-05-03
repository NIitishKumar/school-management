import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddAnnouncement() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  
  // State for form fields
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('All');
  
  // Audience options
  const audienceOptions = ['All', 'Students', 'Teachers', 'Parents'];
  
  // Form validation
  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for the announcement');
      return false;
    }
    
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message for the announcement');
      return false;
    }
    
    return true;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the data to your backend
      Alert.alert(
        'Success', 
        'Announcement posted successfully',
        [{ text: 'OK', onPress: () => router.push('/admin/announcements') }]
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Add Announcement</ThemedText>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Ionicons name="checkmark" size={24} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Title Input */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Title</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter announcement title"
              placeholderTextColor="#9e9e9e"
            />
          </View>
          
          {/* Message Input */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Message</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
              value={message}
              onChangeText={setMessage}
              placeholder="Enter announcement message"
              placeholderTextColor="#9e9e9e"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
          </View>
          
          {/* Audience Selection */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Target Audience</ThemedText>
            <View style={styles.audienceOptions}>
              {audienceOptions.map((option) => (
                <TouchableOpacity 
                  key={option} 
                  style={[
                    styles.audienceOption,
                    audience === option ? 
                      { backgroundColor: '#0a7ea4', borderColor: '#0a7ea4' } : 
                      { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF', borderColor: '#E0E0E0' }
                  ]}
                  onPress={() => setAudience(option)}
                >
                  <Text 
                    style={[
                      styles.audienceOptionText, 
                      audience === option ? 
                        { color: '#FFFFFF' } : 
                        { color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text }
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Optional: Date & Time Picker would go here */}
          
          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.postButton}
            onPress={handleSubmit}
          >
            <Ionicons name="paper-plane" size={20} color="#FFFFFF" style={styles.postButtonIcon} />
            <Text style={styles.postButtonText}>Post Announcement</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  submitButton: {
    padding: 8,
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textArea: {
    minHeight: 150,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  audienceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  audienceOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  audienceOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  postButton: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  postButtonIcon: {
    marginRight: 8,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});