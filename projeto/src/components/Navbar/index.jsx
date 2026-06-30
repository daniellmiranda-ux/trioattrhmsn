import React from 'react';
import './style.css';

export default function Navbar({ setTelaAtual }) {
    return (
    <nav className="navbar">
        <h2 className="navbar-logo">ERP Nexus</h2>
        <div className="navbar-links">
        <button className="navbar-btn" onClick={() => setTelaAtual('home')}>Home</button>
        <button className="navbar-btn" onClick={() => setTelaAtual('clientes')}>Clientes</button>
        <button className="navbar-btn" onClick={() => setTelaAtual('funcionarios')}>Funcionários</button>
        </div>
    </nav>
    );
}