import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Home() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.mainScroll}
      >
        {/* --- Top Header with Right Switch --- */}
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <View style={styles.avatarWrapper}>
              <LinearGradient colors={['#1B4332', '#40916C']} style={styles.avatarCircle}>
                <Text style={styles.avatarText}>R</Text>
              </LinearGradient>
              <View style={[styles.activeIndicator, { backgroundColor: isOnline ? '#4CAF50' : '#FF5252' }]} />
            </View>
            <View style={styles.welcomeTextGroup}>
              <Text style={styles.greeting}>Good Evening,</Text>
              <Text style={styles.userName}>Rohan Sharma</Text>
            </View>
          </View>
          
          <View style={styles.topRightControls}>
             <TouchableOpacity style={styles.walletPill}>
                <Octicons name="stack" size={14} color="#1B4332" />
                <Text style={styles.walletAmount}>₹4,250</Text>
             </TouchableOpacity>

             <View style={styles.statusToggleGroup}>
                <Text style={[styles.statusLabel, { color: isOnline ? '#2D6A4F' : '#FF5252' }]}>
                    {isOnline ? 'ON' : 'OFF'}
                </Text>
                <Switch
                    value={isOnline}
                    onValueChange={setIsOnline}
                    trackColor={{ false: '#D1D1D1', true: '#B7E4C7' }}
                    thumbColor={isOnline ? '#1B4332' : '#F4F4F4'}
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
             </View>
          </View>
        </View>

        {/* --- Stats Grid --- */}
        <View style={styles.statsGrid}>
          <View style={styles.statCardGlass}>
            <View style={styles.statHeader}>
              <View style={styles.iconBox}><Feather name="check-circle" size={18} color="#1B4332" /></View>
              <Text style={styles.statTrend}>+2 today</Text>
            </View>
            <Text style={styles.statBigNum}>08</Text>
            <Text style={styles.statSubText}>Jobs Done</Text>
          </View>

          <View style={[styles.statCardGlass, { backgroundColor: '#1B4332' }]}>
            <View style={styles.statHeader}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <Feather name="clock" size={18} color="#B7E4C7" />
              </View>
              <Text style={[styles.statTrend, { color: '#B7E4C7' }]}>On Track</Text>
            </View>
            <Text style={[styles.statBigNum, { color: '#FFF' }]}>5.2<Text style={{ fontSize: 16 }}>h</Text></Text>
            <Text style={[styles.statSubText, { color: '#B7E4C7' }]}>Time Active</Text>
          </View>
        </View>

        {/* --- Active Assignment --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Assignment</Text>
          <TouchableOpacity><Text style={styles.viewMapText}>View Map</Text></TouchableOpacity>
        </View>

        <View style={styles.assignmentCard}>
          <LinearGradient colors={['#081C15', '#1B4332']} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.cardGrad}>
            <MaterialCommunityIcons name="car-wash" size={140} color="rgba(255,255,255,0.03)" style={styles.watermark} />
            
            <View style={styles.cardTop}>
              <View style={styles.typeBadge}><Text style={styles.typeText}>EMERGENCY REPAIR</Text></View>
              <View style={styles.timerBadge}>
                <Feather name="clock" size={12} color="#FFF" /><Text style={styles.timerText}>10m left</Text>
              </View>
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.carMainTitle}>Toyota Fortuner</Text>
              <Text style={styles.carSubTitle}>Engine Overheating • <Text style={{color:'#4CAF50'}}>Verified Job</Text></Text>
            </View>

            <View style={styles.customerBox}>
              <View style={styles.custDetails}>
                <Text style={styles.custName}>Vikram Singh</Text>
                <Text style={styles.custLoc}>Sector 44, Gurgaon (2.4km)</Text>
              </View>
              <View style={styles.actionCircles}>
                <TouchableOpacity style={styles.circleBtn}><Ionicons name="chatbubble-outline" size={18} color="#FFF" /></TouchableOpacity>
                <TouchableOpacity style={[styles.circleBtn, {backgroundColor:'#4CAF50'}]}><Ionicons name="call" size={18} color="#FFF" /></TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.masterButton}>
              <Text style={styles.masterBtnText}>ARRIVED AT LOCATION</Text>
              <MaterialCommunityIcons name="gesture-double-tap" size={20} color="#1B4332" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* --- Performance Section (Longer Content) --- */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Service Performance</Text>
        <View style={styles.performanceCard}>
            <View style={styles.perfItem}>
                <Text style={styles.perfLabel}>Rating</Text>
                <View style={styles.perfBarBg}><View style={[styles.perfBarFill, {width: '95%', backgroundColor: '#FFD700'}]} /></View>
                <Text style={styles.perfValue}>4.9/5</Text>
            </View>
            <View style={styles.perfItem}>
                <Text style={styles.perfLabel}>Success Rate</Text>
                <View style={styles.perfBarBg}><View style={[styles.perfBarFill, {width: '98%', backgroundColor: '#4CAF50'}]} /></View>
                <Text style={styles.perfValue}>98%</Text>
            </View>
        </View>

        {/* --- Recent Activity List --- */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Recent Jobs</Text>
            <TouchableOpacity><Text style={styles.viewMapText}>View All</Text></TouchableOpacity>
        </View>

        {[
            { id: 1, car: 'Honda City', type: 'Oil Change', price: '₹850', time: '2h ago' },
            { id: 2, car: 'Maruti Swift', type: 'Brake Fix', price: '₹1,200', time: '5h ago' }
        ].map((item) => (
            <View key={item.id} style={styles.recentJobCard}>
                <View style={styles.jobIcon}><FontAwesome5 name="car" size={16} color="#1B4332" /></View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.jobTitle}>{item.car}</Text>
                    <Text style={styles.jobType}>{item.type} • {item.time}</Text>
                </View>
                <Text style={styles.jobPrice}>{item.price}</Text>
            </View>
        ))}

        {/* --- Preparation Checklist --- */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Essential Tools</Text>
        <View style={styles.checklistContainer}>
            <View style={styles.checkItem}>
                <View style={styles.checkIconWrap}><FontAwesome5 name="toolbox" size={16} color="#1B4332" /></View>
                <View style={{flex: 1, marginLeft: 12}}>
                    <Text style={styles.checkTitle}>Advanced Scanner</Text>
                    <Text style={styles.checkStatus}>Calibrated</Text>
                </View>
                <Feather name="check-circle" size={18} color="#4CAF50" />
            </View>
        </View>

        <View style={{ height: 150 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAF9' },
  mainScroll: { paddingHorizontal: 20, paddingTop: 85 },
  
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  userInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarWrapper: { position: 'relative' },
  avatarCircle: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  activeIndicator: { position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderRadius: 7, borderWidth: 3, borderColor: '#FFF' },
  welcomeTextGroup: { marginLeft: 12 },
  greeting: { fontSize: 12, color: '#888', fontWeight: '600' },
  userName: { fontSize: 18, fontWeight: '900', color: '#1B4332' },

  topRightControls: { alignItems: 'flex-end', gap: 8 },
  walletPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E9F5EF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  walletAmount: { marginLeft: 5, fontWeight: '900', color: '#1B4332', fontSize: 13 },
  statusToggleGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 8, borderRadius: 20, elevation: 2 },
  statusLabel: { fontSize: 10, fontWeight: '900', marginRight: 4 },

  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  statCardGlass: { width: (width - 55) / 2, backgroundColor: '#FFF', padding: 16, borderRadius: 24, elevation: 4 },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconBox: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#F0F7F4', justifyContent: 'center', alignItems: 'center' },
  statTrend: { fontSize: 10, fontWeight: '800', color: '#4CAF50' },
  statBigNum: { fontSize: 32, fontWeight: '900', color: '#1B4332', marginTop: 12 },
  statSubText: { fontSize: 12, color: '#888', fontWeight: '600' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1B4332' },
  viewMapText: { fontSize: 13, color: '#4CAF50', fontWeight: '700' },

  assignmentCard: { borderRadius: 32, overflow: 'hidden', elevation: 8 },
  cardGrad: { padding: 24, position: 'relative' },
  watermark: { position: 'absolute', bottom: -20, right: -20 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  typeBadge: { backgroundColor: '#FF5252', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  timerBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, borderRadius: 8 },
  timerText: { color: '#FFF', fontSize: 11, fontWeight: '700', marginLeft: 5 },
  vehicleInfo: { marginTop: 25 },
  carMainTitle: { color: '#FFF', fontSize: 28, fontWeight: '900' },
  carSubTitle: { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '600' },
  customerBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 25 },
  custDetails: { flex: 1, marginRight: 10 },
  custName: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  custLoc: { color: '#B7E4C7', fontSize: 13, marginTop: 4 },
  actionCircles: { flexDirection: 'row', alignItems: 'center' },
  circleBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  masterButton: { backgroundColor: '#B7E4C7', height: 58, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  masterBtnText: { color: '#1B4332', fontWeight: '900', fontSize: 15, marginRight: 12 },

  // New Performance Styles
  performanceCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 24, elevation: 2 },
  perfItem: { marginBottom: 15 },
  perfLabel: { fontSize: 12, fontWeight: '700', color: '#888', marginBottom: 6 },
  perfBarBg: { height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, flex: 1 },
  perfBarFill: { height: 6, borderRadius: 3 },
  perfValue: { fontSize: 12, fontWeight: '800', color: '#1B4332', marginTop: 4 },

  // Recent Jobs List
  recentJobCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 20, marginBottom: 10, borderWidth: 1, borderColor: '#F0F0F0' },
  jobIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F0F7F4', justifyContent: 'center', alignItems: 'center' },
  jobTitle: { fontSize: 15, fontWeight: '800', color: '#1B4332' },
  jobType: { fontSize: 12, color: '#888', fontWeight: '500' },
  jobPrice: { fontSize: 14, fontWeight: '900', color: '#2D6A4F' },

  checklistContainer: { gap: 12 },
  checkItem: { backgroundColor: '#FFF', padding: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  checkIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F0F7F4', justifyContent: 'center', alignItems: 'center' },
  checkTitle: { fontSize: 15, fontWeight: '800', color: '#1B4332' },
  checkStatus: { fontSize: 12, color: '#888', fontWeight: '600' }
});