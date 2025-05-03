import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TeacherMessages() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for messages
  const messages = [
    { 
      id: 1, 
      sender: 'Principal Johnson', 
      avatar: 'PJ',
      preview: 'Please submit the quarterly assessment reports by Friday.',
      time: '10:30 AM',
      unread: true,
    },
    { 
      id: 2, 
      sender: 'Sarah Davis (Parent)',
      avatar: 'SD', 
      preview: 'My daughter will be absent tomorrow due to a doctor appointment.',
      time: 'Yesterday',
      unread: false,
    },
    { 
      id: 3, 
      sender: 'Math Department',
      avatar: 'MD', 
      preview: 'Reminder: Department meeting on Thursday at 3 PM.',
      time: 'Yesterday',
      unread: true,
    },
    { 
      id: 4, 
      sender: 'John Smith (Parent)',
      avatar: 'JS', 
      preview: 'Thank you for the feedback on John\'s project.',
      time: 'May 12',
      unread: false,
    },
    { 
      id: 5, 
      sender: 'IT Support',
      avatar: 'IT', 
      preview: 'Your request for projector maintenance has been processed.',
      time: 'May 10',
      unread: false,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SMS</Text>
        </View>
        <ThemedText style={styles.title}>Messages</ThemedText>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>T</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.composeButton}>
          <Text style={styles.composeButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <ThemedText style={[styles.tabText, styles.activeTabText]}>All</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <ThemedText style={styles.tabText}>Unread</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <ThemedText style={styles.tabText}>Parents</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <ThemedText style={styles.tabText}>Staff</ThemedText>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {messages.map(message => (
          <TouchableOpacity key={message.id} style={styles.messageItem}>
            <View style={[styles.avatarContainer, message.unread && styles.unreadAvatarContainer]}>
              <Text style={styles.avatarText}>{message.avatar}</Text>
              {message.unread && <View style={styles.unreadIndicator} />}
            </View>
            
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <ThemedText style={[styles.senderName, message.unread && styles.unreadSenderName]}>
                  {message.sender}
                </ThemedText>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
              <ThemedText 
                style={[styles.messagePreview, message.unread && styles.unreadMessagePreview]}
                numberOfLines={2}
              >
                {message.preview}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
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
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>📋</Text>
          </View>
          <ThemedText style={styles.navText}>Attendance</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.navIcon, styles.activeNavIcon]}>
            <Text style={styles.navIconText}>✉️</Text>
          </View>
          <ThemedText style={[styles.navText, styles.activeNavText]}>Messages</ThemedText>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  composeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  composeButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0a7ea4',
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  unreadAvatarContainer: {
    backgroundColor: '#0a7ea4',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  unreadIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF5252',
    borderWidth: 2,
    borderColor: 'white',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    flex: 1,
  },
  unreadSenderName: {
    fontWeight: 'bold',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  messagePreview: {
    fontSize: 14,
    color: '#666',
  },
  unreadMessagePreview: {
    color: '#333',
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