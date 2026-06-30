import React, { useState, useEffect } from 'react';
import api from '../../service/api';
import './style.css';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', cpf: '' });

    const carregarClientes = async () => {
        try {
        const response = await api.get('/clientes');
        setClientes(response.data);
        } catch (error) {
        alert('Erro ao carregar a listagem de clientes.');
        }
    };

    useEffect(() => { carregarClientes(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await api.post('/clientes', formData);
        alert('Cliente cadastrado com sucesso!');
        setFormData({ nome: '', email: '', telefone: '', cpf: '' });
        carregarClientes();
        } catch (error) {
        const msg = error.response?.data?.mensagem || 'Erro ao cadastrar cliente.';
        alert(msg);
        }
    };

    return (
        <div className="page-container">
        <h2>Gestão de Clientes</h2>
        
        <div className="card-wrapper">
            <h3>Novo Cadastro</h3>
            <form onSubmit={handleSubmit} className="form-grid">
            <input placeholder="Nome" value={formData.nome} required onChange={e => setFormData({...formData, nome: e.target.value})} />
            <input placeholder="Email" type="email" value={formData.email} required onChange={e => setFormData({...formData, email: e.target.value})} />
            <input placeholder="Telefone" value={formData.telefone} required onChange={e => setFormData({...formData, telefone: e.target.value})} />
            <input placeholder="CPF" value={formData.cpf} required onChange={e => setFormData({...formData, cpf: e.target.value})} />
            <button type="submit" className="btn-submit">Cadastrar</button>
            </form>
        </div>

        <div className="card-wrapper">
            <h3>Listagem de Clientes</h3>
            <table className="data-table">
            <thead>
                <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map((c, i) => (
                <tr key={i}>
                    <td>{c.nome}</td>
                    <td>{c.email}</td>
                    <td>{c.telefone}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}