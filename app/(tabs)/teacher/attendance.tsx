import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Switch } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TeacherAttendance() {
  const colorScheme = useColorScheme();
  
  // Sample data for students
  const [students, setStudents] = useState([
    { id: 1, name: 'John Smith', present: true, late: false },
    { id: 2, name: 'Emily Johnson', present: true, late: false },
    { id: 3, name: 'Michael Brown', present: false, late: false },
    { id: 4, name: 'Sarah Davis', present: true, late: true },
    { id: 5, name: 'David Wilson', present: true, late: false },
    { id: 6, name: 'Jessica Taylor', present: false, late: false },
    { id: 7, name: 'Daniel Anderson', present: true, late: false },
    { id: 8, name: 'Olivia Martinez', present: true, late: false },
    { id: 9, name: 'James Thomas', present: true, late: false },
    { id: 10, name: 'Sophia Garcia', present: false, late: false },
  ]);
  
  // Sample data for classes
  const classes = [
    { id: 1, name: 'Mathematics - Grade 10A' },
    { id: 2, name: 'Science - Grade 9B' },
    { id: 3, name: 'English - Grade 11C' },
  ];
  
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  
  // Toggle student presence
  const togglePresence = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, present: !student.present, late: student.late && !student.present } : student
    ));
  };
  
  // Toggle student lateness
  const toggleLate = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, late: !student.late } : student
    ));
  };

  // Calculate attendance statistics
  const presentCount = students.filter(s => s.present).length;
  const lateCount = students.filter(s => s.present && s.late).length;
  const absentCount = students.filter(s => !s.present).length;
  const attendanceRate = Math.round((presentCount / students.length) * 100);

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SMS</Text>
        </View>
        <ThemedText style={styles.title}>Attendance</ThemedText>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>T</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Class Selector */}
        <View style={styles.classSelector}>
          <ThemedText style={styles.selectorLabel}>Select Class:</ThemedText>
          <View style={styles.classChips}>
            {classes.map(classItem => (
              <TouchableOpacity 
                key={classItem.id} 
                style={[styles.classChip, selectedClass.id === classItem.id && styles.selectedClassChip]}
                onPress={() => setSelectedClass(classItem)}
              >
                <Text 
                  style={[styles.classChipText, selectedClass.id === classItem.id && styles.selectedClassChipText]}
                >
                  {classItem.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Attendance Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#E3F2FD' }]}>
            <ThemedText style={styles.statValue}>{attendanceRate}%</ThemedText>
            <ThemedText style={styles.statLabel}>Present</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFF3E0' }]}>
            <ThemedText style={styles.statValue}>{lateCount}</ThemedText>
            <ThemedText style={styles.statLabel}>Late</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFEBEE' }]}>
            <ThemedText style={styles.statValue}>{absentCount}</ThemedText>
            <ThemedText style={styles.statLabel}>Absent</ThemedText>
          </View>
        </View>
        
        {/* Date Selector */}
        <View style={styles.dateSelector}>
          <TouchableOpacity style={styles.dateButton}>
            <Text style={styles.dateButtonText}>Today, May 15, 2023</Text>
          </TouchableOpacity>
        </View>
        
        {/* Student List */}
        <View style={styles.studentListContainer}>
          <ThemedText style={styles.sectionTitle}>Student List</ThemedText>
          
          <View style={styles.listHeader}>
            <Text style={[styles.headerText, { flex: 2 }]}>Name</Text>
            <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>Present</Text>
            <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>Late</Text>
          </View>
          
          {students.map(student => (
            <View key={student.id} style={styles.studentRow}>
              <ThemedText style={[styles.studentName, { flex: 2 }]}>{student.name}</ThemedText>
              
              <View style={[styles.toggleContainer, { flex: 1 }]}>
                <Switch
                  value={student.present}
                  onValueChange={() => togglePresence(student.id)}
                  trackColor={{ false: '#f4f3f4', true: '#4CAF50' }}
                  thumbColor={student.present ? '#fff' : '#f4f3f4'}
                />
              </View>
              
              <View style={[styles.toggleContainer, { flex: 1 }]}>
                <Switch
                  value={student.late}
                  onValueChange={() => toggleLate(student.id)}
                  disabled={!student.present}
                  trackColor={{ false: '#f4f3f4', true: '#FFA000' }}
                  thumbColor={student.late ? '#fff' : '#f4f3f4'}
                />
              </View>
            </View>
          ))}
        </View>
        
        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Attendance</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>🏠</Text>
          </View>
          <ThemedText style={styles.navText}>Dashboard</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>📚</Text>
          </View>
          <ThemedText style={styles.navText}>Classes</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.navIcon, styles.activeNavIcon]}>
            <Text style={styles.navIconText}>📋</Text>
          </View>
          <ThemedText style={[styles.navText, styles.activeNavText]}>Attendance</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>✉️</Text>
          </View>
          <ThemedText style={styles.navText}>Messages</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>⚙️</Text>
          </View>
          <ThemedText style={styles.navText}>Settings</ThemedText>
        </TouchableOpacity>
      </View>
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
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  classSelector: {
    padding: 16,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  classChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  classChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  selectedClassChip: {
    backgroundColor: '#0a7ea4',
  },
  classChipText: {
    fontSize: 14,
    color: '#333',
  },
  selectedClassChipText: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    width: '31%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  dateSelector: {
    padding: 16,
    alignItems: 'center',
  },
  dateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '500',
  },
  studentListContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  studentName: {
    fontSize: 16,
  },
  toggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavIcon: {
    backgroundColor: '#e6f7ff',
  },
  navIconText: {
    fontSize: 20,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  activeNavText: {
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
});