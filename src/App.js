import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    await api.post('/repositories', {
      "title": "Desafio Node.js",
      "url": "https://github.com/Monsterleds",
      "techs": ["Node.js", "ReactJs", "ReactNative"]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(response => {
      setRepositories([...repositories.filter(repository => repository.id != id)]);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {
            repositories.map(response => <li key={response.id}>{response.title}<button onClick={() => handleRemoveRepository(`${response.id}`)}>
            Remover
          </button></li>)
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
