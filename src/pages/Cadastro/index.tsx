import React, { useState } from 'react';
import './style.css';

const SignupForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'cadastro'>('cadastro');

  return (
    <div className="container">
      <div className="form-card">
        <h1>Bem-vindo</h1>
        <div className="tabs">
          <button 
            className={activeTab === 'login' ? 'active' : ''} 
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={activeTab === 'cadastro' ? 'active' : ''} 
            onClick={() => setActiveTab('cadastro')}
          >
            Cadastro
          </button>
        </div>
        {activeTab === 'cadastro' && (
          <form>
            <div className="form-group">
              <input type="text" placeholder="Nome completo" required />
              <span className="required">(obrigatório)</span>
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" required />
              <span className="required">(obrigatório)</span>
            </div>
            <div className="form-group">
              <input type="password" placeholder="Senha" required />
              <span className="required">(obrigatório)</span>
            </div>
            <div className="form-group">
              <input type="password" placeholder="Confirmação de senha" required />
              <span className="required">(obrigatório)</span>
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Telefone" />
              <span className="optional">(Opcional)</span>
            </div>
            <div className="form-group">
              <input type="date" placeholder="Data de nascimento" />
              <span className="optional">(Opcional)</span>
            </div>
            <div className="form-group checkbox">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">Aceitar Termos e Condições</label>
            </div>
            <div className="social-login">
              <p>Ou faça cadastro com:</p>
              <div className="social-icons">
                <button className="social-icon google"></button>
                <button className="social-icon microsoft"></button>
                <button className="social-icon apple"></button>
              </div>
            </div>
            <button type="submit" className="submit-btn">Cadastre</button>
          </form>
        )}
        {activeTab === 'login' && (
          <div className="login-form">
            <p className="login-subtitle">Faça login em sua sua conta para continuar</p>
            <form>
              <div className="form-group">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="password" placeholder="Senha" required />
              </div>
              <div className="social-login">
                <p>Ou faça login com:</p>
                <div className="social-icons">
                  <button className="social-icon google"></button>
                  <button className="social-icon microsoft"></button>
                  <button className="social-icon apple"></button>
                </div>
              </div>
              <button type="submit" className="submit-btn">Entrar</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;

