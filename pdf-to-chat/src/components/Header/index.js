import React from 'react';

function Header() {
  return (
    <header className="app-header">
      <h1>PDFtoChat</h1>
      <nav>
        <button onClick={() => console.log('Dashboard clicked')}>Dashboard</button>
        <img src="path_to_user_avatar.jpg" alt="User Avatar" className="user-avatar" />
      </nav>
    </header>
  );
}

export default Header;