import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Cart = ({ handleNavClick }) => {
    const [cartItems, setCartItems] = useState([]);


    // mesmo useffect para n precisa do onclick
    useEffect(() => {
        HandleViewProdutos();
    }, []);

    const HandleViewProdutos = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            const response = await axios.get('http://localhost:8080/cart/viewprodutos', {
                headers: { Authorization: `Bearer ${token}` },
                params: { userId }
            });

            setCartItems(response.data);

        } catch (error) {
            console.error('Erro ao carregar o carrinho:', error);
        }
    };

    const HandleRemoveItem = async (idProduto) => {
        try {
            const token = localStorage.getItem('authToken');

            await axios.delete(`http://localhost:8080/cart/removeproduto/${idProduto}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            HandleViewProdutos();
        } catch (error) {
            console.error('Erro ao remover produto:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-warning">Seu Carrinho</h2>
            {cartItems.length === 0 ? (
                <p className="text-light">O carrinho está vazio.</p>
            ) : (
                <div className="list-group">
                    {cartItems.map((item) => (
                        <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light">
                            <span>IdProduto: {item.IdProduto} ----- R$ {item.valor}</span>
                            <button className="btn btn-danger btn-sm" onClick={() => HandleRemoveItem(item.produto.id)}> Remover </button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Cart;
