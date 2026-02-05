import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    price: 15000,
    category: 'Pain Relief',
    isPrescription: false,
  },
  {
    id: 2,
    name: 'Amoxicillin 500mg',
    price: 45000,
    category: 'Antibiotic',
    isPrescription: true,
  },
  {
    id: 3,
    name: 'Vitamin C 1000mg',
    price: 30000,
    category: 'Supplement',
    isPrescription: false,
  },
  {
    id: 4,
    name: 'Cetirizine 10mg',
    price: 20000,
    category: 'Allergy',
    isPrescription: false,
  },
  {
    id: 5,
    name: 'Omeprazole 20mg',
    price: 55000,
    category: 'Gastro',
    isPrescription: true,
  },
];

// Danh sách Category để làm bộ lọc
export const CATEGORIES = [
  'All',
  'Pain Relief',
  'Antibiotic',
  'Supplement',
  'Allergy',
  'Gastro',
];
