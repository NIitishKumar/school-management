import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, TextInput, Switch } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function AddTeacher() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [isActive, setIsActive] = useState(true);
  
  // Dropdown options
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const departments = ['Science', 'Humanities', 'Arts', 'Sports', 'Mathematics'];
  
  // Subject selection
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectInput, setSubjectInput] = useState('');
  const availableSubjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'History', 'Geography', 'Art', 'Music', 
    'Physical Education', 'Computer Science'
  ];
  
  // Class/Grade selection
  const [selectedGrades, setSelectedGrades] = useState([]);
  const availableGrades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  
  // Form validation
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    let formErrors = {};
    
    if (!fullName.trim()) formErrors.fullName = 'Full name is required';
    if (!email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!phone.trim()) formErrors.phone = 'Phone number is required';
    if (!department) formErrors.department = 'Department is required';
    if (selectedSubjects.length === 0) formErrors.subjects = 'At least one subject is required';
    if (selectedGrades.length === 0) formErrors.grades = 'At least one grade is required';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  
  const handleSave = () => {
    if (validateForm()) {
      console.log('Teacher saved:', {
        fullName,
        email,
        phone,
        department,
        subjects: selectedSubjects,
        grades: selectedGrades,
        status: isActive ? 'Active' : 'On Leave'
      });
      
      // Navigate back to teacher list
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
  
  const toggleGrade = (grade) => {
    if (selectedGrades.includes(grade)) {
      setSelectedGrades(selectedGrades.filter(g => g !== grade));
    } else {
      setSelectedGrades([...selectedGrades, grade]);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Add Teacher</ThemedText>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>✓</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        {/* Full Name */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Full Name</ThemedText>
          <TextInput
            style={[styles.textInput, errors.fullName && styles.inputError]}
            placeholder="Enter full name"
            value={fullName}
            onChangeText={setFullName}
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
        </View>
        
        {/* Email */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Email Address</ThemedText>
          <TextInput
            style={[styles.textInput, errors.email && styles.inputError]}
            placeholder="Enter email address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        
        {/* Phone */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
          <TextInput
            style={[styles.textInput, errors.phone && styles.inputError]}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>
        
        {/* Department Dropdown */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Department</ThemedText>
          <TouchableOpacity 
            style={[styles.dropdownButton, errors.department && styles.inputError]}
            onPress={() => setIsDepartmentOpen(!isDepartmentOpen)}
          >
            <Text style={department ? styles.dropdownSelectedText : styles.dropdownPlaceholder}>
              {department || 'Select department'}
            </Text>
            <Text style={styles.dropdownIcon}>{isDepartmentOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {errors.department && <Text style={styles.errorText}>{errors.department}</Text>}
          
          {isDepartmentOpen && (
            <View style={styles.dropdownList}>
              {departments.map(dept => (
                <TouchableOpacity 
                  key={dept} 
                  style={styles.dropdownItem}
                  onPress={() => {
                    setDepartment(dept);
                    setIsDepartmentOpen(false);
                  }}
                >
                  <Text style={[styles.dropdownItemText, dept === department && styles.dropdownItemSelected]}>
                    {dept}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        {/* Subjects */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Assigned Subjects</ThemedText>
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
        
        {/* Grades */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Assigned Classes/Grades</ThemedText>
          <View style={[styles.chipsContainer, errors.grades && styles.inputError]}>
            {selectedGrades.map(grade => (
              <TouchableOpacity 
                key={grade} 
                style={styles.chip}
                onPress={() => toggleGrade(grade)}
              >
                <Text style={styles.chipText}>{grade}</Text>
                <Text style={styles.chipRemove}>×</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.grades && <Text style={styles.errorText}>{errors.grades}</Text>}
          
          <View style={styles.gradeSelector}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gradeList}>
              {availableGrades
                .filter(grade => !selectedGrades.includes(grade))
                .map(grade => (
                <TouchableOpacity 
                  key={grade} 
                  style={styles.gradeItem}
                  onPress={() => toggleGrade(grade)}
                >
                  <Text style={styles.gradeItemText}>{grade}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        
        {/* Status Toggle */}
        <View style={styles.inputGroup}>
          <View style={styles.toggleContainer}>
            <ThemedText style={styles.inputLabel}>Status</ThemedText>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{isActive ? 'Active' : 'On Leave'}</Text>
              <Switch
                value={isActive}
                onValueChange={setIsActive}
                trackColor={{ false: '#f4f3f4', true: '#1a237e' }}
                thumbColor={'#fff'}
              />
            </View>
          </View>
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>Save Teacher</Text>
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
  gradeSelector: {
    marginTop: 8,
  },
  gradeList: {
    flexDirection: 'row',
  },
  gradeItem: {
    backgroundColor: '#1a237e',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  gradeItemText: {
    fontSize: 14,
    color: 'white',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginRight: 8,
    fontSize: 16,
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