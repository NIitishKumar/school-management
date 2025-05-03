import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function AddStudent() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('');
  const [address, setAddress] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  
  // Form validation
  const validateForm = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !grade.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
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
        'Student added successfully',
        [{ text: 'OK', onPress: () => router.push('/admin/student-list') }]
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar with Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Add New Student</ThemedText>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Personal Information Section */}
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>Personal Information</ThemedText>
            
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>First Name *</ThemedText>
                <TextInput
                  style={[styles.input, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First Name"
                  placeholderTextColor="#9e9e9e"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>Last Name *</ThemedText>
                <TextInput
                  style={[styles.input, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last Name"
                  placeholderTextColor="#9e9e9e"
                />
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Email Address *</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                placeholderTextColor="#9e9e9e"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                placeholderTextColor="#9e9e9e"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Grade/Class *</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
                value={grade}
                onChangeText={setGrade}
                placeholder="Grade/Class"
                placeholderTextColor="#9e9e9e"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Address</ThemedText>
              <TextInput
                style={[styles.input, styles.textArea, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
                placeholderTextColor="#9e9e9e"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
          
          {/* Parent/Guardian Information */}
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>Parent/Guardian Information</ThemedText>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Parent/Guardian Name</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
                value={parentName}
                onChangeText={setParentName}
                placeholder="Parent/Guardian Name"
                placeholderTextColor="#9e9e9e"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Parent/Guardian Contact</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
                value={parentContact}
                onChangeText={setParentContact}
                placeholder="Parent/Guardian Contact"
                placeholderTextColor="#9e9e9e"
                keyboardType="phone-pad"
              />
            </View>
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: '#1a237e' }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Add Student</Text>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#1a237e',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  formContainer: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
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
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});