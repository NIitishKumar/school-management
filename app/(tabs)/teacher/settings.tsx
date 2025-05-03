import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Switch } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TeacherSettings() {
  const colorScheme = useColorScheme();
  
  // Sample settings state
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(colorScheme === 'dark');
  const [autoSaveEnabled, setAutoSaveEnabled] = React.useState(true);

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SMS</Text>
        </View>
        <ThemedText style={styles.title}>Settings</ThemedText>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>T</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageLarge}>
            <Text style={styles.profileInitialLarge}>T</Text>
          </View>
          <ThemedText style={styles.profileName}>Thomas Anderson</ThemedText>
          <ThemedText style={styles.profileRole}>Mathematics Teacher</ThemedText>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        {/* Settings Sections */}
        <View style={styles.settingsSection}>
          <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingLabel}>Push Notifications</ThemedText>
              <Text style={styles.settingDescription}>Receive notifications on your device</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#f4f3f4', true: '#0a7ea4' }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingLabel}>Email Alerts</ThemedText>
              <Text style={styles.settingDescription}>Receive important updates via email</Text>
            </View>
            <Switch
              value={emailAlertsEnabled}
              onValueChange={setEmailAlertsEnabled}
              trackColor={{ false: '#f4f3f4', true: '#0a7ea4' }}
              thumbColor={'#fff'}
            />
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingLabel}>Dark Mode</ThemedText>
              <Text style={styles.settingDescription}>Use dark theme throughout the app</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#f4f3f4', true: '#0a7ea4' }}
              thumbColor={'#fff'}
            />
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <ThemedText style={styles.sectionTitle}>Data & Storage</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <ThemedText style={styles.settingLabel}>Auto-Save</ThemedText>
              <Text style={styles.settingDescription}>Automatically save attendance and grades</Text>
            </View>
            <Switch
              value={autoSaveEnabled}
              onValueChange={setAutoSaveEnabled}
              trackColor={{ false: '#f4f3f4', true: '#0a7ea4' }}
              thumbColor={'#fff'}
            />
          </View>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Clear Cache</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsSection}>
          <ThemedText style={styles.sectionTitle}>Support</ThemedText>
          
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportItemContent}>
              <Text style={styles.supportItemIcon}>📋</Text>
              <ThemedText style={styles.supportItemText}>Help Center</ThemedText>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportItemContent}>
              <Text style={styles.supportItemIcon}>📱</Text>
              <ThemedText style={styles.supportItemText}>Contact Support</ThemedText>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportItemContent}>
              <Text style={styles.supportItemIcon}>📝</Text>
              <ThemedText style={styles.supportItemText}>Terms of Service</ThemedText>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportItemContent}>
              <Text style={styles.supportItemIcon}>🔒</Text>
              <ThemedText style={styles.supportItemText}>Privacy Policy</ThemedText>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        
        <ThemedText style={styles.versionText}>Version 1.0.0</ThemedText>
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
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>✉️</Text>
          </View>
          <ThemedText style={styles.navText}>Messages</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.navIcon, styles.activeNavIcon]}>
            <Text style={styles.navIconText}>⚙️</Text>
          </View>
          <ThemedText style={[styles.navText, styles.activeNavText]}>Settings</ThemedText>
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
  profileSection: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitialLarge: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  editProfileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
  },
  editProfileText: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '500',
  },
  settingsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#0a7ea4',
    fontWeight: '500',
  },
  supportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  supportItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  supportItemText: {
    fontSize: 16,
  },
  chevron: {
    fontSize: 20,
    color: '#ccc',
  },
  logoutButton: {
    margin: 16,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#ffebee',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
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