import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("HopeTrack-Theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("HopeTrack-Theme", theme);
    set({ theme });
  },
}));
