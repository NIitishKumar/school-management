import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, TextInput, FlatList, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Announcements() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Sample data for announcements
  const announcements = [
    { 
      id: '1', 
      title: 'End of Year Ceremony', 
      description: 'The end of year ceremony will be held on June 30th at the school auditorium. All students and parents are invited to attend.', 
      audience: 'All', 
      date: 'May 15, 2023', 
      time: '10:30 AM' 
    },
    { 
      id: '2', 
      title: 'Parent-Teacher Meeting', 
      description: 'Parent-teacher meetings will be scheduled for next week. Please check your email for your assigned time slot.', 
      audience: 'Parents', 
      date: 'May 12, 2023', 
      time: '2:15 PM' 
    },
    { 
      id: '3', 
      title: 'Science Fair Registration', 
      description: 'Registration for the annual science fair is now open. Students interested in participating should register by May 25th.', 
      audience: 'Students', 
      date: 'May 10, 2023', 
      time: '9:00 AM' 
    },
    { 
      id: '4', 
      title: 'Staff Development Day', 
      description: 'There will be a staff development day on May 20th. No classes will be held on this day.', 
      audience: 'Teachers', 
      date: 'May 8, 2023', 
      time: '11:45 AM' 
    },
    { 
      id: '5', 
      title: 'Summer School Registration', 
      description: 'Summer school registration is now open. Classes will run from July 5th to August 15th.', 
      audience: 'All', 
      date: 'May 5, 2023', 
      time: '3:30 PM' 
    },
    { 
      id: '6', 
      title: 'New Curriculum Announcement', 
      description: 'We are excited to announce updates to our curriculum for the next academic year. Details will be shared in the upcoming staff meeting.', 
      audience: 'Teachers', 
      date: 'May 3, 2023', 
      time: '1:00 PM' 
    },
    { 
      id: '7', 
      title: 'Sports Day', 
      description: 'Annual sports day will be held on May 28th. All students are expected to participate in at least one event.', 
      audience: 'Students', 
      date: 'May 1, 2023', 
      time: '10:00 AM' 
    },
  ];

  // Filter options
  const filterOptions = ['All', 'Students', 'Teachers', 'Parents'];

  // Filter announcements based on search query and active filter
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'All') return matchesSearch;
    return matchesSearch && announcement.audience === activeFilter;
  });

  const renderAnnouncementItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.announcementCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
      onPress={() => console.log(`View details of ${item.title}`)}
    >
      <View style={styles.announcementHeader}>
        <ThemedText style={styles.announcementTitle}>{item.title}</ThemedText>
        <View style={[styles.audienceBadge, { 
          backgroundColor: getAudienceColor(item.audience).bg,
          borderColor: getAudienceColor(item.audience).border
        }]}>
          <Text style={[styles.audienceText, { 
            color: getAudienceColor(item.audience).text
          }]}>{item.audience}</Text>
        </View>
      </View>
      
      <ThemedText style={styles.announcementDescription} numberOfLines={2}>
        {item.description}
      </ThemedText>
      
      <View style={styles.announcementFooter}>
        <View style={styles.dateTimeContainer}>
          <Ionicons name="calendar-outline" size={14} color="#757575" style={styles.footerIcon} />
          <Text style={styles.dateTimeText}>{item.date}</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Ionicons name="time-outline" size={14} color="#757575" style={styles.footerIcon} />
          <Text style={styles.dateTimeText}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Helper function to get audience badge colors
  const getAudienceColor = (audience) => {
    switch(audience) {
      case 'Students':
        return { bg: '#E8F5E9', border: '#81C784', text: '#2E7D32' };
      case 'Teachers':
        return { bg: '#E3F2FD', border: '#64B5F6', text: '#1565C0' };
      case 'Parents':
        return { bg: '#FFF3E0', border: '#FFB74D', text: '#E65100' };
      case 'All':
        return { bg: '#F3E5F5', border: '#BA68C8', text: '#7B1FA2' };
      default:
        return { bg: '#EEEEEE', border: '#BDBDBD', text: '#757575' };
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Announcements</ThemedText>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/admin/add-announcement')}
        >
          <Ionicons name="add" size={24} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>
      </View>
      
      {/* Search and Filter Section */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#F5F5F5' }]}>
          <Ionicons name="search" size={20} color="#757575" style={styles.searchInputIcon} />
          <TextInput
            style={[styles.searchInput, { color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text }]}
            placeholder="Search announcements"
            placeholderTextColor="#757575"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      {/* Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity 
            key={filter} 
            style={[
              styles.filterChip,
              activeFilter === filter ? 
                { backgroundColor: '#0a7ea4', borderColor: '#0a7ea4' } : 
                { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#F5F5F5', borderColor: '#E0E0E0' }
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text 
              style={[
                styles.filterText, 
                activeFilter === filter ? 
                  { color: '#FFFFFF' } : 
                  { color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text }
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Announcements List */}
      <FlatList
        data={filteredAnnouncements}
        renderItem={renderAnnouncementItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.announcementsList}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/admin/add-announcement')}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.fabText}>Add Announcement</Text>
      </TouchableOpacity>
      
      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { 
        backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF',
        borderTopColor: colorScheme === 'dark' ? '#2c2d2e' : '#E0E0E0'
      }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/admin/dashboard')}>
          <Ionicons name="home-outline" size={24} color="#757575" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/admin/student-list')}>
          <Ionicons name="people-outline" size={24} color="#757575" />
          <Text style={styles.navText}>Students</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="megaphone" size={24} color="#0a7ea4" />
          <Text style={[styles.navText, { color: '#0a7ea4' }]}>Announcements</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color="#757575" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
  },
  searchInputIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterContainer: {
    paddingLeft: 16,
    marginBottom: 8,
  },
  filterContent: {
    paddingRight: 16,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  announcementsList: {
    padding: 16,
    paddingBottom: 100, // Extra padding for FAB and bottom nav
  },
  announcementCard: {
    padding: 16,
    borderRadius: 12,
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  audienceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  audienceText: {
    fontSize: 12,
    fontWeight: '500',
  },
  announcementDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  announcementFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  footerIcon: {
    marginRight: 4,
  },
  dateTimeText: {
    fontSize: 12,
    color: '#757575',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    backgroundColor: '#0a7ea4',
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fabText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 8,
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
    color: '#757575',
  },
});