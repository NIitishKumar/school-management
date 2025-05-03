import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors'; // Assuming you have Colors defined
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link } from 'expo-router'; // Or your navigation library's Link

export default function CreateAccountScreen() {
  const [adminName, setAdminName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, // Adjust background color
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center',
    },
    card: {
      width: '100%',
      maxWidth: 400, // Limit card width on larger screens
      padding: 30,
      borderRadius: 8,
      backgroundColor: colorScheme === 'dark' ? Colors.dark.card : Colors.light.card, // Adjust card background
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // for Android shadow
      alignItems: 'center',
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 25,
      textAlign: 'center',
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      backgroundColor: colorScheme === 'dark' ? Colors.dark.input : Colors.light.input, // Adjust input background
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    },
    button: {
      width: '100%',
      backgroundColor: '#007AFF', // Standard blue color
      paddingVertical: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    signInText: {
      fontSize: 14,
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    },
    signInLink: {
      color: '#007AFF', // Standard blue color
      fontWeight: 'bold',
    },
  });

  const handleNext = () => {
    // Handle the next step logic here
    console.log('Admin Name:', adminName);
    console.log('School Name:', schoolName);
    console.log('School Email:', schoolEmail);
    // Navigate to the next screen or perform validation
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Welcome, create your school account</ThemedText>
      <View style={styles.card}>
        <ThemedText style={styles.subtitle}>It is our great pleasure to have you on board!</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter the name of admin"
          value={adminName}
          onChangeText={setAdminName}
          placeholderTextColor={colorScheme === 'dark' ? Colors.dark.placeholder : Colors.light.placeholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter the name of school"
          value={schoolName}
          onChangeText={setSchoolName}
          placeholderTextColor={colorScheme === 'dark' ? Colors.dark.placeholder : Colors.light.placeholder}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter the school email"
          value={schoolEmail}
          onChangeText={setSchoolEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colorScheme === 'dark' ? Colors.dark.placeholder : Colors.light.placeholder}
        />
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <ThemedText style={styles.signInText}>
          Already have an account?{' '}
          <Link href="/"> 
            <Text style={styles.signInLink}>Sign in</Text>
          </Link>
        </ThemedText>
      </View>
    </ThemedView>
  );
}