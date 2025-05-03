import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function ParentDashboard() {
  const colorScheme = useColorScheme();
  
  // Sample data for the dashboard
  const childData = {
    name: 'Emma Johnson',
    grade: '8th Grade',
    attendance: '95%',
    gpa: '3.8',
    image: 'https://via.placeholder.com/150'
  };

  const upcomingEvents = [
    { id: '1', title: 'Math Final Exam', date: 'June 15, 2023', type: 'exam' },
    { id: '2', title: 'Science Project Due', date: 'June 20, 2023', type: 'assignment' },
    { id: '3', title: 'Parent-Teacher Meeting', date: 'June 25, 2023', type: 'event' },
  ];

  const messages = [
    { id: '1', teacher: 'Ms. Smith', subject: 'Math', message: 'Emma did great on her recent quiz!', time: '2 hours ago' },
    { id: '2', teacher: 'Mr. Johnson', subject: 'Science', message: 'Please remind Emma to bring her lab notebook tomorrow.', time: '1 day ago' },
  ];

  const feeData = {
    amount: '$250.00',
    dueDate: 'June 30, 2023',
    status: 'Pending'
  };

  // Custom theme colors (warm, friendly theme with teal and light green)
  const theme = {
    primary: '#26A69A', // teal
    secondary: '#81C784', // light green
    accent: '#4DB6AC', // lighter teal
    background: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
    card: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF',
    text: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    border: colorScheme === 'dark' ? '#2c2d2e' : '#E0E0E0',
  };

  const renderEventItem = ({ item }) => (
    <View style={[styles.eventItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.eventIconContainer}>
        {item.type === 'exam' && <FontAwesome name="pencil-square-o" size={20} color={theme.primary} />}
        {item.type === 'assignment' && <FontAwesome name="file-text-o" size={20} color={theme.primary} />}
        {item.type === 'event' && <FontAwesome name="calendar" size={20} color={theme.primary} />}
      </View>
      <View style={styles.eventContent}>
        <Text style={[styles.eventTitle, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.eventDate, { color: theme.text + '99' }]}>{item.date}</Text>
      </View>
    </View>
  );

  const renderMessageItem = ({ item }) => (
    <View style={[styles.messageItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.messageHeader}>
        <Text style={[styles.teacherName, { color: theme.text }]}>{item.teacher} ({item.subject})</Text>
        <Text style={[styles.messageTime, { color: theme.text + '99' }]}>{item.time}</Text>
      </View>
      <Text style={[styles.messageContent, { color: theme.text }]}>{item.message}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Bar */}
      <View style={[styles.topBar, { backgroundColor: theme.primary }]}>
        <Text style={styles.topBarTitle}>Parent Dashboard</Text>
        <View style={styles.topBarIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="mail-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image 
              source={{ uri: 'https://via.placeholder.com/40' }} 
              style={styles.profilePic} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Child Summary Card */}
        <View style={[styles.childCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Image 
            source={{ uri: childData.image }} 
            style={styles.childImage} 
          />
          <View style={styles.childInfo}>
            <Text style={[styles.childName, { color: theme.text }]}>{childData.name}</Text>
            <Text style={[styles.childGrade, { color: theme.text + '99' }]}>{childData.grade}</Text>
            <View style={styles.childStats}>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.text + '99' }]}>Attendance</Text>
                <Text style={[styles.statValue, { color: theme.primary }]}>{childData.attendance}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.text + '99' }]}>Recent GPA</Text>
                <Text style={[styles.statValue, { color: theme.primary }]}>{childData.gpa}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Upcoming Events Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Upcoming Events & Exams</Text>
          <FlatList
            data={upcomingEvents}
            renderItem={renderEventItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Recent Messages Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Messages</Text>
          <FlatList
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Fee Payment Status */}
        <View style={[styles.feeCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.feeHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Fee Payment Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: theme.secondary + '30' }]}>
              <Text style={[styles.statusText, { color: theme.secondary }]}>{feeData.status}</Text>
            </View>
          </View>
          <View style={styles.feeDetails}>
            <View>
              <Text style={[styles.feeLabel, { color: theme.text + '99' }]}>Amount Due</Text>
              <Text style={[styles.feeAmount, { color: theme.text }]}>{feeData.amount}</Text>
            </View>
            <View>
              <Text style={[styles.feeLabel, { color: theme.text + '99' }]}>Due Date</Text>
              <Text style={[styles.feeDate, { color: theme.text }]}>{feeData.dueDate}</Text>
            </View>
            <TouchableOpacity style={[styles.payButton, { backgroundColor: theme.primary }]}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Multiple Children Tabs - Simplified version */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Children</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.childrenTabs}>
            <TouchableOpacity style={[styles.childTab, { backgroundColor: theme.primary, borderColor: theme.primary }]}>
              <Text style={styles.childTabText}>Emma</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.childTab, { backgroundColor: 'transparent', borderColor: theme.border }]}>
              <Text style={[styles.childTabText, { color: theme.text }]}>Jacob</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.childTab, { backgroundColor: 'transparent', borderColor: theme.border }]}>
              <Text style={[styles.childTabText, { color: theme.text }]}>Sophia</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={[styles.bottomNav, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={theme.primary} />
          <Text style={[styles.navText, { color: theme.primary }]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color={theme.text + '99'} />
          <Text style={[styles.navText, { color: theme.text + '99' }]}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document-text-outline" size={24} color={theme.text + '99'} />
          <Text style={[styles.navText, { color: theme.text + '99' }]}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="card-outline" size={24} color={theme.text + '99'} />
          <Text style={[styles.navText, { color: theme.text + '99' }]}>Payments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color={theme.text + '99'} />
          <Text style={[styles.navText, { color: theme.text + '99' }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  topBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 8,
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  childCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  childImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  childInfo: {
    marginLeft: 16,
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  childGrade: {
    fontSize: 14,
    marginBottom: 8,
  },
  childStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  statLabel: {
    fontSize: 12,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  eventItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  eventIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(38, 166, 154, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  eventDate: {
    fontSize: 14,
    marginTop: 2,
  },
  messageItem: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  teacherName: {
    fontSize: 15,
    fontWeight: '500',
  },
  messageTime: {
    fontSize: 12,
  },
  messageContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  feeCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  feeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  feeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 12,
  },
  feeAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  feeDate: {
    fontSize: 15,
    marginTop: 2,
  },
  payButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  payButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  childrenTabs: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  childTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  childTabText: {
    color: 'white',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 80,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
  },
});