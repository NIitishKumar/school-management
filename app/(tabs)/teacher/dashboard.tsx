import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TeacherDashboard() {
  const colorScheme = useColorScheme();
  
  // Sample data
  const attendanceRate = '95%';
  const totalStudents = 28;
  const pendingAssignments = 5;
  const unreadMessages = 3;
  
  const scheduleItems = [
    { id: 1, subject: 'Mathematics', time: '09:00 - 10:30', room: 'Room 101', color: '#4CAF50' },
    { id: 2, subject: 'Science', time: '11:00 - 12:30', room: 'Lab 3', color: '#2196F3' },
    { id: 3, subject: 'English', time: '14:00 - 15:30', room: 'Room 205', color: '#9C27B0' },
  ];
  
  const recentActivities = [
    { id: 1, type: 'submission', text: 'John Smith submitted Math Assignment', time: '10 mins ago' },
    { id: 2, type: 'message', text: 'New message from Principal', time: '1 hour ago' },
    { id: 3, type: 'announcement', text: 'School meeting tomorrow at 3 PM', time: '2 hours ago' },
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SMS</Text>
        </View>
        <ThemedText style={styles.title}>Teacher Dashboard</ThemedText>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>T</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#E3F2FD' }]}>
            <ThemedText style={styles.statValue}>{attendanceRate}</ThemedText>
            <ThemedText style={styles.statLabel}>Attendance</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#E8F5E9' }]}>
            <ThemedText style={styles.statValue}>{totalStudents}</ThemedText>
            <ThemedText style={styles.statLabel}>Students</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFF3E0' }]}>
            <ThemedText style={styles.statValue}>{pendingAssignments}</ThemedText>
            <ThemedText style={styles.statLabel}>Assignments</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#E1F5FE' }]}>
            <ThemedText style={styles.statValue}>{unreadMessages}</ThemedText>
            <ThemedText style={styles.statLabel}>Messages</ThemedText>
          </View>
        </View>
        
        {/* Today's Schedule */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Today's Schedule</ThemedText>
          
          {scheduleItems.map(item => (
            <View key={item.id} style={styles.scheduleItem}>
              <View style={[styles.subjectIndicator, { backgroundColor: item.color }]} />
              <View style={styles.scheduleContent}>
                <ThemedText style={styles.subjectName}>{item.subject}</ThemedText>
                <View style={styles.scheduleDetails}>
                  <View style={styles.scheduleDetail}>
                    <Text style={styles.scheduleDetailText}>{item.time}</Text>
                  </View>
                  <View style={styles.scheduleDetail}>
                    <Text style={styles.scheduleDetailText}>{item.room}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
        
        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>📋</Text>
              </View>
              <ThemedText style={styles.quickActionText}>Mark Attendance</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>📝</Text>
              </View>
              <ThemedText style={styles.quickActionText}>Create Assignment</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>👥</Text>
              </View>
              <ThemedText style={styles.quickActionText}>View Class List</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>✉️</Text>
              </View>
              <ThemedText style={styles.quickActionText}>Send Message</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Recent Activity */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
          
          {recentActivities.map(activity => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityContent}>
                <ThemedText style={styles.activityText}>{activity.text}</ThemedText>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
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
            <Text style={styles.navIconText}>📚</Text>
          </View>
          <ThemedText style={styles.navText}>Classes</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>📋</Text>
          </View>
          <ThemedText style={styles.navText}>Attendance</ThemedText>
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  sectionContainer: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  subjectIndicator: {
    width: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  scheduleContent: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  scheduleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  scheduleDetailText: {
    fontSize: 14,
    color: '#666',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionIconText: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  activityItem: {
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
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
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
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
});