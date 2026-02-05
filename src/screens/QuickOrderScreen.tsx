import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { useQuickOrder } from '../hooks/useQuickOrder';
import { ProductItem } from '../components/ProductItem';
import { CATEGORIES } from '../constants/mockData';

export default function QuickOrderScreen() {
  const {
    searchText,
    handleSearchChange,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    cart,
    updateQuantity,
    totals,
  } = useQuickOrder(); //Custom Hook

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/*Header & Search */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Quick Order</Text>
        <TextInput
          style={styles.input}
          placeholder="Search products (Ex: Panadol)..."
          value={searchText}
          onChangeText={handleSearchChange}
          clearButtonMode="while-editing"
        />
      </View>

      {/*Category Filter */}
      <View style={styles.catContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catList}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catItem,
                selectedCategory === cat && styles.catActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.catText,
                  selectedCategory === cat && styles.catTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/*list sản phẩm */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }} // Tránh bị che bởi Footer
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            quantity={cart[item.id] || 0} // Lấy số lượng từ Cart Map
            onUpdate={updateQuantity}
          />
        )}
        // tìm kiếm trống
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No products found for "{searchText}"
            </Text>
          </View>
        }
      />

      {/*totalAmount*/}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total SKUs: {totals.totalSKUs}</Text>
          <Text style={styles.footerLabel}>Total Qty: {totals.totalQty}</Text>
        </View>
        <View>
          <Text style={styles.totalPrice}>
            {totals.totalAmount.toLocaleString()} đ
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: { padding: 16, backgroundColor: 'white', paddingBottom: 8 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  input: {
    backgroundColor: '#f1f3f4',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  catContainer: { backgroundColor: 'white', paddingBottom: 12 },
  catList: { paddingHorizontal: 16 },
  catItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f1f3f4',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  catActive: { backgroundColor: '#1976d2', borderColor: '#1976d2' },
  catText: { color: '#555', fontWeight: '500' },
  catTextActive: { color: 'white' },
  empty: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#999', fontSize: 16 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  footerLabel: { color: '#666', fontSize: 14 },
  totalPrice: { fontSize: 20, fontWeight: 'bold', color: '#d32f2f' },
});
