import { calculateTotals } from '../src/utils/calculations';
import { Product } from '../src/types';

// Mock Data giả để test
const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Thuốc A', price: 10000, category: 'A', isPrescription: false },
  { id: 2, name: 'Thuốc B', price: 20000, category: 'B', isPrescription: true },
];

describe('Cart Calculations Logic', () => {
  test('should return 0 for empty cart', () => {
    const cart = {};
    const result = calculateTotals(cart, MOCK_PRODUCTS);
    
    expect(result.totalQty).toBe(0);
    expect(result.totalAmount).toBe(0);
    expect(result.totalSKUs).toBe(0);
  });

  test('should calculate correctly for single item', () => {
    const cart = { 1: 5 }; // Mua 5 viên Thuốc A (10k)
    const result = calculateTotals(cart, MOCK_PRODUCTS);

    expect(result.totalQty).toBe(5);
    expect(result.totalAmount).toBe(50000); // 5 * 10000
    expect(result.totalSKUs).toBe(1);
  });

  test('should calculate correctly for multiple items', () => {
    const cart = { 
      1: 2, // 2 thuốc A = 20k
      2: 3  // 3 thuốc B = 60k
    };
    const result = calculateTotals(cart, MOCK_PRODUCTS);

    expect(result.totalQty).toBe(5); // 2 + 3
    expect(result.totalAmount).toBe(80000); // 20k + 60k
    expect(result.totalSKUs).toBe(2);
  });
});