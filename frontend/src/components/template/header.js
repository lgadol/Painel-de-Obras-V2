import './header.css';
import React from 'react';
import logo from '../../assets/img/logo.png';
import { Link, useNavigate } from 'react-router-dom';

export default props => {
    const navigate = useNavigate();
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    const [fullScreenTitle, setFullScreenTitle] = React.useState('Tela Cheia');

    const handleClick = () => {
        window.location.assign('http://10.54.0.18/');
    }

    const handleClick2 = () => {
        navigate('/login');
    }

    const handleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
            setFullScreenTitle('Tela Normal');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
                setFullScreenTitle('Tela Cheia');
            }
        }
    }

    return (
        <header className="header-top d-none d-sm-flex align-items-center">
            <img src={logo} alt="Logo" className="logo" />
            <button className={isFullScreen ? 'fa fa-compress' : 'fa fa-arrows-alt'} onClick={handleFullScreen} title={fullScreenTitle}></button>
            <button className='fa fa-home' onClick={handleClick} title='ADM Montagem'></button>
            <button className='fa fa-sign-in' onClick={handleClick2} title='Logout'></button>
            <h1 className="mt-5">
                <Link to="/obras" title='Página inicial'>
                    <i className="fa fa-bar-chart"></i> Painel de Obras
                </Link>
            </h1>
        </header>
    );
}