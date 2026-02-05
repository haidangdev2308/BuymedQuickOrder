import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types';

interface Props {
  item: Product;
  quantity: number;
  onUpdate: (id: number, delta: number) => void;
}

// Dùng memo để render lại khi item hoặc quantity của chính nó thay đổi
export const ProductItem = memo(({ item, quantity, onUpdate }: Props) => {
  return (
    <View style={styles.container}>
      {/*Thông tin thuốc */}
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          {/*Hiển thị Rx nếu là thuốc kê đơn */}
          {item.isPrescription && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Rx</Text>
            </View>
          )}
        </View>
        <Text style={styles.subText}>
          {item.category} •{' '}
          <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
        </Text>
      </View>

      {/*Nút tăng giảm */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, quantity === 0 && styles.btnDisabled]}
          onPress={() => onUpdate(item.id, -1)}
          disabled={quantity === 0}
        >
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qty}>{quantity}</Text>

        <TouchableOpacity
          style={[styles.btn, quantity >= 99 && styles.btnDisabled]}
          onPress={() => onUpdate(item.id, 1)}
          disabled={quantity >= 99}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  info: { flex: 1, paddingRight: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '600', color: '#333' },
  badge: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  subText: { color: '#666', fontSize: 14 },
  price: { color: '#2e7d32', fontWeight: '500' }, // Màu xanh giá tiền
  actions: { flexDirection: 'row', alignItems: 'center' },
  btn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDisabled: { backgroundColor: '#f5f5f5' },
  btnText: { fontSize: 18, color: '#1976d2', fontWeight: 'bold' },
  qty: { width: 30, textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
