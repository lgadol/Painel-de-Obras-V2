import React, { useState, useEffect } from 'react';
import './Pages.css';
import Main from '../template/main';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as Vars from '../Vars';
import EndButtons from '../controllers/EndButtons';
import { fetchPedidos, fetchCronograma } from '../controllers/Api';

function Cronograma() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [setError] = useState(null);
    const [cronograma, setCronograma] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(null);
    const [expandedIds, setExpandedIds] = useState([]);
    const [expandido, setExpandido] = useState(false);

    const handleObraInfoClick = () => {
        setActiveTab('ObraInfo')
        navigate(`${Vars.OBRAINFO_PATH}${id}`);
    }
    const handlePEPsClick = () => {
        setActiveTab('PEPs')
        navigate(`${Vars.PEP_PATH}${id}`);
    }
    const handlePecaProjetoClick = () => {
        setActiveTab('Peças/Projetos')
        navigate(`${Vars.PECA_PROJETO_PATH}${id}`);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleFilterChange = (event) => {
        const filterValue = event.target.value;
        // Atualize o estado do componente com o valor selecionado
        // Filtre os dados de acordo com o valor selecionado
    }

    function handleButtonClick(event, id) {
        setExpandido(prevState => ({ ...prevState, [id]: !prevState[id] }));
        event.stopPropagation();
        setExpandedIds((prevExpandedIds) =>
            prevExpandedIds.includes(id)
                ? prevExpandedIds.filter((expandedId) => expandedId !== id)
                : [...prevExpandedIds, id]
        );
    }

    useEffect(() => {
        setActiveTab('Cronograma');

        const fetchPedidosData = async () => {
            try {
                const data = await fetchPedidos(id);
                setPedidos(data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchPedidosData();

        const fetchCronogramaData = async () => {
            try {
                const data = await fetchCronograma(id);
                setCronograma(data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchCronogramaData();
    }, [id]);

    return (
        <Main>
            <div>
                <div className='page-top'>
                    <strong className='display-5'>Cronograma</strong>
                    <div className='barra-pesquisa'>
                        <strong className="mb-0">{pedidos && pedidos[0] ? pedidos[0].nome : ''} | {pedidos && pedidos[0] ? pedidos[0].contrato : ''}</strong>
                        <input type="text" placeholder="Pesquisar..." value={searchTerm} onChange={handleSearchChange} />
                    </div>
                </div>
                <hr></hr>
                <div className='filtro-cronograma'>
                    <select onChange={handleFilterChange} style={{ cursor: "pointer" }}>
                        <option value="all">Todas</option>
                        <option value="onTime">Em dia</option>
                        <option value="late">Atrasadas</option>
                        <option value="lateEngineering">Atrasadas Engenharia</option>
                        <option value="lateFactory">Atrasadas Fábrica</option>
                        <option value="lateLogistics">Atrasadas Logística</option>
                        <option value="lateAssembly">Atrasadas Montagem</option>
                    </select>
                </div>

                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <div className='cronograma-content cronograma-container-fluid'>
                        <div className="cronograma-row cronograma-header">
                            <div className="cronograma-col">
                                <span>Pedido</span>
                                <button onClick={() => handleSortChange('pedido')}>
                                    {sortField === 'pedido' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Engenharia/EP Início</span>
                                <button onClick={() => handleSortChange('ei')}>
                                    {sortField === 'ei' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Engenharia/EP Fim</span>
                                <button onClick={() => handleSortChange('ef')}>
                                    {sortField === 'ef' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Fábrica Início</span>
                                <button onClick={() => handleSortChange('fi')}>
                                    {sortField === 'fi' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Fábrica Fim</span>
                                <button onClick={() => handleSortChange('ff')}>
                                    {sortField === 'ff' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Logística Início</span>
                                <button onClick={() => handleSortChange('li')}>
                                    {sortField === 'li' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Logística Fim</span>
                                <button onClick={() => handleSortChange('lf')}>
                                    {sortField === 'lf' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Montagem Início</span>
                                <button onClick={() => handleSortChange('mi')}>
                                    {sortField === 'mi' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Montagem Fim</span>
                                <button onClick={() => handleSortChange('mf')}>
                                    {sortField === 'mf' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Atrasadas Engenharia/EP</span>
                                <button onClick={() => handleSortChange('atraso_engenharia')}>
                                    {sortField === 'atraso_engenharia' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Atrasadas Fábrica</span>
                                <button onClick={() => handleSortChange('atraso_fabrica')}>
                                    {sortField === 'atraso_fabrica' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Atrasadas Logística</span>
                                <button onClick={() => handleSortChange('atraso_embarque')}>
                                    {sortField === 'atraso_embarque' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Atrasadas Montagem</span>
                                <button onClick={() => handleSortChange('atraso_montagem')}>
                                    {sortField === 'atraso_montagem' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="cronograma-col">
                                <span>Última Atualização</span>
                                <button onClick={() => handleSortChange('ultima_atualizacao')}>
                                    {sortField === 'ultima_atualizacao' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                        </div>
                        {pedidos.map((pedido, index) => {
                            const cronogramaItem = cronograma[index];
                            return (
                                <React.Fragment key={pedido.id}>
                                    <div className='cronograma-info' onClick={(event) => handleButtonClick(event, pedido.id)}>
                                        <div className={`conteudo_cronograma-row ${index % 2 === 0 ? 'linha-cinza' : 'linha-branca'}`} style={{ cursor: "pointer" }}>
                                            <div className="conteudo_cronograma-col">
                                                <button
                                                    key={pedido.id}
                                                    className='cronograma-button'
                                                    onClick={(event) => handleButtonClick(event, pedido.id)}
                                                >
                                                    {expandido[pedido.id] ? '▲' : '▼'}
                                                </button><p>{pedido.pedido.slice(-3)}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{cronogramaItem && cronogramaItem.ei ? new Date(cronogramaItem.ei).toLocaleDateString('pt-BR') : "-"}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{cronogramaItem && cronogramaItem.ef ? new Date(cronogramaItem.ef).toLocaleDateString('pt-BR') : "-"}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{cronogramaItem && cronogramaItem.fi ? new Date(cronogramaItem.fi).toLocaleDateString('pt-BR') : "-"}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{cronogramaItem && cronogramaItem.ff ? new Date(cronogramaItem.ff).toLocaleDateString('pt-BR') : "-"}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{cronogramaItem && cronogramaItem.li ? new Date(cronogramaItem.li).toLocaleDateString('pt-BR') : "-"}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{cronogramaItem && cronogramaItem.lf ? new Date(cronogramaItem.lf).toLocaleDateString('pt-BR') : "-"}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{cronogramaItem && cronogramaItem.mi ? new Date(cronogramaItem.mi).toLocaleDateString('pt-BR') : "-"}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{cronogramaItem && cronogramaItem.mf ? new Date(cronogramaItem.mf).toLocaleDateString('pt-BR') : "-"}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{pedido.atraso_engenharia === null ? "-" : pedido.atraso_engenharia}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{pedido.atraso_fabrica === null ? "-" : pedido.atraso_fabrica}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{pedido.atraso_embarque === null ? "-" : pedido.atraso_embarque}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{pedido.atraso_montagem === null ? "-" : pedido.atraso_montagem}</p>
                                            </div>
                                            <div className="conteudo_cronograma-col">
                                                <p>{pedido.ultima_atualizacao === null ? "Data Nula" : new Date(pedido.ultima_atualizacao).toLocaleDateString('pt-BR')}</p>
                                            </div>
                                        </div>
                                        {/* Informações expandidas */}
                                        {expandedIds.includes(pedido.id) && (
                                            <div className={`cronograma-content cronograma-container-fluid
                                         ${index % 2 === 0 ? 'linha-cinza' : 'linha-branca'}`}>
                                                <div className={`cronograma-row cronograma-header ${index % 2 === 0 ? 'linha-cinza' : 'linha-branca'}`} style={{ backgroundColor: "black" }}>
                                                    <div className="cronograma-col">
                                                        <span>Etapa</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Engenharia/EP Início</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Engenharia/EP Fim</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Fábrica Início</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Fábrica Fim</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Logística Início</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Logística Fim</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Montagem Início</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Montagem Fim</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Descrição</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Status Engenharia</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Status Fábrica</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Status Logística</span>
                                                    </div>
                                                    <div className="cronograma-col">
                                                        <span>Status Montagem</span>
                                                    </div>
                                                </div>
                                                <div className="conteudo_cronograma-row">
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem.pep.slice(-3)}</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem && cronogramaItem.ei ? new Date(cronogramaItem.ei).toLocaleDateString('pt-BR') : "-"}</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem && cronogramaItem.ef ? new Date(cronogramaItem.ef).toLocaleDateString('pt-BR') : "-"}</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem && cronogramaItem.fi ? new Date(cronogramaItem.fi).toLocaleDateString('pt-BR') : "-"}</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem && cronogramaItem.ff ? new Date(cronogramaItem.ff).toLocaleDateString('pt-BR') : "-"}</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem && cronogramaItem.li ? new Date(cronogramaItem.li).toLocaleDateString('pt-BR') : "-"}</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem && cronogramaItem.lf ? new Date(cronogramaItem.lf).toLocaleDateString('pt-BR') : "-"}</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem && cronogramaItem.mi ? new Date(cronogramaItem.mi).toLocaleDateString('pt-BR') : "-"}</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem && cronogramaItem.mf ? new Date(cronogramaItem.mf).toLocaleDateString('pt-BR') : "-"}</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{/* {pepItem.descricao === null ? "-" : pepItem.descricao} */}</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem.es}% / 100%</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem.fs}% / 100%</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem.ls}% / 100%</p>
                                                    </div>
                                                    <div className="conteudo_cronograma-col">
                                                        <p>{cronogramaItem.ms}% / 100%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <br />
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
            <br />
            <div>
                <EndButtons
                    activeTab={activeTab}
                    handlePEPsClick={handlePEPsClick}
                    handleObraInfoClick={handleObraInfoClick}
                    handlePecaProjetoClick={handlePecaProjetoClick}
                />
            </div>
            <br />
        </Main >
    )
}

export default Cronograma;