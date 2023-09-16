import React, { useState, useEffect } from 'react';
import './Pages.css';
import Main from '../template/main';
import { useParams, useNavigate } from 'react-router-dom';
import * as Vars from '../Vars';
import { filteredObras, sortedObras } from '../controllers/FilterFunctions';
import EndButtons from '../controllers/EndButtons';
import ProgressBar2 from '../controllers/ProgressBar2';

function ObraInfo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [obras, setObra] = useState(null);
    const [error, setError] = useState(null);
    const [expandedIds, setExpandedIds] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(null);
    const obrasFiltradas = obras ? filteredObras(obras, searchTerm, true) : [];
    const obrasEmOrdem = sortedObras(obrasFiltradas, sortField, sortDirection);

    /* Soma dos pesos de cada etapa da obra */
    const obrasAgrupadasPorContrato = obrasEmOrdem.reduce((acc, obra) => {
        if (!acc[obra.contrato]) {
            acc[obra.contrato] = [];
        }
        acc[obra.contrato].push(obra);
        return acc;
    }, {});

    const obrasComPesoTotal = Object.values(obrasAgrupadasPorContrato).map(obras => {
        const pesoPlanejadoTotal = obras.reduce((total, obra) => total + obra.peso_planejado, 0);
        const pesoProduzidoTotal = obras.reduce((total, obra) => total + obra.peso_produzido, 0);
        const pesoEmbarcadoTotal = obras.reduce((total, obra) => total + obra.peso_embarcado, 0);
        return { ...obras[0], pesoPlanejadoTotal, pesoProduzidoTotal, pesoEmbarcadoTotal };
    });

    /* Expandir etapas da obra */
    const handleExpandClick = (id) => {
        if (expandedIds.includes(id)) {
            setExpandedIds(expandedIds.filter(expandedId => expandedId !== id));
        } else {
            setExpandedIds([...expandedIds, id]);
        }
    }

    const handlePEPsClick = () => {
        setActiveTab('PEPs')
        navigate(`${Vars.PEP_PATH}${id}`);
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

    // Cor barra de progresso
    const getBarColor = (value1, value2) => {
        if (value1 - value2 >= 30) {
            return 'red';
        } else if (value1 - value2 <= 30 && value1 - value2 > 0) {
            return 'yellow';
        } else {
            return 'green';
        }
    };

    /* Lista zebrada */
    const rows = document.querySelectorAll('.obra-row');
    rows.forEach((row, index) => {
        if (index % 2 === 0) {
            row.style.backgroundColor = 'white';
            const additionalInfo = row.nextElementSibling;
            if (additionalInfo && additionalInfo.classList.contains('additional-info')) {
                additionalInfo.style.backgroundColor = 'white';
            }
        } else {
            row.style.backgroundColor = 'rgb(229, 232, 238)';
            const additionalInfo = row.nextElementSibling;
            if (additionalInfo && additionalInfo.classList.contains('additional-info')) {
                additionalInfo.style.backgroundColor = 'rgb(229, 232, 238)';
            }
        }
    });

    useEffect(() => {
        setActiveTab('ObraInfo');
        const fetchObras = async () => {
            try {
                const response = await fetch(`${Vars.SERVIDOR}pedidos/${id}/`);
                if (!response.ok) {
                    throw new Error(`Erro ao buscar os dados da obra: ${response.statusText}`);
                }
                const data = await response.json();
                setObra(data);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchObras();
    }, [id]);

    if (error) {
        return <p>Erro: {error}</p>;
    }

    if (!obras) {
        return <p>Carregando...</p>;
    }

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
                    <strong className='display-5'>Obra Info</strong>
                    <div className='barra-pesquisa'>
                        <strong className="mb-0">{obras[0].nome} | {obras[0].contrato}</strong>
                        <input type="text" placeholder="Pesquisar..." value={searchTerm} onChange={handleSearchChange} />
                    </div>
                </div>
                <hr />
                <div className="obra-row header">
                    <div className="obra-col" style={{ cursor: "default" }}>
                        <span>Nome</span>
                        <button onClick={() => handleSortChange('nome')}>
                            {sortField === 'nome' && sortDirection === 'asc' ? '▲' : '▼'}
                        </button>
                    </div>
                    <div className="obra-col">
                        <span>Pedido</span>
                        <button onClick={() => handleSortChange('pedido')}>
                            {sortField === 'pedido' && sortDirection === 'asc' ? '▲' : '▼'}
                        </button>
                    </div>
                    <div className="obra-col">
                        <span>Peso Planejado</span>
                        <button onClick={() => handleSortChange('peso_planejado')}>
                            {sortField === 'peso_planejado' && sortDirection === 'asc' ? '▲' : '▼'}
                        </button>
                    </div>
                    <div className="obra-col">
                        <span>Peso Produzido</span>
                        <button onClick={() => handleSortChange('peso_produzido')}>
                            {sortField === 'peso_produzido' && sortDirection === 'asc' ? '▲' : '▼'}
                        </button>
                    </div>
                    <div className="obra-col">
                        <span>Peso Embarcado</span>
                        <button onClick={() => handleSortChange('peso_embarcado')}>
                            {sortField === 'peso_embarcado' && sortDirection === 'asc' ? '▲' : '▼'}
                        </button>
                    </div>
                    <div className="obra-col">
                        <span>Última Atualização</span>
                        <button onClick={() => handleSortChange('ultima_atualizacao')}>
                            {sortField === 'ultima_atualizacao' && sortDirection === 'asc' ? '▲' : '▼'}
                        </button>
                    </div>
                </div>
                {obrasEmOrdem.map((obra) => (
                    <React.Fragment key={obra.id}>
                        <div
                            className={`obra-row ${expandedIds.includes(obra.id) ? "expanded" : ""}`}
                            key={obra.id}
                            onClick={() => handleExpandClick(obra.id)}
                            style={{ marginBottom: "0" }}
                        >
                            <div className="obra-col">
                                <p>{obra.nome}</p>
                            </div>
                            <div className="obra-col">
                                <p>{obra.pedido}</p>
                            </div>
                            <div className="obra-col">
                                <p>{obra.peso_planejado === null ? 0 : obra.peso_planejado}</p>
                            </div>
                            <div className="obra-col">
                                <p>{obra.peso_produzido === null ? 0 : obra.peso_produzido}</p>
                            </div>
                            <div className="obra-col">
                                <p>{obra.peso_embarcado === null ? 0 : obra.peso_embarcado}</p>
                            </div>
                            <div className="obra-col">
                                <p>{new Date(obra.ultima_atualizacao).toLocaleDateString('pt-BR')}</p>
                            </div>
                        </div>
                        <div
                            className={`additional-info ${expandedIds.includes(obra.id) ? "expanded" : ""}`}
                            style={{ marginTop: "0" }}
                        >
                            <hr style={{ margin: "0" }} />
                            <div className='obra-expanded'>
                                <div className='avancos'>
                                    <div><strong>Avanço Engenharia:</strong>
                                        <ProgressBar2 obra={obra} liberado={obra.liberado_engenharia} atraso={obra.atraso_engenharia} />
                                    </div>
                                    <div><strong>Avanço Fábrica:</strong>
                                        <ProgressBar2 obra={obra} liberado={obra.liberado_engenharia} atraso={obra.atraso_engenharia} />
                                    </div>
                                    <div><strong>Avanço Logística:</strong>
                                        <ProgressBar2 obra={obra} liberado={obra.liberado_engenharia} atraso={obra.atraso_engenharia} />
                                    </div>
                                    <div><strong>Avanço Montagem:</strong>
                                        <ProgressBar2 obra={obra} liberado={obra.liberado_engenharia} atraso={obra.atraso_engenharia} />
                                    </div>
                                </div>
                                <div className='atrasadas'>
                                    <div>
                                        <strong>Atrasadas Engenharia:</strong>
                                        <span>{obra.atraso_engenharia ? obra.atraso_engenharia : 0}</span>
                                    </div>
                                    <div>
                                        <strong>Atrasadas Fábrica:</strong>
                                        <span>{obra.atraso_fabrica ? obra.atraso_fabrica : 0}</span>
                                    </div>
                                    <div>
                                        <strong>Atrasadas Logística:</strong>
                                        <span>{obra.atraso_embarque ? obra.atraso_embarque : 0}</span>
                                    </div>
                                    <div>
                                        <strong>Atrasadas Montagem:</strong>
                                        <span>{obra.atraso_montagem ? obra.atraso_montagem : 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style={{ margin: "0px" }} />
                    </React.Fragment>
                ))}
                {obrasComPesoTotal.map((total, index) => (
                    <div key={index} className='obra-row header' style={{ cursor: "default" }}>
                        <div className='obra-col'>
                            <p>Total</p>
                        </div>
                        <div className='obra-col'>
                            <p></p>
                        </div>
                        <div className='obra-col'>
                            <p>{total.pesoPlanejadoTotal.toFixed(2)}</p>
                        </div>
                        <div className='obra-col'>
                            <p>{total.pesoProduzidoTotal.toFixed(2)}</p>
                        </div>
                        <div className='obra-col'>
                            <p>{total.pesoEmbarcadoTotal.toFixed(2)}</p>
                        </div>
                        <div className='obra-col'>
                            <p>{new Date(total.ultima_atualizacao).toLocaleDateString('pt-BR')}</p>
                        </div>
                    </div>
                ))}
            </div>
            <hr />
            <div>
                <EndButtons
                    activeTab={activeTab}
                    handlePEPsClick={handlePEPsClick}
                    handleCronogramaClick={handleCronogramaClick}
                    handlePecaProjetoClick={handlePecaProjetoClick}
                />
            </div>
            <br />
        </Main >
    );
}

export default ObraInfo;