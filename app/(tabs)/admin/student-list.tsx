import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, TextInput, FlatList, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function StudentList() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Sample data for students
  const students = [
    { id: '1', name: 'Emma Johnson', rollNumber: 'S2023001', grade: 'Grade 8 - A', status: 'Active', avatar: 'https://via.placeholder.com/40' },
    { id: '2', name: 'Jacob Wilson', rollNumber: 'S2023002', grade: 'Grade 8 - A', status: 'Active', avatar: 'https://via.placeholder.com/40' },
    { id: '3', name: 'Sophia Martinez', rollNumber: 'S2023003', grade: 'Grade 8 - B', status: 'Active', avatar: 'https://via.placeholder.com/40' },
    { id: '4', name: 'Noah Thompson', rollNumber: 'S2023004', grade: 'Grade 8 - B', status: 'Inactive', avatar: 'https://via.placeholder.com/40' },
    { id: '5', name: 'Olivia Garcia', rollNumber: 'S2023005', grade: 'Grade 9 - A', status: 'Active', avatar: 'https://via.placeholder.com/40' },
    { id: '6', name: 'Liam Rodriguez', rollNumber: 'S2023006', grade: 'Grade 9 - A', status: 'Active', avatar: 'https://via.placeholder.com/40' },
    { id: '7', name: 'Ava Lopez', rollNumber: 'S2023007', grade: 'Grade 9 - B', status: 'Inactive', avatar: 'https://via.placeholder.com/40' },
    { id: '8', name: 'William Lee', rollNumber: 'S2023008', grade: 'Grade 9 - B', status: 'Active', avatar: 'https://via.placeholder.com/40' },
    { id: '9', name: 'Isabella Gonzalez', rollNumber: 'S2023009', grade: 'Grade 10 - A', status: 'Active', avatar: 'https://via.placeholder.com/40' },
    { id: '10', name: 'James Perez', rollNumber: 'S2023010', grade: 'Grade 10 - A', status: 'Active', avatar: 'https://via.placeholder.com/40' },
    { id: '11', name: 'Mia Sanchez', rollNumber: 'S2023011', grade: 'Grade 10 - B', status: 'Inactive', avatar: 'https://via.placeholder.com/40' },
    { id: '12', name: 'Benjamin Rivera', rollNumber: 'S2023012', grade: 'Grade 10 - B', status: 'Active', avatar: 'https://via.placeholder.com/40' },
  ];

  // Filter options
  const filterOptions = ['All', 'Grade 8', 'Grade 9', 'Grade 10', 'Active', 'Inactive'];

  // Filter students based on search query and active filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Active' || activeFilter === 'Inactive') {
      return matchesSearch && student.status === activeFilter;
    }
    return matchesSearch && student.grade.includes(activeFilter);
  });

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.studentCard, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#FFFFFF' }]}
      onPress={() => console.log(`View profile of ${item.name}`)}
    >
      <Image source={{ uri: item.avatar }} style={styles.studentAvatar} />
      <View style={styles.studentInfo}>
        <ThemedText style={styles.studentName}>{item.name}</ThemedText>
        <View style={styles.studentDetails}>
          <Text style={styles.studentId}>{item.rollNumber}</Text>
          <Text style={styles.studentClass}>{item.grade}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { 
        backgroundColor: item.status === 'Active' ? '#E8F5E9' : '#EEEEEE',
        borderColor: item.status === 'Active' ? '#81C784' : '#BDBDBD'
      }]}>
        <Text style={[styles.statusText, { 
          color: item.status === 'Active' ? '#2E7D32' : '#757575'
        }]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

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
        <ThemedText style={styles.title}>Student List</ThemedText>
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={24} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>
      </View>
      
      {/* Search and Filter Section */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : '#F5F5F5' }]}>
          <Ionicons name="search" size={20} color="#757575" style={styles.searchInputIcon} />
          <TextInput
            style={[styles.searchInput, { color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text }]}
            placeholder="Search by name or ID"
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
      
      {/* Student List */}
      <FlatList
        data={filteredStudents}
        renderItem={renderStudentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.studentList}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/admin/add-student')}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.fabText}>Add Student</Text>
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
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people" size={24} color="#0a7ea4" />
          <Text style={[styles.navText, { color: '#0a7ea4' }]}>Students</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bar-chart-outline" size={24} color="#757575" />
          <Text style={styles.navText}>Reports</Text>
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
  searchIcon: {
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
  studentList: {
    padding: 16,
    paddingBottom: 100, // Extra padding for FAB and bottom nav
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  studentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentId: {
    fontSize: 14,
    color: '#757575',
    marginRight: 8,
  },
  studentClass: {
    fontSize: 14,
    color: '#757575',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
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