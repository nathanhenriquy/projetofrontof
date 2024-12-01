import React, { useState } from "react";
import './Produtos.css';
import axios from "axios";

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: '',
    })

    
    const [responseMessage, setResponseMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [updateId, setUpdateId] = useState('');
    const [updateData, setUpdateData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: '',
    });
    const [deleteId, setDeleteId] = useState('');


    // tratar o envento change do form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

       const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({
            ...updateData,
            [name]: value,
        });
    };

    // tratar o salvar gravar dados
    const handleSave = async (e) => {
        e.preventDefault(); // evita reload da pag

        try {
            const response = await axios.post('http://localhost:8080/produtos/novoproduto', formData); // colocar o endpoint
            alert('Produto Criado com Sucesso');
            console.log('Resposta do servidor:', response.data);

            setFormData({
                nome: '',
                descricao: '',
                preco: '',
                estoque: '',
            });

        } catch (error) {
            console.error('Erro ao criar produto:', error);
            
        }

    };

    //limpar a tela
    const handleClear = () => {
        setFormData({
            nome: '',
            descricao: '',
            preco: '',
            estoque: '',
        });
        setResponseMessage(''); //esvaziar mensagens que possam estar aparecendo
    };

     //limpar a tela
     const handleClearUpdate = () => {
        setUpdateData({
            nome: '',
            descricao: '',
            preco: '',
            estoque: '',
        });
        setUpdateId(''); // Limpar o ID 
        setResponseMessage(''); // Esvaziar mensagens que possam estar aparecendo
    };

    
    // Update produto
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/produtos/updateprodutos/${updateId}`, updateData);
            alert('Produto Atualizado');
            console.log('Resposta do servidor:', response.data);

            handleListAll(); 

        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            setResponseMessage('Falha ao conectar ao servidor');
        }
    };

    // Listar todos produtos
    const handleListAll = async () => {
        try {
            const response = await axios.get('http://localhost:8080/produtos/allprodutos');
            setProducts(response.data);
            
        } catch (error) {
            console.error('Erro ao mostrar produtos:', error);
            setResponseMessage('Falha ao conectar ao servidor');
           
        }
    };

    // Delete produto peol ID
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/produtos/deleteprodutos/${deleteId}`);
            alert('Produto Deletado');
            setDeleteId('');
            
            handleListAll(); 
        } catch (error) {
            console.error('Erro ao deletar produtos:', error);
            setResponseMessage('Falha ao conectar ao servidor');
        }
    };

    return (
        // CADASTRO DE PRODUTOS
        <div>
            <div className="user-account-form">
                <h3>Cadastro de Produtos</h3>  
                <form onSubmit={handleSave}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Digite o nome do Produto"
                            required
                        />
                        <input
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            placeholder="Digite a Descrição"
                            required
                        />
                        <input
                            type="text"
                            name="preco"
                            value={formData.preco}
                            onChange={handleChange}
                            placeholder="Digite o Preço"
                            required
                        />
                        <input
                            type="number"
                            name="estoque"
                            value={formData.estoque}
                            onChange={handleChange}
                            placeholder="Digite o Estoque"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={handleClear}>Limpar</button>
                    </div>
                </form>
            
            </div>


            {/* UPDATE DE PRODUTOS */}
            <div className="user-account-form">
                <h3>Atualizar Produto</h3>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="ID do produto"
                        value={updateId}
                        onChange={(e) => setUpdateId(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        name="nome"
                        value={updateData.nome}
                        onChange={handleUpdateChange}
                        placeholder="Digite o nome do Produto"
                    />
                    <input
                        type="text"
                        name="descricao"
                        value={updateData.descricao}
                        onChange={handleUpdateChange}
                        placeholder="Digite a Descrição"
                    />
                    <input
                        type="text"
                        name="preco"
                        value={updateData.preco}
                        onChange={handleUpdateChange}
                        placeholder="Digite o Preço"
                    />
                    <input
                        type="number"
                        name="estoque"
                        value={updateData.estoque}
                        onChange={handleUpdateChange}
                        placeholder="Digite o Estoque"
                    />
                </div>
                <button onClick={handleUpdate}>Atualizar</button>
                <button type="button" onClick={handleClearUpdate}>Limpar</button>
            
            </div>



              {/* LITAR PRODUTOS */}
            <div className="user-account-form">
                <h3>Listar Todos os Produtos</h3>
                <button onClick={handleListAll}>Listar Produtos</button>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.nome}</td>
                                <td>{product.descricao}</td>
                                <td>R${product.preco}</td>
                                <td>{product.estoque}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* DELETE  PRODUTOS */}               
            <div className="user-account-form">
                <h3>Deletar Produto</h3>
                <input
                    type="text"
                    placeholder="ID do produto para deletar"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    required
                />
                <button onClick={handleDelete}>Deletar</button>
            
              
            </div>
        </div>
    );
};

export default ProductDataForm;
