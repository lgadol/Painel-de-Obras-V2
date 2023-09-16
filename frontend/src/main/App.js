import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './app.css';
import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Header from '../components/template/header';
import Routes from './routes';
import Footer from '../components/template/footer';

export default props =>
    <BrowserRouter>
        <div className="app">
            <Header />
            <Routes />
            <Footer />
        </div>
    </ BrowserRouter>
