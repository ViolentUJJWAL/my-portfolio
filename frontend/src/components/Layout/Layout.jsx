import React from 'react';
import Navbar from '../Navbar';
import LogoutButton from '../LogoutButton';
import ThemeBtn from '../ThemeBtns';
import ThemeBgBtn from '../ThemeBgBtn';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <LogoutButton />
      <div className="fixed bottom-4 left-4 z-50 flex space-x-2">
        <ThemeBtn />
        <ThemeBgBtn />
      </div>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;