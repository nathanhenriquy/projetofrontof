import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";


const Vitrine = () => {
    const [products, setProducts] = useState([]);
    
    
    // pelo que entendi carrega os dados da api automatico, sem isso eu precisaria de um on-click
    useEffect(() => {
        handleListAll();
    }, []);

    const handleListAll = async () => {
        try {
            const response = await axios.get('http://localhost:8080/produtos/allprodutos');
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    const handleAddCarrinho = async (idProduto) => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                alert("Você precisa estar logado ");
                return;
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId; 

            const cartItem = {
                IdProduto: idProduto,
                quantidade: 1,
            };

            // console.log("ID Produto:", idProduto);
            
            const response = await axios.post('http://localhost:8080/cart/add', cartItem, {
                headers: {
                    Authorization: `Bearer ${token}`,                    
                },
            });

            console.log(response.data); 

            if (response.status === 200) {
                alert('Produto adicionado ao carrinho!');
            } else {
                console.error('Resposta inesperada:', response);
                alert('Erro ao adicionar o produto');
            }

        } catch (error) {
            console.error('Erro ao adicionar produto', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* o map pega cada elemento e faz um array para mostrar, e recomeça */}
                {products.map((product) => (
                    <div key={product.id} className="col-md-3 mb-4">
                        <div className="card h-100 text-center bg-dark">
                            <div className="card-body">
                                <h5 className="card-title text-light">{product.nome}</h5>
                                <p className="card-text text-light">{product.descricao}</p>
                                <p className="text-success"><strong>R$ {product.preco}</strong></p>
                                <button className="btn btn-primary" onClick={() => handleAddCarrinho(product.id)} >  Adicionar ao Carrinho</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vitrine;
