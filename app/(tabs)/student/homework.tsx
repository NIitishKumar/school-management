import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StudentHomework() {
  const colorScheme = useColorScheme();
  
  // Sample data for homework items
  const homeworkItems = [
    { 
      id: 1, 
      title: 'Complete Exercise 5', 
      subject: 'Mathematics',
      dueDate: 'Today', 
      dueTime: '3:00 PM',
      description: 'Complete problems 1-10 from Chapter 5 in the textbook.',
      status: 'pending',
      icon: '✏️',
    },
    { 
      id: 2, 
      title: 'Read Chapter 4', 
      subject: 'History',
      dueDate: 'Today', 
      dueTime: '3:00 PM',
      description: 'Read pages 78-92 and prepare notes for discussion.',
      status: 'pending',
      icon: '🏛️',
    },
    { 
      id: 3, 
      title: 'Lab Report', 
      subject: 'Science',
      dueDate: 'Tomorrow', 
      dueTime: '9:00 AM',
      description: 'Complete the lab report for the experiment conducted last week.',
      status: 'pending',
      icon: '🔬',
    },
    { 
      id: 4, 
      title: 'Essay Draft', 
      subject: 'English',
      dueDate: 'May 20', 
      dueTime: '11:59 PM',
      description: 'Submit the first draft of your analytical essay.',
      status: 'pending',
      icon: '📚',
    },
    { 
      id: 5, 
      title: 'Vocabulary Quiz', 
      subject: 'Spanish',
      dueDate: 'May 21', 
      dueTime: '10:30 AM',
      description: 'Study the vocabulary list for the upcoming quiz.',
      status: 'pending',
      icon: '🌎',
    },
  ];
  
  // Filter homework by status
  const pendingHomework = homeworkItems.filter(item => item.status === 'pending');
  const completedHomework = homeworkItems.filter(item => item.status === 'completed');

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🎓</Text>
        </View>
        <ThemedText style={styles.title}>Homework</ThemedText>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>S</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <ThemedText style={[styles.tabText, styles.activeTabText]}>Pending</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <ThemedText style={styles.tabText}>Completed</ThemedText>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Homework List */}
        <View style={styles.homeworkList}>
          {pendingHomework.map(item => (
            <TouchableOpacity key={item.id} style={styles.homeworkItem}>
              <View style={styles.homeworkHeader}>
                <View style={styles.homeworkIconContainer}>
                  <Text style={styles.homeworkIcon}>{item.icon}</Text>
                </View>
                <View style={styles.homeworkInfo}>
                  <ThemedText style={styles.homeworkTitle}>{item.title}</ThemedText>
                  <Text style={styles.homeworkSubject}>{item.subject}</Text>
                </View>
                <View style={styles.dueDateContainer}>
                  <Text style={styles.dueDate}>{item.dueDate}</Text>
                  <Text style={styles.dueTime}>{item.dueTime}</Text>
                </View>
              </View>
              
              <View style={styles.homeworkContent}>
                <ThemedText style={styles.homeworkDescription}>{item.description}</ThemedText>
              </View>
              
              <View style={styles.homeworkActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Mark as Complete</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.actionButton, styles.viewDetailsButton]}>
                  <Text style={[styles.actionButtonText, styles.viewDetailsText]}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>📅</Text>
          </View>
          <ThemedText style={styles.navText}>Timetable</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.navIcon, styles.activeNavIcon]}>
            <Text style={styles.navIconText}>📚</Text>
          </View>
          <ThemedText style={[styles.navText, styles.activeNavText]}>Homework</ThemedText>
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
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4285F4',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#4285F4',
  },
  homeworkList: {
    padding: 16,
  },
  homeworkItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  homeworkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  homeworkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  homeworkIcon: {
    fontSize: 20,
  },
  homeworkInfo: {
    flex: 1,
  },
  homeworkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  homeworkSubject: {
    fontSize: 14,
    color: '#666',
  },
  dueDateContainer: {
    alignItems: 'flex-end',
  },
  dueDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  dueTime: {
    fontSize: 12,
    color: '#666',
  },
  homeworkContent: {
    marginBottom: 16,
  },
  homeworkDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  homeworkActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  viewDetailsButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4285F4',
  },
  viewDetailsText: {
    color: '#4285F4',
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