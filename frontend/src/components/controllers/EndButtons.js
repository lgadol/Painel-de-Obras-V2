import React, { useState, useEffect } from 'react';
import './styles/EndButtons.css';
import { useParams } from 'react-router-dom';
import * as Vars from '../Vars';
import { fetchPedidos } from '../controllers/Api';

const Buttons = ({
    activeTab,
    handleObraInfoClick,
    handlePEPsClick,
    handleCronogramaClick,
    handlePecaProjetoClick,
}) => {
    const { id } = useParams();
    const [setError] = useState(null);
    const [setPedidos] = useState([]);

    useEffect(() => {
        const fetchPedidosData = async () => {
            try {
                const data = await fetchPedidos(id);
                setPedidos(data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchPedidosData();
    }, [id]);

    return (
        <div className='end_buttons'>
            {activeTab !== 'ObraInfo' && (
                <button onClick={handleObraInfoClick}>Obra Info</button>
            )}
            {activeTab !== 'PEPs' && <button onClick={handlePEPsClick}>PEPs</button>}
            {activeTab !== 'Cronograma' && (
                <button onClick={handleCronogramaClick}>Cronograma</button>
            )}
            {activeTab !== 'Peças/Projetos' && (
                <button onClick={handlePecaProjetoClick}>Peças/Projetos</button>
            )}
            <a
                className='download-button'
                href={`${Vars.EXCEL_DOWNLOAD_PATH}${id}`}
            >
                <i className='fa fa-download'></i> Peças Excel
            </a>
        </div>
    );
};

export default Buttons;
