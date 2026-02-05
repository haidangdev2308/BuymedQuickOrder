import { useState, useMemo, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash.debounce';
import { PRODUCTS_DATA } from '../constants/mockData';
import { CartMap } from '../types';

const CART_STORAGE_KEY = '@buymed_cart_v1';

export const useQuickOrder = () => {
  const [searchText, setSearchText] = useState(''); // Text trong ô input
  const [query, setQuery] = useState(''); // Text thực tế dùng để search
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartMap>({}); // Lưu dạng { id: quantity }

  //Load giỏ hàng cũ khi mở App
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };
    loadCart();
  }, []);

  // Tự động lưu giỏ hàng mỗi khi Cart thay đổi
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    };
    saveCart();
  }, [cart]);

  // Debounce Search
  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        setQuery(text);
      }, 300), // Chỉ setQuery sau khi ngừng gõ 300ms
    [],
  );

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    debouncedSearch(text); // Delay việc search
  };

  //Lọc sản phẩm
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(item => {
      //search không phân biệt hoa thường
      const matchName = item.name.toLowerCase().includes(query.toLowerCase());
      //filter category
      const matchCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchName && matchCategory;
    });
  }, [query, selectedCategory]);

  //Thay đổi số lượng (+/-)
  const updateQuantity = useCallback((productId: number, delta: number) => {
    setCart(prevCart => {
      const currentQty = prevCart[productId] || 0;
      const newQty = currentQty + delta;

      if (newQty < 0) return prevCart;
      if (newQty > 99) return prevCart;

      const newCart = { ...prevCart };
      if (newQty === 0) {
        delete newCart[productId]; // Xóa key nếu số lượng = 0 để tiết kiệm bộ nhớ
      } else {
        newCart[productId] = newQty;
      }
      return newCart;
    });
  }, []);

  //Tính tổng
  const totals = useMemo(() => {
    let totalQty = 0;
    let totalAmount = 0;
    let totalSKUs = 0;

    Object.keys(cart).forEach(key => {
      const id = Number(key);
      const qty = cart[id];
      const product = PRODUCTS_DATA.find(p => p.id === id);

      if (product && qty > 0) {
        totalQty += qty;
        totalAmount += qty * product.price;
        totalSKUs += 1; // Đếm số dòng sản phẩm SKU
      }
    });

    return { totalQty, totalAmount, totalSKUs };
  }, [cart]);

  return {
    searchText,
    handleSearchChange,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    cart,
    updateQuantity,
    totals,
  };
};
