import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NlSidebar.scss';

const NlSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="NlSidebar-container" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <ul>
        <li>{isOpen ? 'Cadastro' : ' '}</li>
        {isOpen && (
          <ul>
            <li>
              <Link to="/licencas">Licenças</Link>
            </li>
            <li>
              <Link to="/listaGeCaixas">Lista de caixas</Link>
            </li>
          </ul>
        )}
      </ul>
    </aside>
  );
};

export default NlSidebar;
