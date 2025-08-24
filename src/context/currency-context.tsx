'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

type Currency = 'USD' | 'EUR' | 'JPY' | 'INR';

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (value: number) => string;
  convertFromUSD: (value: number) => number;
};

const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.93,
  JPY: 157,
  INR: 83,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const convertFromUSD = (value: number) => {
    return value * exchangeRates[currency];
  };

  const formatCurrency = (value: number) => {
    const convertedValue = convertFromUSD(value);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2,
    }).format(convertedValue);
  };
  
  const value = useMemo(() => ({
    currency,
    setCurrency,
    formatCurrency,
    convertFromUSD,
  }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
