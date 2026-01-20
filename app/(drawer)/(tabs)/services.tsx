import React, { FC, useState } from "react";
import {
    Dimensions,
    FlatList,
    ListRenderItem,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import AddServiceModal from "../../../components/models/AddServiceModal";

// 1. Define the Interface for the Service object
interface Service {
  id: string;
  name: string;
  type: string;
  description: string;
  price: string;
  duration: string;
  emergency: "Yes" | "No";
  active: "Active" | "In active";
}

const { width } = Dimensions.get("window");

const dummyServices: Service[] = [
  { id: "1", name: "Executive Cleaning", type: "Premium", description: "Deep sterilization for corporate offices.", price: "$100", duration: "2h", emergency: "Yes", active: "Active" },
  { id: "2", name: "System Maintenance", type: "Technical", description: "Routine server and hardware checkup.", price: "$150", duration: "3h", emergency: "No", active: "In active" },
  { id: "3", name: "Rapid Response", type: "Emergency", description: "On-site support within 30 minutes.", price: "$200", duration: "1.5h", emergency: "Yes", active: "Active" },
];

type TabType = "all" | "active" | "inactive";

const ServicesScreen: FC = () => {
  // 2. Add types to State Hooks
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // 3. Logic to filter data based on search and tabs
  const filteredData = dummyServices.filter((s) => {
    const matchesTab = activeTab === "all" || s.active.toLowerCase() === activeTab;
    const matchesSearch = s.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // 4. Properly type the FlatList renderItem
  const renderServiceCard: ListRenderItem<Service> = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.active === "Active" ? "#E8F5E9" : "#FFEBEE" }]}>
          <Text style={[styles.statusText, { color: item.active === "Active" ? "#4CAF50" : "#F44336" }]}>
            {item.active.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={styles.cardDesc}>{item.description}</Text>
      <View style={styles.divider} />
      <View style={styles.cardFooter}>
        <View><Text style={styles.footerLabel}>PRICE</Text><Text style={styles.footerValue}>{item.price}</Text></View>
        <View><Text style={styles.footerLabel}>DURATION</Text><Text style={styles.footerValue}>{item.duration}</Text></View>
        <View><Text style={styles.footerLabel}>EMERGENCY</Text><Text style={styles.footerValue}>{item.emergency}</Text></View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.contentWrapper}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Services</Text>

        <View style={styles.searchBox}>
          <TextInput 
            placeholder="Search services..." 
            placeholderTextColor="#999"
            style={styles.inputStyle} 
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.tabRow}>
          {(["all", "active", "inactive"] as TabType[]).map((t) => (
            <TouchableOpacity 
              key={t} 
              onPress={() => setActiveTab(t)}
              style={[styles.tabButton, activeTab === t && styles.tabActive]}
            >
              <Text style={[styles.tabLabel, activeTab === t && styles.tabLabelActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.9}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <AddServiceModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      // Optional: pass more props if your modal needs to add/edit items
      // onSave={(newService) => {
      //   // later: add to state or send to backend
      //   setModalVisible(false);
      // }}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F9FAFC" },
  headerSpacer: { height: 70 },
  contentWrapper: { paddingHorizontal: 20, flex: 1 },
  headerTitle: { fontSize: 34, fontWeight: "900", color: "#111", marginBottom: 15 },
  
  searchBox: { backgroundColor: "#FFF", borderRadius: 15, padding: 12, elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, marginBottom: 20 },
  inputStyle: { fontSize: 16, color: "#333" },

  tabRow: { flexDirection: "row", marginBottom: 20 },
  tabButton: { paddingVertical: 10, paddingHorizontal: 22, borderRadius: 25, backgroundColor: "#F0F0F0", marginRight: 10 },
  tabActive: { backgroundColor: "#5D5FEF" },
  tabLabel: { color: "#888", fontWeight: "600" },
  tabLabelActive: { color: "#FFF" },

  listContainer: { paddingBottom: 150 },

  card: { backgroundColor: "#FFF", borderRadius: 20, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: "#EEE" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: "800", color: "#222" },
  cardSubtitle: { fontSize: 13, color: "#5D5FEF", fontWeight: "600" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, height: 28, justifyContent: "center", alignItems: "center" },
  statusText: { fontSize: 10, fontWeight: "900" },
  cardDesc: { color: "#777", fontSize: 14, marginBottom: 15 },
  divider: { height: 1, backgroundColor: "#F0F0F0", marginBottom: 15 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  footerLabel: { fontSize: 10, color: "#AAA", fontWeight: "700" },
  footerValue: { fontSize: 15, color: "#333", fontWeight: "600", marginTop: 2 },

  fab: {
    position: "absolute",
    bottom: 110,
    right: 25,
    backgroundColor: "#5D5FEF",
    width: 65,
    height: 65,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    zIndex: 999999,
    shadowColor: "#5D5FEF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  fabIcon: { color: "#FFF", fontSize: 35, fontWeight: "300", textAlign: "center", marginBottom: 6 },
});

export default ServicesScreen;