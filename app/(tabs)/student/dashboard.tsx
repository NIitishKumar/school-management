import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StudentDashboard() {
  const colorScheme = useColorScheme();
  
  // Sample data for subjects
  const subjects = [
    { id: 1, name: 'Mathematics', progress: 92, icon: '➕' },
    { id: 2, name: 'History', progress: 60, icon: '🏛️' },
    { id: 3, name: 'Science', progress: 78, icon: '🔬' },
    { id: 4, name: 'English', progress: 85, icon: '📚' },
  ];
  
  // Sample data for homework
  const homeworkItems = [
    { id: 1, title: 'Complete Exercise 5', subject: 'Mathematics', dueTime: 'Today, 3:00 PM', icon: '✏️' },
    { id: 2, title: 'Read Chapter 4', subject: 'History', dueTime: 'Today, 3:00 PM', icon: '🏛️' },
    { id: 3, title: 'Lab Report', subject: 'Science', dueTime: 'Tomorrow, 9:00 AM', icon: '🔬' },
  ];
  
  // Sample data for notifications
  const notifications = [
    { id: 1, message: 'New assignment posted for Science', time: '1 hour ago', icon: '🔔' },
    { id: 2, message: 'Your Math test is graded', time: '3 hours ago', icon: '🔔' },
  ];
  
  // Sample attendance data
  const attendanceData = {
    present: 92,
    absent: 8,
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🎓</Text>
        </View>
        <ThemedText style={styles.title}>Student Dashboard</ThemedText>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>S</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* My Subjects Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>My Subjects</ThemedText>
          
          <View style={styles.subjectsGrid}>
            {subjects.map(subject => (
              <TouchableOpacity key={subject.id} style={styles.subjectCard}>
                <View style={styles.subjectIconContainer}>
                  <Text style={styles.subjectIcon}>{subject.icon}</Text>
                </View>
                <ThemedText style={styles.subjectName}>{subject.name}</ThemedText>
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>{subject.progress}%</Text>
                  <View style={styles.progressBarBackground}>
                    <View 
                      style={[styles.progressBar, { 
                        width: `${subject.progress}%`,
                        backgroundColor: subject.progress > 70 ? '#4CAF50' : '#FFA000'
                      }]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Attendance Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Attendance</ThemedText>
          
          <View style={styles.attendanceCard}>
            <View style={styles.attendanceStats}>
              <View style={styles.attendanceStatItem}>
                <View style={styles.attendanceIconContainer}>
                  <Text style={styles.attendanceIcon}>✓</Text>
                </View>
                <ThemedText style={styles.attendanceValue}>{attendanceData.present}%</ThemedText>
                <Text style={styles.attendanceLabel}>Present</Text>
              </View>
              
              <View style={styles.attendanceStatItem}>
                <ThemedText style={styles.attendanceValue}>{attendanceData.absent}%</ThemedText>
                <Text style={styles.attendanceLabel}>Absent</Text>
              </View>
            </View>
            
            <View style={styles.attendanceChartContainer}>
              <View style={styles.attendanceChart}>
                <View 
                  style={[styles.attendanceChartFill, { 
                    transform: [{ rotate: `${attendanceData.present * 3.6}deg` }] 
                  }]}
                />
              </View>
            </View>
          </View>
        </View>
        
        {/* Homework Due Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Homework Due</ThemedText>
          
          {homeworkItems.map(item => (
            <TouchableOpacity key={item.id} style={styles.homeworkItem}>
              <View style={styles.homeworkIconContainer}>
                <Text style={styles.homeworkIcon}>{item.icon}</Text>
              </View>
              <View style={styles.homeworkContent}>
                <ThemedText style={styles.homeworkTitle}>{item.title}</ThemedText>
                <Text style={styles.homeworkDueTime}>{item.dueTime}</Text>
              </View>
              <Text style={styles.homeworkChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Notifications Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
          
          {notifications.map(notification => (
            <TouchableOpacity key={notification.id} style={styles.notificationItem}>
              <View style={styles.notificationIconContainer}>
                <Text style={styles.notificationIcon}>{notification.icon}</Text>
              </View>
              <View style={styles.notificationContent}>
                <ThemedText style={styles.notificationMessage}>{notification.message}</ThemedText>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <Text style={styles.notificationChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.navIcon, styles.activeNavIcon]}>
            <Text style={styles.navIconText}>🏠</Text>
          </View>
          <ThemedText style={[styles.navText, styles.activeNavText]}>Dashboard</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>📅</Text>
          </View>
          <ThemedText style={styles.navText}>Timetable</ThemedText>
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
  sectionContainer: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subjectCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  subjectIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectIcon: {
    fontSize: 24,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  attendanceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  attendanceStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attendanceStatItem: {
    alignItems: 'center',
  },
  attendanceIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  attendanceIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  attendanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  attendanceLabel: {
    fontSize: 14,
    color: '#666',
  },
  attendanceChartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendanceChart: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  attendanceChartFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    transformOrigin: 'center',
  },
  homeworkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  homeworkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  homeworkIcon: {
    fontSize: 20,
  },
  homeworkContent: {
    flex: 1,
  },
  homeworkTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  homeworkDueTime: {
    fontSize: 14,
    color: '#666',
  },
  homeworkChevron: {
    fontSize: 20,
    color: '#999',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 14,
    color: '#666',
  },
  notificationChevron: {
    fontSize: 20,
    color: '#999',
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