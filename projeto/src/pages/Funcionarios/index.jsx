import React, { useState, useEffect } from 'react';
import api from '../../service/api';
import './style.css';

export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [formData, setFormData] = useState({ nome: '', telefone: '', email: '', cargo: '', setor: '' });

    const carregarFuncionarios = async () => {
        try {
        const response = await api.get('/funcionarios');
        setFuncionarios(response.data);
        } catch (error) {
        alert('Erro ao carregar a listagem de funcionários.');
        }
    };

    useEffect(() => { carregarFuncionarios(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await api.post('/funcionarios', formData);
        alert('Funcionário cadastrado com sucesso!');
        setFormData({ nome: '', telefone: '', email: '', cargo: '', setor: '' });
        carregarFuncionarios();
        } catch (error) {
        const msg = error.response?.data?.mensagem || 'Erro ao cadastrar funcionário.';
        alert(msg);
        }
    };

    return (
        <div className="page-container">
        <h2>Gestão de Funcionários</h2>
        
        <div className="card-wrapper">
            <h3>Novo Cadastro</h3>
            <form onSubmit={handleSubmit} className="form-grid">
            <input placeholder="Nome" value={formData.nome} required onChange={e => setFormData({...formData, nome: e.target.value})} />
            <input placeholder="Telefone" value={formData.telefone} required onChange={e => setFormData({...formData, telefone: e.target.value})} />
            <input placeholder="Email" type="email" value={formData.email} required onChange={e => setFormData({...formData, email: e.target.value})} />
            <input placeholder="Cargo" value={formData.cargo} required onChange={e => setFormData({...formData, cargo: e.target.value})} />
            <input placeholder="Setor" value={formData.setor} required onChange={e => setFormData({...formData, setor: e.target.value})} />
            <button type="submit" className="btn-submit">Cadastrar</button>
            </form>
        </div>

        <div className="card-wrapper">
            <h3>Quadro de Funcionários</h3>
            <table className="data-table">
            <thead>
                <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Setor</th>
                </tr>
            </thead>
            <tbody>
                {funcionarios.map((f, i) => (
                <tr key={i}>
                    <td>{f.nome}</td>
                    <td>{f.telefone}</td>
                    <td>{f.email}</td>
                    <td>{f.cargo}</td>
                    <td>{f.setor}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}