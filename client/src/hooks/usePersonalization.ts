import { useState, useCallback, useEffect } from "react";
import type { Language, Currency } from "../lib/translations";

export type PersonalizationState = {
  clientName: string;
  date: string;
  language: Language;
  currency: Currency;
  services: string[];
  serviceValues: Record<string, number>;
  entryValue: number;
  paymentCondition: string;
  installments: number;
  notes: string;
};

const initialState: PersonalizationState = {
  clientName: "[NOME DO CLIENTE]",
  date: new Date().toLocaleDateString(),
  language: "pt",
  currency: "BRL",
  services: [],
  serviceValues: {},
  entryValue: 0,
  paymentCondition: "Proposta válida por 15 dias",
  installments: 1,
  notes: "",
};

import { serviceModules } from "../lib/proposals";

export function usePersonalization() {
  const [state, setState] = useState<PersonalizationState>(initialState);

  const updateField = useCallback(<K extends keyof PersonalizationState>(
    field: K,
    value: PersonalizationState[K]
  ) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleService = useCallback((serviceId: string) => {
    setState((prev: PersonalizationState) => {
      const isSelected = prev.services.includes(serviceId);
      const newServices = isSelected
        ? prev.services.filter((id: string) => id !== serviceId)
        : [...prev.services, serviceId];
      
      const newValues = { ...prev.serviceValues };
      if (!isSelected && !newValues[serviceId]) {
        const module = serviceModules.find(m => m.id === serviceId);
        if (module) newValues[serviceId] = module.defaultPrice;
      }

      return { ...prev, services: newServices, serviceValues: newValues };
    });
  }, []);

  const updateServiceValue = useCallback((serviceId: string, value: number) => {
    setState((prev: PersonalizationState) => ({
      ...prev,
      serviceValues: { ...prev.serviceValues, [serviceId]: value },
    }));
  }, []);

  const totalValue = state.services.reduce(
    (acc: number, id: string) => {
      const mod = serviceModules.find(m => m.id === id);
      const val = state.serviceValues[id] || 0;
      if (mod?.isRecurring) {
        return acc + (val * state.installments);
      }
      return acc + val;
    },
    0
  );

  const formattedTotal = new Intl.NumberFormat(
    state.language === "pt" ? "pt-BR" : "it-IT",
    {
      style: "currency",
      currency: state.currency === "BRL" ? "BRL" : "EUR",
    }
  ).format(totalValue);

  return {
    ...state,
    totalValue,
    formattedTotal,
    updateField,
    toggleService,
    updateServiceValue,
  };
}
