import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StudentTimetable() {
  const colorScheme = useColorScheme();
  
  // Sample data for days of the week
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [selectedDay, setSelectedDay] = useState(weekDays[0]);
  
  // Sample timetable data
  const timetableData = {
    Monday: [
      { id: 1, subject: 'Mathematics', time: '8:30 AM - 9:30 AM', room: 'Room 101', teacher: 'Mr. Johnson' },
      { id: 2, subject: 'Science', time: '9:45 AM - 10:45 AM', room: 'Lab 3', teacher: 'Ms. Williams' },
      { id: 3, subject: 'Break', time: '10:45 AM - 11:15 AM', room: 'Cafeteria', teacher: '' },
      { id: 4, subject: 'History', time: '11:15 AM - 12:15 PM', room: 'Room 205', teacher: 'Mrs. Davis' },
      { id: 5, subject: 'English', time: '1:00 PM - 2:00 PM', room: 'Room 103', teacher: 'Mr. Brown' },
    ],
    Tuesday: [
      { id: 1, subject: 'Physics', time: '8:30 AM - 9:30 AM', room: 'Lab 2', teacher: 'Mr. Smith' },
      { id: 2, subject: 'Computer Science', time: '9:45 AM - 10:45 AM', room: 'Computer Lab', teacher: 'Ms. Johnson' },
      { id: 3, subject: 'Break', time: '10:45 AM - 11:15 AM', room: 'Cafeteria', teacher: '' },
      { id: 4, subject: 'Mathematics', time: '11:15 AM - 12:15 PM', room: 'Room 101', teacher: 'Mr. Johnson' },
      { id: 5, subject: 'Physical Education', time: '1:00 PM - 2:00 PM', room: 'Gymnasium', teacher: 'Coach Wilson' },
    ],
    Wednesday: [
      { id: 1, subject: 'English', time: '8:30 AM - 9:30 AM', room: 'Room 103', teacher: 'Mr. Brown' },
      { id: 2, subject: 'History', time: '9:45 AM - 10:45 AM', room: 'Room 205', teacher: 'Mrs. Davis' },
      { id: 3, subject: 'Break', time: '10:45 AM - 11:15 AM', room: 'Cafeteria', teacher: '' },
      { id: 4, subject: 'Science', time: '11:15 AM - 12:15 PM', room: 'Lab 3', teacher: 'Ms. Williams' },
      { id: 5, subject: 'Art', time: '1:00 PM - 2:00 PM', room: 'Art Studio', teacher: 'Ms. Garcia' },
    ],
    Thursday: [
      { id: 1, subject: 'Mathematics', time: '8:30 AM - 9:30 AM', room: 'Room 101', teacher: 'Mr. Johnson' },
      { id: 2, subject: 'Computer Science', time: '9:45 AM - 10:45 AM', room: 'Computer Lab', teacher: 'Ms. Johnson' },
      { id: 3, subject: 'Break', time: '10:45 AM - 11:15 AM', room: 'Cafeteria', teacher: '' },
      { id: 4, subject: 'Physics', time: '11:15 AM - 12:15 PM', room: 'Lab 2', teacher: 'Mr. Smith' },
      { id: 5, subject: 'Music', time: '1:00 PM - 2:00 PM', room: 'Music Room', teacher: 'Mr. Taylor' },
    ],
    Friday: [
      { id: 1, subject: 'Science', time: '8:30 AM - 9:30 AM', room: 'Lab 3', teacher: 'Ms. Williams' },
      { id: 2, subject: 'English', time: '9:45 AM - 10:45 AM', room: 'Room 103', teacher: 'Mr. Brown' },
      { id: 3, subject: 'Break', time: '10:45 AM - 11:15 AM', room: 'Cafeteria', teacher: '' },
      { id: 4, subject: 'Mathematics', time: '11:15 AM - 12:15 PM', room: 'Room 101', teacher: 'Mr. Johnson' },
      { id: 5, subject: 'History', time: '1:00 PM - 2:00 PM', room: 'Room 205', teacher: 'Mrs. Davis' },
    ],
  };
  
  // Get subject icon based on subject name
  const getSubjectIcon = (subject) => {
    const icons = {
      'Mathematics': '➕',
      'Science': '🔬',
      'History': '🏛️',
      'English': '📚',
      'Physics': '⚛️',
      'Computer Science': '💻',
      'Physical Education': '🏃',
      'Art': '🎨',
      'Music': '🎵',
      'Break': '☕',
    };
    
    return icons[subject] || '📝';
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🎓</Text>
        </View>
        <ThemedText style={styles.title}>Timetable</ThemedText>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>S</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Day Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.daySelector}
        contentContainerStyle={styles.daySelectorContent}
      >
        {weekDays.map(day => (
          <TouchableOpacity 
            key={day} 
            style={[styles.dayButton, selectedDay === day && styles.selectedDayButton]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayButtonText, selectedDay === day && styles.selectedDayButtonText]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Current Date */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>May 15, 2023</Text>
        </View>
        
        {/* Timetable */}
        <View style={styles.timetableContainer}>
          {timetableData[selectedDay].map(period => (
            <View key={period.id} style={styles.periodCard}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{period.time}</Text>
              </View>
              
              <View style={[styles.periodContent, period.subject === 'Break' && styles.breakPeriod]}>
                <View style={styles.subjectIconContainer}>
                  <Text style={styles.subjectIcon}>{getSubjectIcon(period.subject)}</Text>
                </View>
                
                <View style={styles.periodDetails}>
                  <ThemedText style={styles.subjectName}>{period.subject}</ThemedText>
                  {period.subject !== 'Break' && (
                    <>
                      <Text style={styles.roomText}>{period.room}</Text>
                      <Text style={styles.teacherText}>{period.teacher}</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          ))}
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
          <View style={[styles.navIcon, styles.activeNavIcon]}>
            <Text style={styles.navIconText}>📅</Text>
          </View>
          <ThemedText style={[styles.navText, styles.activeNavText]}>Timetable</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>📚</Text>
          </View>
          <ThemedText style={styles.navText}>Homework</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>📊</Text>
          </View>
          <ThemedText style={styles.navText}>Grades</ThemedText>
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
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
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
    color: '#4285F4',
  },
  daySelector: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  daySelectorContent: {
    paddingHorizontal: 8,
  },
  dayButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  selectedDayButton: {
    backgroundColor: '#4285F4',
  },
  dayButtonText: {
    fontSize: 16,
    color: '#666',
  },
  selectedDayButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateContainer: {
    padding: 16,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  timetableContainer: {
    padding: 16,
  },
  periodCard: {
    marginBottom: 16,
  },
  timeContainer: {
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  periodContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  breakPeriod: {
    backgroundColor: '#f5f5f5',
  },
  subjectIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  subjectIcon: {
    fontSize: 24,
  },
  periodDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roomText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  teacherText: {
    fontSize: 14,
    color: '#666',
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
    color: '#4285F4',
    fontWeight: 'bold',
  },
});