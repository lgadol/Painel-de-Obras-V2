import React from 'react';
import { Routes, Route } from "react-router-dom";

import FetchObras from '../components/pages/FetchObras';
import ObraInfo from '../components/pages/ObraInfo';
import Peps from '../components/pages/Peps';
import Pecas from '../components/pages/Pecas';
import Cronograma from '../components/pages/Cronograma';
import Login  from '../components/pages/Login';

export default props => (
    <Routes>
        <Route exact path="/obras" element={<FetchObras />} />
        <Route path="/pedidos/:id" element={<ObraInfo />} />
        <Route path="/peps/:id" element={<Peps />} />
        <Route path="/pecas/:id" element={<Pecas />} />
        <Route path="/cronograma/:id" element={<Cronograma />} />
        <Route path="/login" element={<Login />} />
    </Routes>
)