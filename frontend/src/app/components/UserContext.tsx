"use client"; // Контекст работает только на клиенте

import { createContext, useContext, useState } from "react";

type UserRole = "admin" | "user" | "guest";

type UserContextType = {
  role: UserRole;
  setRole: (role: UserRole) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Кастомный хук для удобного использования контекста
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Провайдер контекста
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole>("guest");

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};
