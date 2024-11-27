import React, { useState } from "react";
import axios from "axios";
import './LoginAccount.css';


const LoginForm = ( {setCurrentPage} ) => {
    const [formData, setFormData] = useState({
        email: '',
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
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/users/login', formData);

            const token = response.data.Token;
            
            localStorage.setItem('authToken', token);  // Armazena o token no localStorage
            
            setResponseMessage('Login realizado com sucesso!');
            
            setTimeout(() => {
                setCurrentPage('landing'); 
            }, 1000);
            

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setResponseMessage('Senha ou email incorreto');
        }
    };

    return (
        <div>
            
            <div className="login-form">
                <h2>Faça Login</h2>
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
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <button type="submit">Login</button>
                </form>
                {responseMessage && <p className="response-message">{responseMessage}</p>}
            </div>
        </div>
    );
};

export default LoginForm;
