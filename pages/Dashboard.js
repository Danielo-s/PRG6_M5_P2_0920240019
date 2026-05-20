import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Findit</Text>
        <Text style={styles.subtitle}>Lost & Found Kampus</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('TambahLaporan')}
        >
          <Text style={styles.buttonText}>Buat Laporan Baru</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate('ListBarang')}
        >
          <Text style={styles.buttonText}>Lihat Daftar Laporan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Politeknik Astra</Text>
        <Text style={styles.footerText}>Lost & Found Kampus</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#004cb6',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#0053b9',
  },
  menuContainer: {
    gap: 15,
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#FF8F00',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default Dashboard;