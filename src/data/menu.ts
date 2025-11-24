// OFFICIAL 7 BREW MENU - Using complete real menu data
import { drinksComplete, getDrinksByCategoryComplete, getFeaturedDrinksComplete, getDrinkByIdComplete } from './menu-complete';

// Re-export everything from the complete official menu
export const drinks = drinksComplete;

export const getDrinksByCategory = getDrinksByCategoryComplete;
export const getFeaturedDrinks = getFeaturedDrinksComplete;
export const getDrinkById = getDrinkByIdComplete;

// Menu statistics for reference
export const MENU_STATS = {
  totalDrinks: drinks.length,
  originals: drinks.filter(d => d.isSignature && d.category === 'coffee').length,
  classics: drinks.filter(d => !d.isSignature && d.category === 'coffee').length,
  energyDrinks: drinks.filter(d => d.category === 'energy').length,
  smoothies: drinks.filter(d => d.category === 'smoothies').length,
  teas: drinks.filter(d => d.category === 'teas').length,
  lemonades: drinks.filter(d => d.category === 'lemonades').length,
  fizz: drinks.filter(d => d.category === 'fizz').length,
  shakes: drinks.filter(d => d.category === 'shakes').length,
  chillers: drinks.filter(d => d.category === 'chillers').length,
};
