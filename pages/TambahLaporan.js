import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Config from '../Config';

const BASE_URL = Config.BASE_URL;
const API_KEY = Config.API_KEY;

export default function TambahLaporan({ navigation }) {
  const [nama_pelapor, setNamaPelapor] = useState('');
  const [nama_barang, setNamaBarang] = useState('');
  const [kategori, setKategori] = useState('Elektronik');
  const [lokasi, setLokasi] = useState('');
  const [status, setStatus] = useState('Hilang');
  const [deskripsi, setDeskripsi] = useState('');
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [descCharCount, setDescCharCount] = useState(0);

  const categories = ['Elektronik', 'Aksesoris', 'Dokumen', 'Lainnya'];
  const statuses = ['Hilang', 'Ditemukan'];

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Izin diperlukan', 'Aplikasi memerlukan izin kamera untuk mengambil foto');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleKirim = async () => {
    if (nama_pelapor.trim() === '') {
      Alert.alert("Peringatan", "Nama pelapor harus diisi!");
      return;
    }

    if (nama_barang.trim() === '') {
      Alert.alert("Peringatan", "Nama barang harus diisi!");
      return;
    }

    if (nama_barang.length < 3) {
      Alert.alert("Peringatan", "Nama barang minimal 3 karakter!");
      return;
    }

    if (lokasi.trim() === '') {
      Alert.alert("Peringatan", "Lokasi harus diisi!");
      return;
    }

    if (deskripsi.trim() === '') {
      Alert.alert("Peringatan", "Deskripsi harus diisi!");
      return;
    }

    if (deskripsi.length < 20) {
      Alert.alert("Peringatan", "Deskripsi harus diisi minimal 20 karakter!");
      return;
    }

    setLoading(true);
    
    try {
      let fotoUrl = null;
      if (foto) {
        fotoUrl = foto;
      }

      await axios.post(BASE_URL, {
        nama_pelapor: nama_pelapor,
        nama_barang: nama_barang,
        kategori: kategori,
        lokasi: lokasi,
        status: status,
        deskripsi: deskripsi,
        foto: fotoUrl,
        created_at: new Date().toISOString()
      }, {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
      });
      
      Alert.alert("Sukses", "Laporan berhasil dikirim");
      
      setNamaPelapor('');
      setNamaBarang('');
      setKategori('Elektronik');
      setLokasi('');
      setStatus('Hilang');
      setDeskripsi('');
      setFoto(null);
      setDescCharCount(0);
      
      navigation.navigate('ListBarang');
      
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Gagal mengirim data: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDescChange = (text) => {
    setDeskripsi(text);
    setDescCharCount(text.length);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nama Pelapor *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Masukkan nama lengkap" 
          value={nama_pelapor}
          onChangeText={setNamaPelapor} 
        />

        <Text style={styles.label}>Nama Barang *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Minimal 3 karakter" 
          value={nama_barang}
          onChangeText={setNamaBarang} 
        />

        <Text style={styles.label}>Kategori Barang</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat}
              style={[styles.btnKategori, kategori === cat && styles.btnKategoriActive]}
              onPress={() => setKategori(cat)}
            >
              <Text style={[styles.btnKategoriText, kategori === cat && styles.btnKategoriTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Lokasi Ditemukan/Hilang *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Contoh: Perpustakaan, Kantin, Lab Komputer" 
          value={lokasi}
          onChangeText={setLokasi} 
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          {statuses.map((stat) => (
            <TouchableOpacity 
              key={stat}
              style={[
                styles.btnStatus, 
                status === stat && (stat === 'Hilang' ? styles.btnStatusHilang : styles.btnStatusDitemukan)
              ]}
              onPress={() => setStatus(stat)}
            >
              <Text style={[styles.btnStatusText, status === stat && styles.btnStatusTextActive]}>
                {stat === 'Hilang' ? 'Hilang' : 'Ditemukan'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Deskripsi * (Minimal 20 Karakter)</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Jelaskan detail barang..." 
          multiline={true} 
          numberOfLines={4}
          value={deskripsi}
          onChangeText={handleDescChange}
        />
        <Text style={descCharCount >= 20 ? styles.charCountValid : styles.charCount}>
          {descCharCount}/20 karakter (minimal)
        </Text>

        <Text style={styles.label}>Foto Barang</Text>
        <TouchableOpacity style={styles.btnCamera} onPress={openCamera}>
          <Text style={styles.btnCameraText}>Ambil Foto</Text>
        </TouchableOpacity>
        
        {foto && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: foto }} style={styles.preview} />
            <TouchableOpacity onPress={() => setFoto(null)} style={styles.btnHapusFoto}>
              <Text style={styles.btnHapusFotoText}>Hapus Foto</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#2E7D32" style={styles.loader} />
        ) : (
          <TouchableOpacity 
            style={styles.btnKirim} 
            onPress={handleKirim}
          >
            <Text style={styles.btnKirimText}>SIMPAN LAPORAN</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  charCountValid: {
    fontSize: 12,
    color: '#388E3C',
    textAlign: 'right',
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    gap: 8,
  },
  btnKategori: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  btnKategoriActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  btnKategoriText: {
    color: '#666',
  },
  btnKategoriTextActive: {
    color: '#FFF',
  },
  statusContainer: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 12,
  },
  btnStatus: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  btnStatusHilang: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F',
  },
  btnStatusDitemukan: {
    backgroundColor: '#388E3C',
    borderColor: '#388E3C',
  },
  btnStatusText: {
    color: '#666',
    fontWeight: '500',
  },
  btnStatusTextActive: {
    color: '#FFF',
  },
  btnCamera: {
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnCameraText: {
    color: '#FFF',
    fontWeight: '600',
  },
  previewContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  btnHapusFoto: {
    marginTop: 8,
  },
  btnHapusFotoText: {
    color: '#D32F2F',
  },
  btnKirim: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
  },
  btnKirimText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    marginTop: 30,
    marginBottom: 40,
  },
});