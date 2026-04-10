import React, { createContext, useState, useEffect, useContext } from 'react';

const FridgeContext = createContext();

export const useFridge = () => useContext(FridgeContext);

const makeSampleData = () => {
  const fromToday = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  return [
    { id: 'sample1',  name: 'meal prep chicken',  expiryDate: fromToday(-1), addedDate: new Date().toISOString() },
    { id: 'sample2',  name: 'whole milk',          expiryDate: fromToday(0),  addedDate: new Date().toISOString() },
    { id: 'sample3',  name: 'leftover pasta',      expiryDate: fromToday(1),  addedDate: new Date().toISOString() },
    { id: 'sample4',  name: 'avocados',            expiryDate: fromToday(2),  addedDate: new Date().toISOString() },
    { id: 'sample5',  name: 'greek yogurt',        expiryDate: fromToday(5),  addedDate: new Date().toISOString() },
    { id: 'sample6',  name: 'eggs',                expiryDate: fromToday(12), addedDate: new Date().toISOString() },
    { id: 'sample7',  name: 'cheddar cheese',      expiryDate: fromToday(6),  addedDate: new Date().toISOString() },
    { id: 'sample8',  name: 'orange juice',        expiryDate: fromToday(3),  addedDate: new Date().toISOString() },
    { id: 'sample9',  name: 'hot sauce',           expiryDate: fromToday(90), addedDate: new Date().toISOString() },
    { id: 'sample10', name: 'hummus',              expiryDate: fromToday(4),  addedDate: new Date().toISOString() },
  ];
};

export const FridgeProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    // First launch: auto-load sample data so demo never opens to empty fridge
    const hasLaunched = localStorage.getItem('chillguy_launched');
    if (!hasLaunched) {
      localStorage.setItem('chillguy_launched', 'true');
      const sample = makeSampleData();
      localStorage.setItem('chillguy_fridge', JSON.stringify(sample));
      return sample;
    }
    const saved = localStorage.getItem('chillguy_fridge');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chillguy_fridge', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id, updates) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const loadSampleData = () => setItems(makeSampleData());

  const clearAll = () => setItems([]);

  // Computed lists
  const freshItems = items.filter(i => {
    if (!i.expiryDate) return true;
    const days = (new Date(i.expiryDate) - new Date()) / (1000 * 60 * 60 * 24);
    return days > 3;
  });

  const expiringItems = items.filter(i => {
    if (!i.expiryDate) return false;
    const days = (new Date(i.expiryDate) - new Date()) / (1000 * 60 * 60 * 24);
    return days >= 0 && days <= 3;
  });

  const expiredItems = items.filter(i => {
    if (!i.expiryDate) return false;
    const days = (new Date(i.expiryDate) - new Date()) / (1000 * 60 * 60 * 24);
    return days < 0;
  });

  // Estimated $ saved: fresh items = full value tracked, expiring = partial
  const estimatedSavings = Math.round(freshItems.length * 4.50 + expiringItems.length * 2.00);

  const getMascotState = () => {
    if (items.length === 0) return 'empty';
    if (expiredItems.length > 0) return 'expired';
    if (expiringItems.length > 1) return 'worried';
    if (expiringItems.length === 1) return 'concerned';
    return 'vibing';
  };

  return (
    <FridgeContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateItem,
      loadSampleData,
      clearAll,
      freshItems,
      expiringItems,
      expiredItems,
      estimatedSavings,
      mascotState: getMascotState(),
    }}>
      {children}
    </FridgeContext.Provider>
  );
};
