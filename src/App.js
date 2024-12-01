import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAccountForm from './pgs/NewUsers/UserAccountForm';
import Login from './pgs/Login/LoginAccount';
import Produtos from './pgs/Produtos/Produtos';
import Vitrine from './pgs/Produtos/Vitrine';
import Cart from './pgs/Cart/Cart';
import Transacao from './pgs/Transacao/Transacao';
import Fornecedores from './pgs/Fornecedores/Fornecedores';

//metodos gestão

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="App">

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a href="/" className="navbar-brand fs-2 text-warning">TechYellow</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('login')}>Login</button>
              </li>

              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('createAccount')}>Criar Conta</button>
              </li>

              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('cart')}>Carrinho</button>
              </li>

              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('transacao')}>Transações</button>
              </li>

              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('produtos')}>Produtos</button>
              </li>

              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('fornecedores')}>Fornecedores</button>
              </li>


              <li className="nav-item">
                <button className="nav-link btn" onClick={() => {
                  localStorage.removeItem('authToken');
                  alert('Saindo....');
                  setCurrentPage('landing');
                }}
                >                  
                  Sair
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>



      {/* conteudo principal*/}
      <div className="conteiner text-center mt-5">
        {currentPage === 'landing' && (
          <div className="mt-4">
            <h1 className="display-4  text-warning ">Seja Bem Vindo</h1>
            <Vitrine />
          </div>
        )}

      </div>

      {/* criar conta */}
      {currentPage === 'createAccount' && (
        <div className="mt-4">
          <UserAccountForm />
        </div>
      )}

      {/* login */}
      {currentPage === 'login' && (
        <div className="mt-4">
          <Login setCurrentPage={setCurrentPage} />
        </div>
      )}

      {/* carrinho */}
      {currentPage === 'cart' && (
        <div className="mt-4">
          <Cart />
        </div>
      )}

      {/* transacao */}
      {currentPage === 'transacao' && (
        <div className="mt-4">
          <Transacao />
        </div>
      )}

      {/* Produtos */}
      {currentPage === 'produtos' && (
        <div className="mt-4">
          <Produtos />
        </div>
      )}

       {/* fornecedores */}
       {currentPage === 'fornecedores' && (
        <div className="mt-4">
          <Fornecedores />
        </div>
      )}

      {/* sair */}
      {currentPage === 'logout' && (
        <div className="mt-4">
          <h1 className="display-4">form logout</h1>
        </div>
      )}



    </div>
  );
}

export default App;
