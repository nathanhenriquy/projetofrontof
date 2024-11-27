import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Transacao = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const handleViewTransacao = async () => {
            try {
                const response = await axios.get('http://localhost:8080/payment/transacoes', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                });
                setTransactions(response.data);
            } catch (error) {
                console.error('Erro ao carregar transações:', error);
            }
        };

        handleViewTransacao();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-warning">Suas Transações</h2>
            {transactions.length === 0 ? (
                <p className="text-light">Você ainda não realizou transações.</p>
            ) : (
                <div className="list-group">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="list-group-item bg-dark text-light">
                            <p><strong>ID Transação:</strong> {transaction.id}</p>
                            <p><strong>Valor:</strong> R$ {transaction.valorTotal.toFixed(2)}</p>
                            <p><strong>Método de Pagamento:</strong> {transaction.metodoPagamento}</p>
                            <p><strong>Status:</strong> {transaction.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Transacao;
