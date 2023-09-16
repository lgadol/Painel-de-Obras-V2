/* Função que faz o filtro de caixa de pesquisa */
export const filteredObras = (obras, searchTerm, includeNome = true) =>
  obras.filter((obra) => {
    /* Aba FetchObras */
    if (
      (includeNome && obra.nome && typeof obra.nome === 'string' && obra.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (obra.contrato && typeof obra.contrato === 'string' && obra.contrato.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (obra.peso_planejado && typeof obra.peso_planejado === 'string' && obra.peso_planejado.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (obra.pep && typeof obra.pep === 'string' && obra.pep.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return true;
    }

    /* Aba ObraInfo */
    if (
      (obra.pedido && typeof obra.pedido === 'string' && obra.pedido.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (obra.peso_planejado && typeof obra.peso_planejado === 'string' && obra.peso_planejado.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (obra.peso_produzido && typeof obra.peso_produzido === 'string' && obra.peso_produzido.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (obra.peso_embarcado && typeof obra.peso_embarcado === 'string' && obra.peso_embarcado.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return true;
    }

    return false;
  });

export const sortedObras = (filteredObras, sortField, sortDirection) => filteredObras.sort((a, b) => {
  if (a[sortField] < b[sortField]) {
    return sortDirection === 'asc' ? -1 : 1;
  } else if (a[sortField] > b[sortField]) {
    return sortDirection === 'asc' ? 1 : -1;
  } else {
    return 0;
  }
});

export const sortedPecas = (filteredPecas, sortField, sortDirection) => filteredPecas.sort((a, b) => {
  if (a[sortField] < b[sortField]) {
    return sortDirection === 'asc' ? -1 : 1;
  } else if (a[sortField] > b[sortField]) {
    return sortDirection === 'asc' ? 1 : -1;
  } else {
    return 0;
  }
});

export const filteredPecas = (pecas, searchTerm, includeNome = true) =>
  pecas.filter((peca) => {

    if (
      (includeNome && peca.pep && typeof peca.pep === 'string' && peca.pep.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.material && typeof peca.material === 'string' &&  peca.material.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.marca && typeof peca.marca === 'string' && peca.marca.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.qtd && typeof peca.qtd === 'string' && peca.qtd.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.qtd_embarque && typeof peca.qtd_embarque === 'string' && peca.qtd_embarque.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.peso_tot && typeof peca.peso_tot === 'string' && peca.peso_tot.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.qtd_a_embarcar && typeof peca.qtd_a_embarcar === 'string' && peca.qtd_a_embarcar.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.produzido && typeof peca.produzido === 'string' && peca.produzido.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.embarcado && typeof peca.embarcado === 'string' && peca.embarcado.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.descricao && typeof peca.descricao === 'string' && peca.descricao.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.carreta && typeof peca.carreta === 'string' && peca.carreta.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.ordem && typeof peca.ordem === 'string' && peca.ordem.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.placa && typeof peca.placa === 'string' && peca.placa.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.motorista && typeof peca.motorista === 'string' && peca.motorista.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.atualizado_em && typeof peca.atualizado_em === 'string' && peca.atualizado_em.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (peca.status_sap && typeof peca.status_sap === 'string' && peca.status_sap.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return true;
    }

    return false;
  });