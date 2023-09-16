import React, { useState, useEffect } from 'react';
import './Pages.css';
import Main from '../template/main';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as Vars from '../Vars';
import { filteredObras, sortedObras } from '../controllers/FilterFunctions';
import EndButtons from '../controllers/EndButtons';
import ProgressBar from '../controllers/ProgressBar';
import { fetchPeps, fetchPedidos } from '../controllers/Api';

function Peps() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [setError] = useState(null);
    const [obras, setObras] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(null);
    const obrasFiltradas = obras ? filteredObras(obras, searchTerm, true) : [];
    const obrasEmOrdem = sortedObras(obrasFiltradas, sortField, sortDirection);

    const handleObraInfoClick = () => {
        setActiveTab('ObraInfo')
        navigate(`${Vars.OBRAINFO_PATH}${id}`);
    }
    const handleCronogramaClick = () => {
        setActiveTab('Cronograma')
        navigate(`${Vars.CRONOGRAMA_PATH}${id}`);
    }
    const handlePecaProjetoClick = () => {
        setActiveTab('Peças/Projetos')
        navigate(`${Vars.PECA_PROJETO_PATH}${id}`);
    }
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        setActiveTab('PEPs');
        const fetchPepsData = async () => {
            try {
                const data = await fetchPeps(id);
                setObras(data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchPepsData();

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

    const handleSortChange = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return (
        <Main>
            <div>
                <div className='page-top'>
                    <strong className='display-5'>Peps</strong>
                    <div className='barra-pesquisa'>
                        <strong className="mb-0">{pedidos && pedidos[0] ? pedidos[0].nome : ''} | {pedidos && pedidos[0] ? pedidos[0].contrato : ''}</strong>
                        <input type="text" placeholder="Pesquisar..." value={searchTerm} onChange={handleSearchChange} />
                    </div>
                </div>
                <hr />
                <div className='content container-fluid'>
                    <div className="row header" style={{
                        position: "sticky",
                        top: "0",
                        zIndex: "1",
                    }}>
                        <div className="col">
                            <span>Pedido</span>
                            <button onClick={() => handleSortChange('pedido')}>
                                {sortField === 'pedido' && sortDirection === 'asc' ? '▲' : '▼'}
                            </button>
                        </div>
                        <div className="col">
                            <span>SubEtapa</span>
                            <button onClick={() => handleSortChange('pep')}>
                                {sortField === 'pep' && sortDirection === 'asc' ? '▲' : '▼'}
                            </button>
                        </div>
                        <div className="col">
                            <span>Peso</span>
                            <button onClick={() => handleSortChange('peso_planejado')}>
                                {sortField === 'peso_planejado' && sortDirection === 'asc' ? '▲' : '▼'}
                            </button>
                        </div>
                        <div className="col">
                            <span>Engenharia</span>
                            <button onClick={() => handleSortChange('liberado_engenharia')}>
                                {sortField === 'liberado_engenharia' && sortDirection === 'asc' ? '▲' : '▼'}
                            </button>
                        </div>
                        <div className="col">
                            <span>Fábrica</span>
                            <button onClick={() => handleSortChange('tota_fabrica')}>
                                {sortField === 'tota_fabrica' && sortDirection === 'asc' ? '▲' : '▼'}
                            </button>
                        </div>
                        <div className="col">
                            <span>Logística</span>
                            <button onClick={() => handleSortChange('total_logistica')}>
                                {sortField === 'total_logistica' && sortDirection === 'asc' ? '▲' : '▼'}
                            </button>
                        </div>
                        <div className="col">
                            <span>Montagem</span>
                            <button onClick={() => handleSortChange('total_montagem')}>
                                {sortField === 'total_montagem' && sortDirection === 'asc' ? '▲' : '▼'}
                            </button>
                        </div>
                        <div className="col">
                            <span>Atualizado</span>
                            <button onClick={() => handleSortChange('ultima_edicao')}>
                                {sortField === 'ultima_edicao' && sortDirection === 'asc' ? '▲' : '▼'}
                            </button>
                        </div>
                    </div>
                    {obrasEmOrdem.map((obra) => (
                        <div className="row" style={{ cursor: "default" }} key={obra.id}>
                            <div className="col">
                                <p>{obra.pedido}</p>
                            </div>
                            <div className="col">
                                <p>{obra.pep ? obra.pep.slice(-7) : ''}</p>
                            </div>
                            <div className="col">
                                <p>{obra.peso_planejado}</p>
                            </div>
                            <div className="col">
                                <ProgressBar value={obra.liberado_engenharia} />
                            </div>
                            <div className="col">
                                <ProgressBar value={obra.total_produzido} />
                            </div>
                            <div className="col">
                                <ProgressBar value={obra.total_embarcado} />
                            </div>
                            <div className="col">
                                <ProgressBar value={obra.total_montado} />
                            </div>
                            <div className="col">
                                <p>{new Date(obra.ultima_edicao).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <hr style={{ margin: "0px" }} />
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <div>
                <EndButtons
                    activeTab={activeTab}
                    handleCronogramaClick={handleCronogramaClick}
                    handleObraInfoClick={handleObraInfoClick}
                    handlePecaProjetoClick={handlePecaProjetoClick}
                />
            </div>
            <br />
        </Main >
    );
}

export default Peps;