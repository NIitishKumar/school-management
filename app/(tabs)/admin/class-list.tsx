import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function ClassList() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGrade, setFilterGrade] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'size'
  
  // Sample data for classes
  const classes = [
    { 
      id: 1, 
      name: 'Grade 8 - Section A', 
      teacher: 'John Smith',
      students: 32,
      subjects: 8,
      grade: 'Grade 8'
    },
    { 
      id: 2, 
      name: 'Grade 8 - Section B', 
      teacher: 'Sarah Johnson',
      students: 30,
      subjects: 8,
      grade: 'Grade 8'
    },
    { 
      id: 3, 
      name: 'Grade 9 - Section A', 
      teacher: 'Michael Brown',
      students: 28,
      subjects: 9,
      grade: 'Grade 9'
    },
    { 
      id: 4, 
      name: 'Grade 10 - Section A', 
      teacher: 'Emily Davis',
      students: 25,
      subjects: 10,
      grade: 'Grade 10'
    },
    { 
      id: 5, 
      name: 'Grade 11 - Section A', 
      teacher: 'Robert Wilson',
      students: 22,
      subjects: 8,
      grade: 'Grade 11'
    },
  ];
  
  // Filter and sort options
  const gradeOptions = ['All', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  
  // Filter and sort classes
  const filteredClasses = classes
    .filter(cls => {
      const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cls.teacher.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGrade = filterGrade === 'All' || cls.grade === filterGrade;
      return matchesSearch && matchesGrade;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'size') {
        return b.students - a.students;
      }
      return 0;
    });

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Classes</ThemedText>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/admin/add-class')}
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
            placeholder="Search by class name or teacher"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterSortContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
            {gradeOptions.map(grade => (
              <TouchableOpacity 
                key={grade} 
                style={[
                  styles.filterChip,
                  filterGrade === grade && styles.filterChipSelected
                ]}
                onPress={() => setFilterGrade(grade)}
              >
                <Text 
                  style={[
                    styles.filterChipText,
                    filterGrade === grade && styles.filterChipTextSelected
                  ]}
                >
                  {grade}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.sortContainer}>
            <ThemedText style={styles.sortLabel}>Sort by:</ThemedText>
            <TouchableOpacity 
              style={[styles.sortButton, sortBy === 'name' && styles.sortButtonSelected]}
              onPress={() => setSortBy('name')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'name' && styles.sortButtonTextSelected]}>Name</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sortButton, sortBy === 'size' && styles.sortButtonSelected]}
              onPress={() => setSortBy('size')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'size' && styles.sortButtonTextSelected]}>Size</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Class List */}
      <ScrollView style={styles.classList} showsVerticalScrollIndicator={false}>
        {filteredClasses.map(cls => (
          <TouchableOpacity 
            key={cls.id} 
            style={styles.classCard}
            onPress={() => console.log('View class details:', cls.id)}
          >
            <View style={styles.classInfo}>
              <ThemedText style={styles.className}>{cls.name}</ThemedText>
              <Text style={styles.classTeacher}>Teacher: {cls.teacher}</Text>
              <View style={styles.classStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>👥</Text>
                  <Text style={styles.statText}>{cls.students} Students</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>📚</Text>
                  <Text style={styles.statText}>{cls.subjects} Subjects</Text>
                </View>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/admin/add-class')}
      >
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabText}>Add Class</Text>
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
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterScrollView: {
    flex: 1,
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
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    marginLeft: 4,
  },
  sortButtonSelected: {
    backgroundColor: '#1a237e',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#333',
  },
  sortButtonTextSelected: {
    color: 'white',
  },
  classList: {
    flex: 1,
    padding: 16,
  },
  classCard: {
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
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  classTeacher: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  classStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
  chevron: {
    fontSize: 24,
    color: '#1a237e',
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