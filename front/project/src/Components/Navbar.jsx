import React from 'react';

import '../Assets/NavSidebar.css'; // Importer le fichier CSS
import btLogo from '../Assets/bt.png'; // Importer l'image

const Navbar = () => {
  // Supposons que vous ayez le nom de la personne connectée dans une variable nommée "userName"
  const userName = "Mr. Wahbi";

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between h-20 text-white bg-blue-800 dark:bg-gray-800 z-10">
      <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-20 border-none">
      <img className="w-14 h-18 md:w-12 md:h-18 mr-2 rounded-md overflow-hidden" src={btLogo} alt="Logo" />
      <span className="hidden md:block">Banque de Tunisie</span>

      </div>

      <div className="flex-grow"></div> {/* Espace flexible pour étirer le lien Logout */}

      <div className="flex justify-end pr-3">
        {/* Message de bienvenue avec le nom de l'utilisateur */}
        <span className="mr-4">{`Bienvenue, ${userName}!`}</span>

        {/* Icône de profil */}


        {/* Lien Logout */}
        <a href="/login" className="flex items-center mr-4 hover:text-blue-100">
          <span className="inline-flex mr-1">
            {/* Icône de logout */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </span>
          {/* Texte du lien */}
          Logout
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
