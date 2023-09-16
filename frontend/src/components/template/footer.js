import './footer.css';
import logo1 from '../../assets/img/Institucional_horizontal.png';
import logo2 from '../../assets/img/Inovação.png';
import React from 'react';

export default props =>
    <footer className="footer">
        <p className='copyright'>Medabil - 2023 - Direitos Autorais Reservados</p>
        <div className='footer-img1'>
            <img className='logo1' src={logo1} alt="logo1" />
        </div>
        <div className='footer-img2'>
            <img className='logo2' src={logo2} alt="logo2" />
        </div>
    </footer>