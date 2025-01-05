import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const services = [
  { title: 'Patta Maarudhal', icon: 'file-outline' },
  { title: 'Patta Sitta', icon: 'home-outline' },
  { title: 'A-Pathavidu', icon: 'home-file-outline' },
  { title: 'Patta Sitta Vivaramgal', icon: 'check-outline' },
  { title: 'Arasu Puramboku', icon: 'file-alert-outline' },
  { title: 'Pulapada Vivaramgal', icon: 'file-check-outline' },
  { title: 'Patta Nagalai', icon: 'ruler-square-plus-outline' },
  { title: 'Nagara Nila', icon: 'summit' },
  { title: 'Nagara Nila Alavai', icon: 'checkbox-outline' },
  { title: 'Vinnapa Nilai', icon: 'heart-pulse' },
];

const App: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (dropdownVisible) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setDropdownVisible(false));
    } else {
      setDropdownVisible(true);
      Animated.timing(dropdownHeight, {
        toValue: 150,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.burgerButton}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>E-sevai</Text>
      </View>

      {/* Dropdown Menu */}
      <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
        <TouchableOpacity style={styles.dropdownItem} onPress={() => console.log('E-services clicked')}>
          <Text style={styles.dropdownText}>E-services</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Description Section */}
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Since all the information provided through this online service is instantly updated and published, there is no need to visit any Revenue Department office in person to get this information. Patta change applications can be submitted through any Common Service Center in the state. The fee for this is Rs. 60/- at the Common Service Center.
          </Text>
        </View>

        {/* Services Section */}
        <View style={styles.cardsContainer}>
          {services.map((service, index) => (
            <AnimatedCard key={index} service={service} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AnimatedCard = ({ service }: { service: { title: string; icon: string } }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
    >
      <Icon name={service.icon} size={60} color="#1D3D47" style={styles.cardIcon} />
      <Text style={styles.cardTitle}>{service.title}</Text>
      <TouchableOpacity
        style={styles.cardLinkContainer}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => console.log(`${service.title} link clicked`)}
      >
        <Text style={styles.cardLink}>Learn More</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D3D47',
    paddingVertical: 15,
    position: 'relative',
    zIndex: 10,
  },
  burgerButton: {
    position: 'absolute',
    left: 15,
    zIndex: 20,
  },
  navbarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
    zIndex: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  description: {
    padding: 15,
    backgroundColor: '#A1CEDC',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  cardsContainer: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: 220,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardLinkContainer: {
    marginTop: 10,
  },
  cardLink: {
    fontSize: 16,
    color: '#1D3D47',
    textDecorationLine: 'underline',
  },
});

export default App;
