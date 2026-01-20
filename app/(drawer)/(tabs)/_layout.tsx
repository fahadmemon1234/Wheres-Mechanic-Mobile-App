import { Feather } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';




const { width } = Dimensions.get('window');

export default function TabLayout() {

const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: "",
        headerLeft: () => (
         <TouchableOpacity
           onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={styles.menuButton}
            activeOpacity={0.7}
          >
            <View style={styles.burgerIcon}>
              <View style={styles.line} />
              <View style={[styles.line, { width: 15 }]} />
              <View style={styles.line} />
            </View>
          </TouchableOpacity>
        ),
        tabBarShowLabel: false,
        tabBarStyle: styles.premiumBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Feather name="grid" size={20} color={focused ? '#1B4332' : '#94A3B8'} />
              <Text style={[styles.navLabel, { color: focused ? '#1B4332' : '#94A3B8' }]}>Dashboard</Text>
            </View>
          ),
        }}
      />

    
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Feather name="map-pin" size={20} color={focused ? '#1B4332' : '#94A3B8'} />
              <Text style={[styles.navLabel, { color: focused ? '#1B4332' : '#94A3B8' }]}>Explore</Text>
            </View>
          ),
        }}
      />

      
  <Tabs.Screen
        name="services"
        options={{ title: 'Services' }}
      />
    
     </Tabs>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  burgerIcon: { gap: 4 },
  line: { width: 22, height: 2.5, backgroundColor: '#1B4332', borderRadius: 2 },
  premiumBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 15,
    right: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    height: 80,
    elevation: 15,
    borderTopWidth: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    minWidth: width / 5.8,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
  },
  centerTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 12,
  },
  centerIconBg: {
    width: 50,
    height: 50,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  }
});