import { usePathname, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function CustomDrawerContent() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => pathname.startsWith(route);

  return (
    <View style={styles.container}>
      {/* Home */}
      <Pressable
        style={[
          styles.item,
          isActive('/(drawer)/(tabs)') && styles.activeItem,
        ]}
        onPress={() => router.push('/(drawer)/(tabs)/home')}
      >
        <Text style={styles.text}>Home</Text>
      </Pressable>

      {/* Services */}
      <Pressable
        style={[
          styles.item,
          isActive('/(drawer)/(tabs)/services') && styles.activeItem,
        ]}
        onPress={() => router.push('/(drawer)/(tabs)/services')}
      >
        <Text style={styles.text}>Services</Text>
      </Pressable>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#0B0B0B',
        },
      }}
      drawerContent={() => <CustomDrawerContent />}
    >
      <Drawer.Screen name="(tabs)" />
      <Drawer.Screen name="services" />
    </Drawer>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 12,
    backgroundColor: '#111',
  },
  activeItem: {
    backgroundColor: '#102A43',
  },
  text: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
});
