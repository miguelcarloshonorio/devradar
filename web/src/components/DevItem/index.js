import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import './styles.css';

function DevItem({dev, onDelete}) {
  async function handleDelete(e) {
    e.preventDefault();
    onDelete(dev);
  }
  return (
    <li className="dev-item">
      <div className="user-options">
          <button onClick={handleDelete}>
            <FaTimesCircle />
          </button>
        </div>
      <header className="header-item">
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span> {dev.techs.join(', ')}</span>
        </div>
        
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

export default DevItem;
