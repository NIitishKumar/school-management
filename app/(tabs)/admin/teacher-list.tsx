import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function TeacherList() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  // Sample data for teachers
  const teachers = [
    { 
      id: 1, 
      name: 'John Smith', 
      subjects: ['Mathematics', 'Physics'],
      grade: 'Grade 10',
      status: 'Active',
      department: 'Science',
      initials: 'JS'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      subjects: ['English Literature', 'History'],
      grade: 'Grade 9',
      status: 'Active',
      department: 'Humanities',
      initials: 'SJ'
    },
    { 
      id: 3, 
      name: 'Michael Brown', 
      subjects: ['Chemistry', 'Biology'],
      grade: 'Grade 11',
      status: 'On Leave',
      department: 'Science',
      initials: 'MB'
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      subjects: ['Art', 'Design'],
      grade: 'Grade 8',
      status: 'Active',
      department: 'Arts',
      initials: 'ED'
    },
    { 
      id: 5, 
      name: 'Robert Wilson', 
      subjects: ['Physical Education'],
      grade: 'All Grades',
      status: 'Active',
      department: 'Sports',
      initials: 'RW'
    },
  ];
  
  // Filter options
  const filterOptions = ['All', 'Science', 'Humanities', 'Arts', 'Sports'];
  const statusOptions = ['All', 'Active', 'On Leave'];
  
  // Filter teachers based on search query and selected filter
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         teacher.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'All' || teacher.department === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Teachers</ThemedText>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/admin/add-teacher')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Search & Filter Section */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or subject"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
          {filterOptions.map(filter => (
            <TouchableOpacity 
              key={filter} 
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipSelected
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text 
                style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.filterChipTextSelected
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Teacher List */}
      <ScrollView style={styles.teacherList} showsVerticalScrollIndicator={false}>
        {filteredTeachers.map(teacher => (
          <TouchableOpacity 
            key={teacher.id} 
            style={styles.teacherCard}
            onPress={() => console.log('View teacher profile:', teacher.id)}
          >
            <View style={styles.teacherAvatar}>
              <Text style={styles.teacherInitials}>{teacher.initials}</Text>
            </View>
            <View style={styles.teacherInfo}>
              <ThemedText style={styles.teacherName}>{teacher.name}</ThemedText>
              <Text style={styles.teacherSubjects}>{teacher.subjects.join(', ')}</Text>
              <Text style={styles.teacherGrade}>{teacher.grade}</Text>
            </View>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: teacher.status === 'Active' ? '#4CAF50' : '#FFA000' }
            ]}>
              <Text style={styles.statusText}>{teacher.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/admin/add-teacher')}
      >
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabText}>Add Teacher</Text>
      </TouchableOpacity>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a237e',
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  searchFilterContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterScrollView: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: '#1a237e',
  },
  filterChipText: {
    fontSize: 14,
    color: '#333',
  },
  filterChipTextSelected: {
    color: 'white',
  },
  teacherList: {
    flex: 1,
    padding: 16,
  },
  teacherCard: {
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
  teacherAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8eaf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  teacherInitials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  teacherSubjects: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  teacherGrade: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#1a237e',
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabIcon: {
    fontSize: 20,
    color: 'white',
    marginRight: 8,
  },
  fabText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});