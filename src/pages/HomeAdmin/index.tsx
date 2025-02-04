import '../HomeAdmin/style.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
    id: number;
    name: string;
    location: string;
    date: string;
    endDate: string;
    price: string;
    description: string;
    idEndereco: number;
    idTipo: number;
    idGestor: number;
}

export default function HomeAdmin() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
      nome: '',
      dtVento: '',
      dtTermino: '',
      idEndereco: '',
      idTipo: '',
      idGestor: '',
      descricao: '',
      valorInscricao: '',
    });
  
    useEffect(() => {
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
  
    const handleNewEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewEvent({ ...newEvent, [name]: value });
    };
  
    const handleCreateEvent = async () => {
        try {
          // Validação para campos obrigatórios
          if (
            !newEvent.nome ||
            !newEvent.dtVento ||
            !newEvent.dtTermino ||
            !newEvent.idEndereco ||
            !newEvent.idTipo ||
            !newEvent.idGestor
          ) {
            alert('Preencha todos os campos obrigatórios!');
            return;
          }
      
          // Converte as datas para o formato aceito pelo PostgreSQL
          const formatDate = (date: string) => {
            const d = new Date(date);
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            const hh = String(d.getHours()).padStart(2, '0');
            const mi = String(d.getMinutes()).padStart(2, '0');
            const ss = String(d.getSeconds()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
          };
      
          const formattedDtVento = formatDate(newEvent.dtVento);
          const formattedDtTermino = formatDate(newEvent.dtTermino);
      
          const eventToSend = {
            ...newEvent,
            dtVento: formattedDtVento,
            dtTermino: formattedDtTermino,
          };
      
          // Enviar para o back-end
          await axios.post('http://localhost:5000/eventos', eventToSend);
      
          alert('Evento cadastrado com sucesso!');
          setIsModalOpen(false); // Fecha o modal
          // Atualiza a lista de eventos
          const response = await axios.get('http://localhost:5000/eventos');
          setEvents(response.data);
        } catch (error) {
          console.error('Erro ao criar evento:', error);
          alert('Erro ao criar evento!');
        }
      };

  return (
    <div className="containers">
      <div className="header">
        <button className="add-event-button" onClick={() => setIsModalOpen(true)}>
          + Novo Evento
        </button>
      </div>

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

{isModalOpen && (
    <div className="modal">
      <div className="modal-content">
        <h3>Cadastrar Novo Evento</h3>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Evento"
          value={newEvent.nome}
          onChange={handleNewEventChange}
          required
        />
        <input
          type="datetime-local"
          name="dtVento"
          placeholder="Data de Início"
          value={newEvent.dtVento}
          onChange={handleNewEventChange}
          required
        />
        <input
          type="datetime-local"
          name="dtTermino"
          placeholder="Data de Término"
          value={newEvent.dtTermino}
          onChange={handleNewEventChange}
          required
        />
        <input
          type="text"
          name="idEndereco"
          placeholder="ID do Endereço"
          value={newEvent.idEndereco}
          onChange={handleNewEventChange}
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição do Evento"
          value={newEvent.descricao}
          onChange={handleNewEventChange}
        />
        <input
          type="number"
          name="idTipo"
          placeholder="ID do Tipo do Evento"
          value={newEvent.idTipo}
          onChange={handleNewEventChange}
          required
        />
        <input
          type="number"
          name="idGestor"
          placeholder="ID do Gestor"
          value={newEvent.idGestor}
          onChange={handleNewEventChange}
          required
        />
        <input
          type="number"
          step="0.01"
          name="valorInscricao"
          placeholder="Valor da Inscrição"
          value={newEvent.valorInscricao}
          onChange={handleNewEventChange}
        />
        <button onClick={handleCreateEvent}>Cadastrar Evento</button>
        <button onClick={() => setIsModalOpen(false)}>Fechar</button>
      </div>
    </div>
  )}
    </div>
  );
}
