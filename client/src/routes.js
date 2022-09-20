import React from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

//imports admin
import Dashboard from './pages/admin/dashboard';

import Produtos from './pages/admin/produtos';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar';

import Usuarios from './pages/admin/usuarios';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';

//imports client
import Home from './pages/client/home';
import ProdutoDetails from './pages/client/produtos/produtos.details';
import Album from './pages/client/painel';


export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                
                <Route path="/"  element={<Album/>}/>
                <Route path="/produtos/:idProduto" element={<ProdutoDetails/>}/>

                <Route path="/admin" element={<Dashboard/>}/>
                <Route path="/admin/produtos" element={<Produtos/>}/>
                <Route path="/admin/produtos/cadastrar" element={<ProdutoCadastrar/>}/>
                <Route path="/admin/produtos/editar/:idProduto" element={<ProdutoEditar/>}/>
                
                <Route path="/admin/usuarios" element={<Usuarios/>}/>
                <Route path="/admin/usuarios/cadastrar" element={<UsuarioCadastrar/>}/>
                <Route path="/admin/usuarios/editar/:idProduto" element={<UsuarioEditar/>}/>

            </Routes>
        </BrowserRouter>
    )
}