import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StudentGrades() {
  const colorScheme = useColorScheme();
  
  // Sample data for grades
  const subjects = [
    { 
      id: 1, 
      name: 'Mathematics', 
      grade: 'A', 
      percentage: 92,
      teacher: 'Mr. Johnson',
      recentAssignments: [
        { name: 'Quiz 3', score: '19/20', date: 'May 10' },
        { name: 'Homework 5', score: '28/30', date: 'May 5' },
        { name: 'Midterm Exam', score: '92/100', date: 'Apr 28' },
      ],
      icon: '➕',
    },
    { 
      id: 2, 
      name: 'History', 
      grade: 'B', 
      percentage: 83,
      teacher: 'Mrs. Davis',
      recentAssignments: [
        { name: 'Essay', score: '42/50', date: 'May 12' },
        { name: 'Presentation', score: '18/20', date: 'May 3' },
        { name: 'Quiz 2', score: '15/20', date: 'Apr 25' },
      ],
      icon: '🏛️',
    },
    { 
      id: 3, 
      name: 'Science', 
      grade: 'A-', 
      percentage: 89,
      teacher: 'Ms. Williams',
      recentAssignments: [
        { name: 'Lab Report', score: '27/30', date: 'May 8' },
        { name: 'Quiz 4', score: '18/20', date: 'May 1' },
        { name: 'Project', score: '45/50', date: 'Apr 22' },
      ],
      icon: '🔬',
    },
    { 
      id: 4, 
      name: 'English', 
      grade: 'B+', 
      percentage: 87,
      teacher: 'Mr. Brown',
      recentAssignments: [
        { name: 'Essay', score: '43/50', date: 'May 11' },
        { name: 'Reading Quiz', score: '9/10', date: 'May 4' },
        { name: 'Book Report', score: '35/40', date: 'Apr 27' },
      ],
      icon: '📚',
    },
    { 
      id: 5, 
      name: 'Computer Science', 
      grade: 'A', 
      percentage: 95,
      teacher: 'Ms. Johnson',
      recentAssignments: [
        { name: 'Coding Project', score: '48/50', date: 'May 9' },
        { name: 'Quiz 2', score: '19/20', date: 'May 2' },
        { name: 'Homework 4', score: '29/30', date: 'Apr 24' },
      ],
      icon: '💻',
    },
  ];
  
  // Calculate GPA
  const calculateGPA = () => {
    const gradePoints = {
      'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0,
    };
    
    const totalPoints = subjects.reduce((sum, subject) => sum + gradePoints[subject.grade], 0);
    return (totalPoints / subjects.length).toFixed(2);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🎓</Text>
        </View>
        <ThemedText style={styles.title}>Grades</ThemedText>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>S</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* GPA Summary */}
        <View style={styles.gpaSummary}>
          <View style={styles.gpaCard}>
            <ThemedText style={styles.gpaLabel}>Current GPA</ThemedText>
            <Text style={styles.gpaValue}>{calculateGPA()}</Text>
            <Text style={styles.gpaTerm}>Spring Semester 2023</Text>
          </View>
        </View>
        
        {/* Subjects List */}
        <View style={styles.subjectsContainer}>
          <ThemedText style={styles.sectionTitle}>Subjects</ThemedText>
          
          {subjects.map(subject => (
            <TouchableOpacity key={subject.id} style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <View style={styles.subjectIconContainer}>
                  <Text style={styles.subjectIcon}>{subject.icon}</Text>
                </View>
                
                <View style={styles.subjectInfo}>
                  <ThemedText style={styles.subjectName}>{subject.name}</ThemedText>
                  <Text style={styles.teacherName}>{subject.teacher}</Text>
                </View>
                
                <View style={styles.gradeContainer}>
                  <Text style={[styles.gradeText, { color: getGradeColor(subject.grade) }]}>
                    {subject.grade}
                  </Text>
                  <Text style={styles.percentageText}>{subject.percentage}%</Text>
                </View>
              </View>
              
              <View style={styles.assignmentsContainer}>
                <ThemedText style={styles.assignmentsTitle}>Recent Assignments</ThemedText>
                
                {subject.recentAssignments.map((assignment, index) => (
                  <View key={index} style={styles.assignmentItem}>
                    <ThemedText style={styles.assignmentName}>{assignment.name}</ThemedText>
                    <Text style={styles.assignmentDate}>{assignment.date}</Text>
                    <Text style={styles.assignmentScore}>{assignment.score}</Text>
                  </View>
                ))}
                
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>View All</Text>
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
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>📚</Text>
          </View>
          <ThemedText style={styles.navText}>Homework</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.navIcon, styles.activeNavIcon]}>
            <Text style={styles.navIconText}>📊</Text>
          </View>
          <ThemedText style={[styles.navText, styles.activeNavText]}>Grades</ThemedText>
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

// Helper function to get color based on grade
function getGradeColor(grade) {
  if (grade.startsWith('A')) return '#4CAF50';
  if (grade.startsWith('B')) return '#2196F3';
  if (grade.startsWith('C')) return '#FFA000';
  if (grade.startsWith('D')) return '#FF5722';
  return '#F44336'; // F
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
  gpaSummary: {
    padding: 16,
  },
  gpaCard: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gpaLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  gpaValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  gpaTerm: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  subjectsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectCard: {
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
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  subjectIcon: {
    fontSize: 24,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 14,
    color: '#666',
  },
  gradeContainer: {
    alignItems: 'center',
  },
  gradeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  percentageText: {
    fontSize: 14,
    color: '#666',
  },
  assignmentsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  assignmentsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  assignmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  assignmentName: {
    flex: 2,
    fontSize: 14,
  },
  assignmentDate: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  assignmentScore: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  viewAllButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '500',
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