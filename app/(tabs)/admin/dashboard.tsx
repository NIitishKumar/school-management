import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function AdminDashboard() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  
  // Sample data for stats
  const stats = [
    { id: 1, title: 'Total Students', count: 450, icon: '👨‍🎓' },
    { id: 2, title: 'Total Teachers', count: 32, icon: '👨‍🏫' },
    { id: 3, title: 'Total Classes', count: 24, icon: '🏫' },
  ];
  
  // Sample data for announcements
  const announcements = [
    { 
      id: 1, 
      title: 'School Meeting', 
      date: 'May 20, 2023',
      content: 'All staff are required to attend the annual school meeting at 3 PM in the auditorium.',
    },
    { 
      id: 2, 
      title: 'End of Term Exams', 
      date: 'June 5, 2023',
      content: 'End of term examinations will begin on June 5. Please ensure all grades are submitted by June 15.',
    },
    { 
      id: 3, 
      title: 'Summer Break', 
      date: 'June 25, 2023',
      content: 'Summer break will begin on June 25. Staff development week will be held from August 15-19.',
    },
  ];
  
  // Sample data for upcoming events
  const events = [
    { id: 1, title: 'Parent-Teacher Conference', date: 'May 18, 2023', time: '4:00 PM - 7:00 PM' },
    { id: 2, title: 'Science Fair', date: 'May 22, 2023', time: '9:00 AM - 3:00 PM' },
    { id: 3, title: 'Sports Day', date: 'May 30, 2023', time: '10:00 AM - 4:00 PM' },
    { id: 4, title: 'Graduation Ceremony', date: 'June 20, 2023', time: '11:00 AM - 1:00 PM' },
  ];
  
  // Sample data for system notifications
  const notifications = [
    { id: 1, type: 'alert', message: 'System maintenance scheduled for tonight at 11 PM', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'New curriculum updates available', time: '5 hours ago' },
    { id: 3, type: 'warning', message: 'Backup server is running at 90% capacity', time: '1 day ago' },
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🏫</Text>
        </View>
        <ThemedText style={styles.title}>Admin Dashboard</ThemedText>
        <View style={styles.topBarIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileInitial}>A</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Overview Cards */}
        <View style={styles.statsContainer}>
          {stats.map(stat => (
            <TouchableOpacity 
              key={stat.id} 
              style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
              onPress={() => {
                if (stat.title === 'Total Students') {
                  router.push('/admin/student-list');
                } else if (stat.title === 'Total Teachers') {
                  router.push('/admin/teacher-list');
                } else if (stat.title === 'Total Classes') {
                  router.push('/admin/class-list');
                }
              }}
            >
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
              </View>
              <ThemedText style={styles.statCount}>{stat.count}</ThemedText>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Recent Announcements */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Recent Announcements</ThemedText>
            <TouchableOpacity 
              key={'announcements'} 
              style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
              onPress={() => {
                    router.push('/admin/announcements');
              }}
            >
              <Text
              style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {announcements.map(announcement => (
            <TouchableOpacity 
              key={announcement.id} 
              style={styles.announcementCard}
              onPress={() => router.push('/admin/announcements')}
            >
              <View style={styles.announcementHeader}>
                <ThemedText style={styles.announcementTitle}>{announcement.title}</ThemedText>
                <Text style={styles.announcementDate}>{announcement.date}</Text>
              </View>
              <Text style={styles.announcementContent}>{announcement.content}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Quick Links */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.quickLinksContainer}>
            <TouchableOpacity 
              style={styles.quickLinkButton}
              onPress={() => router.push('/admin/add-student')}
            >
              <View style={styles.quickLinkIcon}>
                <Text style={styles.quickLinkIconText}>👤</Text>
              </View>
              <ThemedText style={styles.quickLinkText}>Add Student</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickLinkButton}
              onPress={() => router.push('/admin/add-teacher')}
            >
              <View style={styles.quickLinkIcon}>
                <Text style={styles.quickLinkIconText}>👨‍🏫</Text>
              </View>
              <ThemedText style={styles.quickLinkText}>Add Teacher</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickLinkButton}
              onPress={() => router.push('/admin/add-class')}
            >
              <View style={styles.quickLinkIcon}>
                <Text style={styles.quickLinkIconText}>🏛️</Text>
              </View>
              <ThemedText style={styles.quickLinkText}>Add Class</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickLinkButton}>
              <View style={styles.quickLinkIcon}>
                <Text style={styles.quickLinkIconText}>📊</Text>
              </View>
              <ThemedText style={styles.quickLinkText}>View Reports</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Event Calendar Preview */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Upcoming Events</ThemedText>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Full Calendar</Text>
            </TouchableOpacity>
          </View>
          
          {events.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventDateContainer}>
                <Text style={styles.eventMonth}>{event.date.split(' ')[0]}</Text>
                <Text style={styles.eventDay}>{event.date.split(' ')[1].replace(',', '')}</Text>
              </View>
              <View style={styles.eventDetails}>
                <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
              <TouchableOpacity style={styles.eventAction}>
                <Text style={styles.eventActionText}>Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        {/* System Notifications */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>System Notifications</ThemedText>
          
          {notifications.map(notification => (
            <View key={notification.id} style={styles.notificationCard}>
              <View style={[styles.notificationTypeIndicator, { 
                backgroundColor: 
                  notification.type === 'alert' ? '#F44336' : 
                  notification.type === 'warning' ? '#FFC107' : '#2196F3'
              }]} />
              <View style={styles.notificationContent}>
                <ThemedText style={styles.notificationMessage}>{notification.message}</ThemedText>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.notificationAction}>✓</Text>
              </TouchableOpacity>
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
            <Text style={styles.navIconText}>👥</Text>
          </View>
          <ThemedText style={styles.navText}>Users</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>📊</Text>
          </View>
          <ThemedText style={styles.navText}>Reports</ThemedText>
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
    backgroundColor: '#1a237e',
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
  topBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  iconText: {
    fontSize: 20,
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 24,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
  sectionContainer: {
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: '#1a237e',
    fontWeight: '500',
  },
  announcementCard: {
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
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  announcementDate: {
    fontSize: 12,
    color: '#757575',
  },
  announcementContent: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quickLinkButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickLinkIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8eaf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickLinkIconText: {
    fontSize: 24,
  },
  quickLinkText: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventDateContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventMonth: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  eventDay: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 12,
    color: '#757575',
  },
  eventAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e8eaf6',
    borderRadius: 16,
  },
  eventActionText: {
    fontSize: 12,
    color: '#1a237e',
    fontWeight: '500',
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationTypeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#757575',
  },
  notificationAction: {
    fontSize: 18,
    color: '#1a237e',
    marginLeft: 8,
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
    backgroundColor: '#e8eaf6',
  },
  navIconText: {
    fontSize: 20,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  activeNavText: {
    color: '#1a237e',
    fontWeight: 'bold',
  },
});