'use client';
import "./globals.css";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import SessionWrapper from "./components/SessionWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme as "light" | "dark");
      document.documentElement.setAttribute("data-theme", storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <html lang="en">
      <body className="transition-colors duration-300 bg-cover bg-no-repeat bg-fixed bg-[url('/backgroundlight.png')] dark:bg-[url('/backgrounddark.png')]">
        <SessionWrapper>
          <div className="flex justify-end p-4">
            <button
              onClick={toggleTheme}
              className="text-gray-800 dark:text-gray-100 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
          </div>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
