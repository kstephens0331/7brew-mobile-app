import { Syrup, Sauce, Topping } from '../types';

// OFFICIAL 7 BREW CUSTOMIZATION OPTIONS - Complete menu

export const syrupsComplete: Syrup[] = [
  // Regular Syrups (from official menu)
  { id: 'almond', name: 'Almond', sugarFree: false },
  { id: 'banana', name: 'Banana', sugarFree: false },
  { id: 'blackberry', name: 'Blackberry', sugarFree: false },
  { id: 'cherry', name: 'Cherry', sugarFree: false },
  { id: 'cupcake', name: 'Cupcake', sugarFree: false },
  { id: 'guava', name: 'Guava', sugarFree: false },
  { id: 'kiwi', name: 'Kiwi', sugarFree: false },
  { id: 'lavender', name: 'Lavender', sugarFree: false },
  { id: 'lime', name: 'Lime', sugarFree: false },
  { id: 'mango', name: 'Mango', sugarFree: false },
  { id: 'orange', name: 'Orange', sugarFree: false },
  { id: 'passion-fruit', name: 'Passion Fruit', sugarFree: false },
  { id: 'peppermint', name: 'Peppermint', sugarFree: false },
  { id: 'pineapple', name: 'Pineapple', sugarFree: false },
  { id: 'pomegranate', name: 'Pomegranate', sugarFree: false },
  { id: 'toasted-marshmallow', name: 'Toasted Marshmallow', sugarFree: false },
  { id: 'watermelon', name: 'Watermelon', sugarFree: false },
  { id: 'chocolate-macadamia', name: 'Chocolate Macadamia Nut', sugarFree: false },

  // Sugar-Free Syrups
  { id: 'sf-blue-raspberry', name: 'Blue Raspberry', sugarFree: true },
  { id: 'sf-brown-sugar-cinnamon', name: 'Brown Sugar Cinnamon', sugarFree: true },
  { id: 'sf-caramel', name: 'Caramel', sugarFree: true },
  { id: 'sf-coconut', name: 'Coconut', sugarFree: true },
  { id: 'sf-hazelnut', name: 'Hazelnut', sugarFree: true },
  { id: 'sf-irish-cream', name: 'Irish Cream', sugarFree: true },
  { id: 'sf-peach', name: 'Peach', sugarFree: true },
  { id: 'sf-raspberry', name: 'Raspberry', sugarFree: true },
  { id: 'sf-salted-caramel', name: 'Salted Caramel', sugarFree: true },
  { id: 'sf-strawberry', name: 'Strawberry', sugarFree: true },
  { id: 'sf-vanilla', name: 'Vanilla', sugarFree: true },

  // Seasonal
  { id: 'sf-pumpkin-pie', name: 'Pumpkin Pie', sugarFree: true, seasonal: true },
];

export const saucesComplete: Sauce[] = [
  { id: 'caramel', name: 'Caramel', sugarFree: false },
  { id: 'chocolate', name: 'Dark Chocolate', sugarFree: false },
  { id: 'white-chocolate', name: 'White Chocolate', sugarFree: false },
  { id: 'pumpkin-pie-sauce', name: 'Pumpkin Pie', sugarFree: false },
];

export const toppingsComplete: Topping[] = [
  { id: 'whipped-cream', name: 'Whipped Cream' },
  { id: 'cold-foam', name: 'Cold Foam' },
  { id: 'caramel-drizzle', name: 'Caramel Drizzle' },
  { id: 'chocolate-drizzle', name: 'Chocolate Drizzle' },
];

// Export counts for reference
export const TOTAL_SYRUPS = syrupsComplete.length; // 29 flavors!
export const TOTAL_SAUCES = saucesComplete.length; // 4 sauces
export const TOTAL_TOPPINGS = toppingsComplete.length; // 4 toppings
