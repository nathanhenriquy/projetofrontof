import React, { useState } from "react";
import axios from "axios";
import './UserAccountForm.css';



const UserAccountForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        data_nasc: '',
        password: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // evita reload da pag

        try {
            const response = await axios.post('http://localhost:8080/users/novouser', formData); // colocar o endpoint
            setResponseMessage('Conta criada com sucesso!');
            console.log('Resposta do servidor:', response.data);
        } catch (error) {
            console.error('Erro ao criar conta:', error);
            setResponseMessage('Falha ao conectar ao servidor');
        }
    };

    return (
        <div>
            
            <div className="user-account-form">
                
                <h2>Crie sua Conta</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Digite seu e-mail"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="date"
                            name="data_nasc"
                            value={formData.data_nasc}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <button type="submit">Criar Conta</button>
                </form>
                {responseMessage && <p className="response-message">{responseMessage}</p>}
            </div>
        </div>
    );
};

export default UserAccountForm;
