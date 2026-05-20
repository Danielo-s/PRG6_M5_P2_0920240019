import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "../components/Card";
import Button from "../components/Button";

export default function DetailBarang({ navigation, route }) {
  const { item } = route.params;

  const handleImageError = () => {
    console.log("Gambar tidak dapat dimuat");
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <View style={[
          styles.statusHeader,
          item.status === 'Hilang' ? styles.statusHilangBg : styles.statusDitemukanBg
        ]}>
          <Text style={styles.statusHeaderText}>
            {item.status === 'Hilang' ? 'LAPORAN HILANG' : 'LAPORAN DITEMUKAN'}
          </Text>
        </View>

        <View style={styles.fotoSection}>
          <Text style={styles.sectionLabel}>Foto Barang</Text>
          {item.foto ? (
            <Image 
              source={{ uri: item.foto }} 
              style={styles.foto}
              onError={handleImageError}
            />
          ) : (
            <View style={styles.noFotoContainer}>
              <MaterialIcons name="photo-camera" size={50} color="#CCC" />
              <Text style={styles.noFotoText}>Tidak ada foto</Text>
            </View>
          )}
        </View>

        {/* Detail Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Nama Barang</Text>
          <Text style={styles.value}>{item.nama_barang}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Nama Pelapor</Text>
          <Text style={styles.value}>{item.nama_pelapor}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Kategori</Text>
          <Text style={styles.value}>{item.kategori}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Lokasi</Text>
          <Text style={styles.value}>{item.lokasi}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Deskripsi</Text>
          <Text style={styles.value}>{item.deskripsi}</Text>
        </View>
        <Button
          title="← Kembali"
          onPress={() => navigation.goBack()}
          type="primary"
          style={styles.backButton}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  card: {
    margin: 15,
    padding: 0,
    overflow: "hidden",
  },
  statusHeader: {
    padding: 16,
    alignItems: "center",
  },
  statusHilangBg: {
    backgroundColor: "#D32F2F",
  },
  statusDitemukanBg: {
    backgroundColor: "#388E3C",
  },
  statusHeaderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  fotoSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginBottom: 10,
  },
  foto: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    resizeMode: "cover",
  },
  noFotoContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  noFotoText: {
    marginTop: 10,
    fontSize: 14,
    color: "#999",
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  backButton: {
    margin: 16,
    marginTop: 8,
  },
});