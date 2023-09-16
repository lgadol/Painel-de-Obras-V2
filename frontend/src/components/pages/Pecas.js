import React, { useState, useEffect } from 'react';
import './Pages.css';
import Main from '../template/main';
import { useParams, useNavigate } from 'react-router-dom';
import * as Vars from '../Vars';
import { filteredPecas, sortedPecas } from '../controllers/FilterFunctions';
import EndButtons from '../controllers/EndButtons';
import { fetchPecas, fetchPedidos } from '../controllers/Api';

function Pecas() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { id } = useParams();
    const [pecas, setPecas] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [setError] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [activeTab, setActiveTab] = useState(null);
    const pecasFiltradas = pecas ? filteredPecas(pecas, searchTerm, true) : [];
    const pecasEmOrdem = sortedPecas(pecasFiltradas, sortField, sortDirection);

    const handleObraInfoClick = () => {
        setActiveTab('ObraInfo')
        navigate(`${Vars.OBRAINFO_PATH}${id}`);
    }
    const handlePEPsClick = () => {
        setActiveTab('PEPs')
        navigate(`${Vars.PEP_PATH}${id}`);
    }
    const handleCronogramaClick = () => {
        setActiveTab('Cronograma')
        navigate(`${Vars.CRONOGRAMA_PATH}${id}`);
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

    useEffect(() => {
        setActiveTab('Peças/Projetos');

        const fetchPecasData = async () => {
            try {
                const data = await fetchPecas(id);
                setPecas(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchPecasData();

        const fetchPedidosData = async () => {
            try {
                const data = await fetchPedidos(id);
                setPedidos(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchPedidosData();
    }, [id])

    return (
        <Main>
            <div>
                <div className='page-top'>
                    <strong className='display-5'>Peças</strong>
                    <div className='barra-pesquisa'>
                        <strong className="mb-0">{pedidos && pedidos[0] ? pedidos[0].nome : ''} | {pedidos && pedidos[0] ? pedidos[0].contrato : ''}</strong>
                        <input type="text" placeholder="Pesquisar..." value={searchTerm} onChange={handleSearchChange} />
                    </div>
                </div>
                <hr />
                <div style={{ width: '100%', overflowX: 'auto', maxHeight: '450px', overflowY: 'auto' }}>
                    <div className='my-page-content my-page-container-fluid'>
                        <div className="my-page-row my-page-header" style={{ position: 'sticky', top: 0 }}>
                            <div className="my-page-col">
                                <span>Pep</span>
                                <button onClick={() => handleSortChange('pep')}>
                                    {sortField === 'pep' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Descrição</span>
                                <button onClick={() => handleSortChange('descricao')}>
                                    {sortField === 'descricao' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Marca</span>
                                <button onClick={() => handleSortChange('marca')}>
                                    {sortField === 'marca' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Material</span>
                                <button onClick={() => handleSortChange('material')}>
                                    {sortField === 'material' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Fabricado</span>
                                <button onClick={() => handleSortChange('produzido')}>
                                    {sortField === 'produzido' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Embarcado</span>
                                <button onClick={() => handleSortChange('embarcado')}>
                                    {sortField === 'embarcado' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>N. Carga</span>
                                <button onClick={() => handleSortChange('carreta')}>
                                    {sortField === 'carreta' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Ordem</span>
                                <button onClick={() => handleSortChange('ordem')}>
                                    {sortField === 'ordem' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Qtd.Emb.</span>
                                <button onClick={() => handleSortChange('embarcado')}>
                                    {sortField === 'embarcado' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Peso Emb.</span>
                                <button onClick={() => handleSortChange('qtd')}>
                                    {sortField === 'qtd' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Qtd. Nec.</span>
                                <button onClick={() => handleSortChange('produzido')}>
                                    {sortField === 'produzido' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Peso Unit.</span>
                                <button onClick={() => handleSortChange('peso_tot')}>
                                    {sortField === 'peso_tot' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>St. Atualizado</span>
                                <button onClick={() => handleSortChange('ultima_consulta_sap')}>
                                    {sortField === 'atualizado_em' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Placa</span>
                                <button onClick={() => handleSortChange('placa')}>
                                    {sortField === 'placa' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Motorista</span>
                                <button onClick={() => handleSortChange('motorista')}>
                                    {sortField === 'motorista' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>St. SAP</span>
                                <button onClick={() => handleSortChange('status_sap')}>
                                    {sortField === 'status_sap' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                            <div className="my-page-col">
                                <span>Desenho</span>
                                <button onClick={() => handleSortChange('desenho')}>
                                    {sortField === 'desenho' && sortDirection === 'asc' ? '▲' : '▼'}
                                </button>
                            </div>
                        </div>
                        {pecasEmOrdem.map((pecas) => (
                            <div className="pecas-row" key={pecas.id}
                                style={{ cursor: "default", borderBottom: "1px solid lightgray" }}>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.pep}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.descricao}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.marca}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.material}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.produzido === 0 || pecas.produzido === null ? "NÃO" : "SIM"}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.embarcado === 0 || pecas.embarcado === null ? "NÃO" : "SIM"}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.carreta}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.ordem === null ? "-" : pecas.ordem}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.embarcado === null ? 0 : pecas.embarcado}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.qtd === null ? 0 : pecas.qtd}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.produzido === null ? 0 : pecas.produzido}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.peso_tot === null ? 0 : pecas.peso_tot}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{new Date(pecas.atualizado_em).toLocaleDateString('pt-BR')}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.placa === null ? "-" : pecas.placa}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.motorista === null ? "-" : pecas.motorista.toUpperCase()}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    <p>{pecas.status_sap === null ? "-" : pecas.status_sap}</p>
                                </div>
                                <div className="conteudo_pecas-col">
                                    {pecas.arquivo && pecas.arquivo.split('\\').length >= 4 ? (
                                        <a href={Vars.SERVIDOR_2 + "pdfs/" + pecas.arquivo.split('\\').slice(4).join('/')} download target="_blank" rel="noreferrer">
                                            <i className='fa fa-file-pdf-o'></i> {pecas.arquivo.split('\\').slice(5)}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <br />
            <div>
                <EndButtons
                    activeTab={activeTab}
                    handlePEPsClick={handlePEPsClick}
                    handleObraInfoClick={handleObraInfoClick}
                    handleCronogramaClick={handleCronogramaClick}
                />
            </div>
            <br />
        </Main >
    );
}

export default Pecas;