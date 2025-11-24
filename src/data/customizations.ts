// OFFICIAL 7 BREW CUSTOMIZATION OPTIONS
import { syrupsComplete, saucesComplete, toppingsComplete } from './customizations-complete';

// Re-export complete official options
export const syrups = syrupsComplete;
export const sauces = saucesComplete;
export const toppings = toppingsComplete;

// Export organized by type for UI
export const syrupsByType = {
  regular: syrups.filter(s => !s.sugarFree && !s.seasonal),
  sugarFree: syrups.filter(s => s.sugarFree && !s.seasonal),
  seasonal: syrups.filter(s => s.seasonal),
};

export const CUSTOMIZATION_STATS = {
  totalSyrups: syrups.length,
  regularSyrups: syrupsByType.regular.length,
  sugarFreeSyrups: syrupsByType.sugarFree.length,
  seasonalSyrups: syrupsByType.seasonal.length,
  totalSauces: sauces.length,
  totalToppings: toppings.length,
};
