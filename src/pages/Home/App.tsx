import './App.css'
import '../../index.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  price: string;
}

export default function App() {

  const [events, setEvents] = useState<Event[]>([]);
  const [inscricoes, setInscricoes] = useState<number[]>([]);
  const idParticipante = 1;

  useEffect(() => {
    // Busca os eventos do banco de dados via API
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/eventos');
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleInscrever = async (idEvento: number) => {
    try {
      await axios.post('http://localhost:5000/inscrever', {
        idEvento,
        idParticipante,
      });

      // Atualiza o estado para incluir o evento inscrito
      setInscricoes((prev) => [...prev, idEvento]);
    } catch (error) {
      console.error('Erro ao inscrever-se:', error);
    }
  };


  return (
    <div className="containers">
      <div className="search-section">
        <div className="search-container">
          <div className="search-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Pesquisar eventos" className="search-input" />
            <div className="search-buttons">
              <button className="search-button">Buscar</button>
            </div>
          </div>
        </div>
      </div>

      <main className="main-content">
        <div className="events-grid">
        {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-info">
                <h3>{event.name}</h3>
                <p>{event.location}</p>
                <p>{new Date(event.date).toLocaleDateString('pt-BR')}</p>
                <p>R$ {event.price}</p>
                <button
                  onClick={() => handleInscrever(event.id)}
                  disabled={inscricoes.includes(event.id)} // Desabilita se já inscrito
                >
                  {inscricoes.includes(event.id) ? 'Inscrito' : 'Inscreva-se'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sobre</h3>
            <ul>
              <li>Como Somos</li>
              <li>Carreiras</li>
              <li>Imprensa</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Para Produtores</h3>
            <ul>
              <li>Sympla</li>
              <li>Preços</li>
              <li>Cases de Sucesso</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Para participantes</h3>
            <ul>
              <li>Como Comprar</li>
              <li>Segurança</li>
              <li>Política de Privacidade</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Redes Sociais</h3>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

