import { CartMap, Product } from '../types';

//unittestable function to calculate totals
export const calculateTotals = (cart: CartMap, products: Product[]) => {
  let totalQty = 0;
  let totalAmount = 0;
  let totalSKUs = 0;

  Object.keys(cart).forEach((key) => {
    const id = Number(key);
    const qty = cart[id];
    const product = products.find((p) => p.id === id);

    if (product && qty > 0) {
      totalQty += qty;
      totalAmount += qty * product.price;
      totalSKUs += 1;
    }
  });

  return { totalQty, totalAmount, totalSKUs };
};