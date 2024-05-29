'use client'
import { AuthContextProvider } from "@/context/authContext"
import React, { useState, useEffect } from 'react';
import { jost } from './fonts'
import Alert from './components/Alert'
import Preloader from './components/Preloader';
import './globals.css';


export default function RootLayout({ children }) {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad());
    return () => {
      window.removeEventListener('load', handleLoad());
    };
  }, []);

  return (
    <html lang="en">
      <body className={jost.className}>
            <AuthContextProvider>
              {children}
            </AuthContextProvider>
        <Alert />
      </body>
    </html>
  )
}
