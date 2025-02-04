import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'cadastro'>('cadastro');
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    telefone: '',
    cpf: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    senha: '',
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:5000'; // Substitua pela URL do seu back-end

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (activeTab === 'cadastro') {
      setFormData({ ...formData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  // Função para lidar com o envio do formulário de cadastro
  const handleCadastroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        nomeCompleto: formData.nomeCompleto,
        cpf: formData.cpf,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone,
      });
      setMessage(`Cadastro realizado com sucesso: ${response.data.message}`);
      navigate('/menu'); // Redireciona para o menu
    } catch (error: any) {
      setMessage(`Erro no cadastro: ${error.response?.data?.message || error.message}`);
    }
  };

  // Função para lidar com o envio do formulário de login
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: loginData.email,
        senha: loginData.senha,
      });
  
      // Verifica se a resposta contém o objeto 'usuario'
      const { usuario, mensagem } = response.data;
      if (usuario && usuario.nome) {
        setMessage(`Login realizado com sucesso! Bem-vindo, ${usuario.nome}`);
        navigate('/menu'); // Redireciona para o menu
      } else {
        setMessage('Erro: Dados de usuário não encontrados na resposta.');
      }
    } catch (error: any) {
      setMessage(`Erro no login: ${error.response?.data?.erro || error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>Bem-vindo</h1>
        <div className="tabs">
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => {
              setActiveTab('login');
              setMessage('');
            }}
          >
            Login
          </button>
          <button
            className={activeTab === 'cadastro' ? 'active' : ''}
            onClick={() => {
              setActiveTab('cadastro');
              setMessage('');
            }}
          >
            Cadastro
          </button>
        </div>
        {message && <p className="message">{message}</p>}
        {activeTab === 'cadastro' && (
          <form onSubmit={handleCadastroSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="nomeCompleto"
                placeholder="nome completo"
                value={formData.nomeCompleto}
                onChange={handleInputChange}
                required
              />
              <span className="required">(obrigatório)</span>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <span className="required">(obrigatório)</span>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleInputChange}
                required
              />
              <span className="required">(obrigatório)</span>
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="telefone"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={handleInputChange}
              />
              <span className="optional">(Opcional)</span>
            </div>
            <div className="form-group">
              <input
                type="cpf"
                name="cpf"
                placeholder="Cpf"
                value={formData.cpf}
                onChange={handleInputChange}
              />
              <span className="obrigatorio">(obrigatorio)</span>
            </div>
            <div className="form-group checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">Aceitar Termos e Condições</label>
            </div>
            <button type="submit" className="submit-btn">Cadastrar</button>
          </form>
        )}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={loginData.senha}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Entrar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
