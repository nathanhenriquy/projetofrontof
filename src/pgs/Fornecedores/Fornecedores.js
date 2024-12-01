import React, { useState, useEffect } from "react";
import axios from "axios";
import './Fornecedores.css';

const FornecedoresForm = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cnpj: '',
        endereco: '',
        categoriaProduto: '',
        observacao: '',
    });

    const [fornecedores, setFornecedores] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");

            if (!token) {
                alert("Você precisa estar logado ");
                return;
            }

            const response = await axios.post('http://localhost:8080/fornecedor/novoFornecedor', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Fornecedor Criado ');

            console.log('Resposta do servidor:', response.data);
            setResponseMessage('Fornecedor criado com sucesso.');

            handleListAll();

            setFormData({
                nome: '',
                cnpj: '',
                endereco: '',
                categoriaProduto: '',
                observacao: ''
            });

        } catch (error) {
            console.error('Erro ao criar fornecedor:', error);
            setResponseMessage('Erro ao criar fornecedor.');
        }
    };


    const handleListAll = async () => {
        try {
            const token = localStorage.getItem("authToken");

            if (!token) {
                alert("Você precisa estar logado ");
                return;
            }

            const response = await axios.get('http://localhost:8080/fornecedor/allFornecedores', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setFornecedores(response.data);

        } catch (error) {
            console.error('Erro ao buscar fornecedores:', error);
            setResponseMessage('Erro ao carregar fornecedores.');
        }
    };


    return (
        <div>

            <div className="fornecedor-account-form">
                <h3>Cadastrar Fornecedor</h3>
                <form onSubmit={handleSave}>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Nome do Fornecedor"
                        required
                    />
                    <input
                        type="text"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        placeholder="CNPJ"
                        required
                    />
                    <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        placeholder="Endereço"
                        required
                    />
                    <input
                        type="text"
                        name="categoriaProduto"
                        value={formData.categoriaProduto}
                        onChange={handleChange}
                        placeholder="Categoria do Produto"
                        required
                    />
                    <input
                        type="text"
                        name="observacao"
                        value={formData.observacao}
                        onChange={handleChange}
                        placeholder="Observações"
                    />
                    <div>
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>


            <div className="fornecedor-account-form">
                <h3>Lista de Fornecedores</h3>
                <button onClick={handleListAll}>Atualizar Lista</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CNPJ</th>
                            <th>Endereço</th>
                            <th>Categoria</th>
                            <th>Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fornecedores.map((fornecedor) => (
                                <tr key={fornecedor.id}>
                                    <td>{fornecedor.id}</td>
                                    <td>{fornecedor.nome}</td>
                                    <td>{fornecedor.cnpj}</td>
                                    <td>{fornecedor.endereco}</td>
                                    <td>{fornecedor.categoriaProduto}</td>
                                    <td>{fornecedor.observacao}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default FornecedoresForm;
