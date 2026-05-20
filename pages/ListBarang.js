import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  TextInput,
  ScrollView,
  Alert 
} from "react-native";
import axios from "axios";
import Config from "../Config";

const BASE_URL = Config.BASE_URL;
const API_KEY = Config.API_KEY;

export default function ListBarang({ navigation }) {
  const [laporan, setLaporan] = useState([]);
  const [filteredLaporan, setFilteredLaporan] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  
  const categories = ['Semua', 'Elektronik', 'Aksesoris', 'Dokumen', 'Lainnya'];

  const fetchLaporan = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setLaporan(response.data);
      setFilteredLaporan(response.data);
    } catch (error) {
      Alert.alert(
        "Gagal Memuat Data",
        "Data barang tidak dapat diambil. Periksa koneksi internet atau server.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  useEffect(() => {
    let filtered = [...laporan];
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(item =>
        item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedKategori !== "Semua") {
      filtered = filtered.filter(item => item.kategori === selectedKategori);
    }
    
    setFilteredLaporan(filtered);
  }, [searchQuery, laporan, selectedKategori]);

  const getStatusColor = (status) => {
    return status === 'Hilang' ? styles.statusHilang : styles.statusDitemukan;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('DetailBarang', { item })}
    >
      <Text style={[styles.status, getStatusColor(item.status)]}>
        {item.status === 'Hilang' ? 'HILANG' : 'Ditemukan'}
      </Text>
      <Text style={styles.namaBarang}>{item.nama_barang}</Text>
      <Text>Pelapor: {item.nama_pelapor}</Text>
      <Text>Lokasi: {item.lokasi}</Text>
      <Text style={styles.kategoriText}>Kategori: {item.kategori}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari berdasarkan nama barang..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
            <Text style={styles.clearText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter Kategori:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kategoriScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterButton,
                selectedKategori === cat && styles.filterButtonActive
              ]}
              onPress={() => setSelectedKategori(cat)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedKategori === cat && styles.filterButtonTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {(searchQuery !== "" || selectedKategori !== "Semua") && (
        <View style={styles.searchResult}>
          <Text style={styles.searchResultText}>
            Menampilkan {filteredLaporan.length} dari {laporan.length} laporan
          </Text>
          {selectedKategori !== "Semua" && (
            <TouchableOpacity onPress={() => setSelectedKategori("Semua")}>
              <Text style={styles.clearFilterText}>Clear Filter ✖️</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {filteredLaporan.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery || selectedKategori !== "Semua" ? "Tidak ada barang yang cocok" : "Belum ada laporan"}
          </Text>
          <Text style={styles.emptySubText}>
            {searchQuery || selectedKategori !== "Semua" ? "Coba kata kunci atau kategori lain" : "Buat laporan baru melalui tab Tambah"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredLaporan}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 10,
    paddingBottom: 20,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    marginBottom: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
  },
  clearButton: {
    padding: 5,
  },
  clearText: {
    fontSize: 16,
    color: "#999",
  },
  filterContainer: {
    backgroundColor: "white",
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  kategoriScroll: {
    flexDirection: "row",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#0037dd",
  },
  filterButtonText: {
    fontSize: 13,
    color: "#666",
  },
  filterButtonTextActive: {
    color: "white",
  },
  searchResult: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  searchResultText: {
    fontSize: 12,
    color: "#666",
  },
  clearFilterText: {
    fontSize: 12,
    color: "#D32F2F",
  },
  // Card Styles
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  status: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 12,
  },
  statusHilang: {
    color: "#D32F2F", 
  },
  statusDitemukan: {
    color: "#388E3C", 
  },
  namaBarang: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  kategoriText: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
});