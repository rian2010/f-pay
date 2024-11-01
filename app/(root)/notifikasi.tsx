import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Example notifications with icons defined directly
    const allNotifications = [
      { id: 1, icon: 'swap-horizontal', message: 'Transfer Uang ke William', time: new Date() }, // Today
      { id: 2, icon: 'wallet', message: 'Top-up ewallet dari ', time: new Date() }, // Today
      { id: 3, icon: 'cash', message: 'Penarikan Saldo', time: new Date(Date.now() - 86400000) }, // Yesterday
      { id: 5, icon: 'cart-outline', message: 'Grocery shopping', time: new Date(Date.now() - 30 * 86400000) }, // 30 days ago
    ];

    // Set notifications state
    setNotifications(allNotifications);
  }, []);

  // Function to format the date into a user-friendly string
  const formatRelativeDate = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInDays = Math.floor(diffInSeconds / 86400);

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 60) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month ago`;
    return 'A long time ago';
  };

  // Group notifications by relative date
  const groupByRelativeDate = (notifications) => {
    const groupedNotifications = [];

    notifications.forEach((notification) => {
      const relativeDate = formatRelativeDate(notification.time);
      const existingGroup = groupedNotifications.find(group => group.date === relativeDate);

      if (existingGroup) {
        existingGroup.notifications.push(notification);
      } else {
        groupedNotifications.push({ date: relativeDate, notifications: [notification] });
      }
    });

    return groupedNotifications;
  };

  const groupedNotifications = groupByRelativeDate(notifications);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {groupedNotifications.map((group, index) => (
          <View key={index} style={styles.menuContainer}>
            {/* Date Header Outside of Notification Container */}
            <Text style={styles.dayHeader}>{group.date}</Text>
            <View style={styles.notificationList}>
              {group.notifications.map((notification, notificationIndex) => (
                <View key={notification.id}>
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name={notification.icon}
                        color="#fff"
                        size={21}
                      />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationMessage}>{notification.message}</Text>
                      <Text style={styles.notificationTime}>{formatRelativeDate(notification.time)}</Text>
                    </View>
                  </TouchableOpacity>
                  {notificationIndex < group.notifications.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 21,
    backgroundColor: '#F7F7FB',
  },
  container: {
    flex: 1,
  },
  dayHeader: {
    fontSize: 16,
    paddingLeft: 15,
    fontFamily: 'PoppinsMedium',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    paddingVertical: 11,
    marginBottom: 20,
  },
  notificationList: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: '#4A90E2', // Changed to a visible background color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    fontWeight: '500',
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
});

export default NotificationScreen;

