import axios from 'axios';


// Função para visualizar uma transação
const visualizarTransacao = async (transacaoId) => {
    try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            alert("Você precisa estar logado.");
            return;
        }

        const response = await axios.get(
            `http://localhost:8080/payment/transacao/${transacaoId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            console.log('Transação:', response.data);
        } else {
            alert('Erro ao visualizar a transação.');
        }
    } catch (error) {
        console.error('Erro ao visualizar a transação:', error);
        alert('Erro ao visualizar a transação.');
    }
};

// Função para exibir o botão de pagamento
const exibirPagamento = () => {
    return (
        <div>
            <button onClick={pagarCredito}>Pagar com Crédito</button>
            <button onClick={pagarPix}>Pagar com PIX</button>
        </div>
    );
};

export { pagarCredito, pagarPix, visualizarTransacao, exibirPagamento };
