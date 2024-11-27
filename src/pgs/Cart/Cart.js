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

    const HandleRemoveItem = async (IdProduto) => {
        try {
            const token = localStorage.getItem('authToken');

            await axios.delete(`http://localhost:8080/cart/removeproduto/${IdProduto}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            HandleViewProdutos();
        } catch (error) {
            console.error('Erro ao remover produto:', error);
        }
    };

    const HandlePagamento = async (metodo) => {
        try {
            const token = localStorage.getItem('authToken');

            await axios.post(`http://localhost:8080/payment/${metodo}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert(`Pagamento por ${metodo} realizado com sucesso!`);

            setCartItems([]); 
            HandleViewProdutos(); 
            
        } catch (error) {
            console.error(`Erro ao realizar pagamento por ${metodo}:`, error);
            alert('Erro ao realizar pagamento.');
        }
    };

    // Calcular valor total ---- reduce intera o array, acc é o acumulador, e item é os itens do carrinho
    const totalValue = cartItems.reduce((acc, item) => acc + item.valor, 0);

    return (
        <div className="container mt-4">
            <h2 className="text-warning">Seu Carrinho</h2>
            {cartItems.length === 0 ? (
                <p className="text-light">O carrinho está vazio.</p>
            ) : (
                <div className="list-group">
                    {cartItems.map((item) => (
                        <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light">
                            <span>IdProduto: {item.IdProduto} ----- Quantidade: {item.quantidade} ----- R$ {item.valor}</span>
                            <button className="btn btn-danger btn-sm" onClick={() => HandleRemoveItem(item.IdProduto)}> Remover </button>
                        </div>
                    ))}

                    <div className="mt-3 text-light">
                        <h4 className="text-warning">Valor Total: R$ {totalValue.toFixed(2)}</h4>
                        {/* tofixed acima ele formata para o decilmal o valor */}
                        
                        <button className="btn btn-primary me-2" onClick={() => HandlePagamento('credito')}>Pagar com Crédito</button>
                        <button className="btn btn-success" onClick={() => HandlePagamento('pix')}>Pagar com PIX</button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Cart;
