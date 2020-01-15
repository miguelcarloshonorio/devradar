import React, { useEffect, useState } from 'react';
import './App.css';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
import './global.css';
import './Main.css';
import api from './services/api';
import './Sidebar.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  async function handleDelete(dev) {
    const response = await api.delete(`/devs/${dev._id}`);
    if (response.data) {
      const letDevs = devs.filter(d => d._id !== dev._id);

      setDevs(letDevs);
    }
  }

  return (
    <>
      <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
        </aside>
        <main>
          <ul>
            {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} onDelete={handleDelete} />
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}

export default App;
