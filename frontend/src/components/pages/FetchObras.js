import React, { useState, useEffect } from 'react';
import './Pages.css';
import Main from '../template/main';
import { useNavigate } from 'react-router-dom';
import * as Vars from '../Vars';
import { filteredObras, sortedObras } from '../controllers/FilterFunctions';
import ProgressBar from '../controllers/ProgressBar';

function FetchObras() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [obras, setObras] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedIds, setExpandedIds] = useState([]);
  const obrasFiltradas = filteredObras(obras, searchTerm);
  const obrasEmOrdem = sortedObras(obrasFiltradas, sortField, sortDirection);

  useEffect(() => {
    fetch(`${Vars.SERVIDOR}obras`)
      .then(response => response.json())
      .then(data => setObras(data));
  }, []);

  function handleButtonClick(event, id) {
    event.stopPropagation();
    setExpandedIds((prevExpandedIds) =>
      prevExpandedIds.includes(id)
        ? prevExpandedIds.filter((expandedId) => expandedId !== id)
        : [...prevExpandedIds, id]
    );
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

  const handleObraClick = (obraId) => {
    navigate(`/pedidos/${obraId}`);
  };

  return (
    <Main>
      <div className='page-top'>
        <strong className='display-5'>Lista de Obras</strong>
        <div className='barra-pesquisa'>
          <strong className="mb-0">Selecione uma Obra:</strong>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <hr></hr>
      <div className='content container-fluid'>
        <div className="row header" style={{
          position: "sticky",
          top: "0",
          zIndex: "1",
        }}>
          <div className="col">
            <span>Nome</span>
            <button onClick={() => handleSortChange('nome')}>
              {sortField === 'nome' && sortDirection === 'asc' ? '▲' : '▼'}
            </button>
          </div>
          <div className="col">
            <span>Contrato</span>
            <button onClick={() => handleSortChange('contrato')}>
              {sortField === 'contrato' && sortDirection === 'asc' ? '▲' : '▼'}
            </button>
          </div>
          <div className="col">
            <span>Peso</span>
            <button onClick={() => handleSortChange('peso_planejado')}>
              {sortField === 'peso_planejado' && sortDirection === 'asc' ? '▲' : '▼'}
            </button>
          </div>
          <div className="col">
            <span>Atualização</span>
            <button onClick={() => handleSortChange('ultima_atualizacao')}>
              {sortField === 'ultima_atualizacao' && sortDirection === 'asc' ? '▲' : '▼'}
            </button>
          </div>
          <div className="col">
            <span>Projetado</span>
            <button onClick={() => handleSortChange('liberado_engenharia')}>
              {sortField === 'liberado_engenharia' && sortDirection === 'asc' ? '▲' : '▼'}
            </button>
          </div>
          <div className="col">
            <span>Produzido</span>
            <button onClick={() => handleSortChange('total_produzido')}>
              {sortField === 'total_produzido' && sortDirection === 'asc' ? '▲' : '▼'}
            </button>
          </div>
          <div className="col">
            <span>Embarcado</span>
            <button onClick={() => handleSortChange('total_embarcado')}>
              {sortField === 'total_embarcado' && sortDirection === 'asc' ? '▲' : '▼'}
            </button>
          </div>
          <div className="col">
            <span>Montado</span>
            <button onClick={() => handleSortChange('total_montado')}>
              {sortField === 'total_montado' && sortDirection === 'asc' ? '▲' : '▼'}
            </button>
          </div>
          <div className="col">
            <span>Excel</span>
          </div>
        </div>
        {obrasEmOrdem.map((obra, index) => (
          <div className="row" key={index} onClick={() => handleObraClick(obra.contrato)}>
            <div className="col" style={{ position: 'relative' }}>
              {/* Botão responsivo para expandir informações */}
              <button
                className="show-button expand-button"
                style={{ position: 'absolute', left: 0, }}
                onClick={(event) => handleButtonClick(event, obra.id)}
              >
                +
              </button>
              <p style={{ padding: "0px 30px" }}>{obra.nome}</p>
            </div>
            <div className="col">
              <p style={{ padding: "0px 30px" }}>{obra.contrato}</p>
            </div>
            <div className="col">
              <p>{obra.peso_planejado}</p>
            </div>
            <div className="col">
              <p>{new Date(obra.ultima_atualizacao).toLocaleDateString('pt-BR')}</p>
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
            <div className="col" onClick={(event) => event.stopPropagation()}>
              <a className='fa fa-download' href={`${Vars.EXCEL_DOWNLOAD_PATH}${obra.pedido_principal.slice(0, 9)}`}>
              </a>
            </div>
            <hr style={{ margin: "0px" }} />
            {/* Informações expandidas pelo expand-button */}
            {expandedIds.includes(obra.id) && (
              <div className='fetchObras-expanded' onClick={(event) => event.stopPropagation()}>
                Excel: <a className='fa fa-download'
                  href={`${Vars.EXCEL_DOWNLOAD_PATH}${obra.pedido_principal.slice(0, 9)}`}>
                </a>
                <p className='contrato-expanded'>Contrato: {obra.contrato}</p>
                <p className='peso-expanded'>Peso: {obra.peso_planejado}</p>
                <p className='att-expanded'>Atualização: {new Date(obra.ultima_atualizacao).toLocaleDateString('pt-BR')}</p>
                <div className="progress-container">
                  <p>Projetado:</p>
                  <div className="expanded-bar" style={{ position: 'relative' }}>
                    <div
                      className="expanded-bar-inner"
                      style={{
                        width: `${obra.liberado_engenharia != null ? obra.liberado_engenharia : 0}%`,
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                      }}
                    >
                      {obra.liberado_engenharia ? `${obra.liberado_engenharia}%` : '0%'}
                    </span>
                  </div>
                </div>
                <div className="progress-container">
                  <p>Produzido:</p>
                  <div className="expanded-bar" style={{ position: 'relative' }}>
                    <div
                      className="expanded-bar-inner"
                      style={{
                        width: `${obra.total_produzido != null ? obra.total_produzido : 0}%`,
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                      }}
                    >
                      {obra.total_produzido ? `${obra.total_produzido}%` : '0%'}
                    </span>
                  </div>
                </div>
                <div className="progress-container">
                  <p>Embarcado:</p>
                  <div className="expanded-bar" style={{ position: 'relative' }}>
                    <div
                      className="expanded-bar-inner"
                      style={{
                        width: `${obra.total_embarcado != null ? obra.total_embarcado : 0}%`,
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                      }}
                    >
                      {obra.total_embarcado ? `${obra.total_embarcado}%` : '0%'}
                    </span>
                  </div>
                </div>
                <div className="progress-container">
                  <p>Montado:</p>
                  <div className="expanded-bar" style={{ position: 'relative' }}>
                    <div
                      className="expanded-bar-inner"
                      style={{
                        width: `${obra.total_montado != null ? obra.total_montado : 0}%`,
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                      }}
                    >
                      {obra.total_montado ? `${obra.total_montado}%` : '0%'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <br />
    </Main>
  );
}

export default FetchObras;