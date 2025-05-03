import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function AddClass() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  
  // Form state
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [classTeacher, setClassTeacher] = useState('');
  const [maxStudents, setMaxStudents] = useState('');
  
  // Dropdown states
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  
  // Subject selection
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState('');
  
  // Form validation
  const [errors, setErrors] = useState({});
  
  // Sample data
  const gradeOptions = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const teacherOptions = [
    'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'Robert Wilson'
  ];
  const availableSubjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'History', 'Geography', 'Art', 'Music', 
    'Physical Education', 'Computer Science'
  ];
  
  const validateForm = () => {
    let formErrors = {};
    
    if (!grade) formErrors.grade = 'Grade is required';
    if (!section.trim()) formErrors.section = 'Section is required';
    if (!classTeacher) formErrors.classTeacher = 'Class teacher is required';
    if (selectedSubjects.length === 0) formErrors.subjects = 'At least one subject is required';
    if (!maxStudents.trim()) {
      formErrors.maxStudents = 'Maximum students is required';
    } else if (isNaN(maxStudents) || parseInt(maxStudents) <= 0) {
      formErrors.maxStudents = 'Please enter a valid number';
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  
  const handleSave = () => {
    if (validateForm()) {
      console.log('Class saved:', {
        name: `${grade} - Section ${section}`,
        teacher: classTeacher,
        subjects: selectedSubjects,
        maxStudents: parseInt(maxStudents)
      });
      
      // Navigate back to class list
      router.back();
    }
  };
  
  const toggleSubject = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };
  
  const addCustomSubject = () => {
    if (subjectInput.trim() && !selectedSubjects.includes(subjectInput.trim())) {
      setSelectedSubjects([...selectedSubjects, subjectInput.trim()]);
      setSubjectInput('');
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Add Class</ThemedText>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>✓</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        {/* Grade Dropdown */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Grade</ThemedText>
          <TouchableOpacity 
            style={[styles.dropdownButton, errors.grade && styles.inputError]}
            onPress={() => setIsGradeOpen(!isGradeOpen)}
          >
            <Text style={grade ? styles.dropdownSelectedText : styles.dropdownPlaceholder}>
              {grade || 'Select grade'}
            </Text>
            <Text style={styles.dropdownIcon}>{isGradeOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {errors.grade && <Text style={styles.errorText}>{errors.grade}</Text>}
          
          {isGradeOpen && (
            <View style={styles.dropdownList}>
              {gradeOptions.map(option => (
                <TouchableOpacity 
                  key={option} 
                  style={styles.dropdownItem}
                  onPress={() => {
                    setGrade(option);
                    setIsGradeOpen(false);
                  }}
                >
                  <Text style={[styles.dropdownItemText, option === grade && styles.dropdownItemSelected]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        {/* Section */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Section</ThemedText>
          <TextInput
            style={[styles.textInput, errors.section && styles.inputError]}
            placeholder="Enter section (e.g., A, B, C)"
            value={section}
            onChangeText={setSection}
            maxLength={1}
            autoCapitalize="characters"
          />
          {errors.section && <Text style={styles.errorText}>{errors.section}</Text>}
        </View>
        
        {/* Class Teacher Dropdown */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Class Teacher</ThemedText>
          <TouchableOpacity 
            style={[styles.dropdownButton, errors.classTeacher && styles.inputError]}
            onPress={() => setIsTeacherOpen(!isTeacherOpen)}
          >
            <Text style={classTeacher ? styles.dropdownSelectedText : styles.dropdownPlaceholder}>
              {classTeacher || 'Select class teacher'}
            </Text>
            <Text style={styles.dropdownIcon}>{isTeacherOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {errors.classTeacher && <Text style={styles.errorText}>{errors.classTeacher}</Text>}
          
          {isTeacherOpen && (
            <View style={styles.dropdownList}>
              {teacherOptions.map(teacher => (
                <TouchableOpacity 
                  key={teacher} 
                  style={styles.dropdownItem}
                  onPress={() => {
                    setClassTeacher(teacher);
                    setIsTeacherOpen(false);
                  }}
                >
                  <Text style={[styles.dropdownItemText, teacher === classTeacher && styles.dropdownItemSelected]}>
                    {teacher}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        {/* Subjects */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Subjects</ThemedText>
          <View style={[styles.chipsContainer, errors.subjects && styles.inputError]}>
            {selectedSubjects.map(subject => (
              <TouchableOpacity 
                key={subject} 
                style={styles.chip}
                onPress={() => toggleSubject(subject)}
              >
                <Text style={styles.chipText}>{subject}</Text>
                <Text style={styles.chipRemove}>×</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.subjects && <Text style={styles.errorText}>{errors.subjects}</Text>}
          
          <View style={styles.subjectInputContainer}>
            <TextInput
              style={styles.subjectInput}
              placeholder="Add new subject"
              value={subjectInput}
              onChangeText={setSubjectInput}
              onSubmitEditing={addCustomSubject}
            />
            <TouchableOpacity style={styles.addSubjectButton} onPress={addCustomSubject}>
              <Text style={styles.addSubjectButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.subjectSelector}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectList}>
              {availableSubjects
                .filter(subject => !selectedSubjects.includes(subject))
                .map(subject => (
                <TouchableOpacity 
                  key={subject} 
                  style={styles.subjectItem}
                  onPress={() => toggleSubject(subject)}
                >
                  <Text style={styles.subjectItemText}>{subject}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        
        {/* Max Students */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Maximum Students</ThemedText>
          <TextInput
            style={[styles.textInput, errors.maxStudents && styles.inputError]}
            placeholder="Enter maximum number of students"
            value={maxStudents}
            onChangeText={setMaxStudents}
            keyboardType="numeric"
          />
          {errors.maxStudents && <Text style={styles.errorText}>{errors.maxStudents}</Text>}
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>Create Class</Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a237e',
    borderRadius: 20,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputError: {
    borderColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 4,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  dropdownSelectedText: {
    fontSize: 16,
  },
  dropdownIcon: {
    fontSize: 14,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  dropdownItemSelected: {
    color: '#1a237e',
    fontWeight: 'bold',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 50,
    alignItems: 'flex-start',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8eaf6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  chipText: {
    fontSize: 14,
    color: '#1a237e',
    marginRight: 4,
  },
  chipRemove: {
    fontSize: 16,
    color: '#1a237e',
    fontWeight: 'bold',
  },
  subjectInputContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  subjectInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
  },
  addSubjectButton: {
    width: 44,
    height: 44,
    backgroundColor: '#1a237e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSubjectButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  subjectSelector: {
    marginTop: 8,
  },
  subjectList: {
    flexDirection: 'row',
  },
  subjectItem: {
    backgroundColor: '#1a237e',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  subjectItemText: {
    fontSize: 14,
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#1a237e',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});