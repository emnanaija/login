// Layout.js
import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';

const Layout = ({ children }) => {
  return (
    <div style={layoutStyle}>
      <Sidebar />
      <div style={contentWrapperStyle}>
        <Navbar />
        <main style={mainContentStyle}>
          {children}
        </main>
      </div>
    </div>
  );
};

const layoutStyle = {
  display: 'flex',
};

const contentWrapperStyle = {
  display: 'flex',
  flexDirection: 'column', // Disposition en colonne pour empiler la barre de navigation et le contenu principal
  width: '100%', // Assure que le contenu s'étend sur toute la largeur
};

const mainContentStyle = {
  flex: 1, // Le contenu principal prendra tout l'espace disponible
  padding: '20px',
};

export default Layout;
