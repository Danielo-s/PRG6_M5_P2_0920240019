import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import Dashboard from "./pages/Dashboard";
import TambahLaporan from "./pages/TambahLaporan";
import ListBarang from "./pages/ListBarang";
import DetailBarang from "./pages/DetailBarang";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LaporanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Findit - Lost & Found" }}
      />
      <Stack.Screen
        name="DetailBarang"
        component={DetailBarang}
        options={{ title: "Detail Barang" }}
      />
    </Stack.Navigator>
  );
}

function DaftarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListBarang"
        component={ListBarang}
        options={{ title: "Daftar Laporan" }}
      />
      <Stack.Screen
        name="DetailBarang"
        component={DetailBarang}
        options={{ title: "Detail Barang" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{ 
          tabBarActiveTintColor: "#2E7D32", 
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          }
        }} 
      >
        <Tab.Screen
          name="Beranda"
          component={LaporanStack}
          options={{
            tabBarLabel: "Beranda",
            tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />
          }}
        />
        
        <Tab.Screen
          name="TambahLaporan"
          component={TambahLaporan}
          options={{
            tabBarLabel: "Tambah",
            tabBarIcon: ({ color }) => <MaterialIcons name="add-circle" size={24} color={color} />
          }}
        />
        
        <Tab.Screen
          name="ListBarang"
          component={DaftarStack}
          options={{
            tabBarLabel: "List Barang",
            tabBarIcon: ({ color }) => <MaterialIcons name="list" size={24} color={color} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}