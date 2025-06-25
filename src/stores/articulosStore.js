import { create } from "zustand";

export const useArticulosStore = create((set) => ({
  articulos: [],
  setArticulos: (articulos) => set({ articulos }),
  addArticulo: (articulo) =>
    set((state) => ({ articulos: [...state.articulos, articulo] })),
}));
