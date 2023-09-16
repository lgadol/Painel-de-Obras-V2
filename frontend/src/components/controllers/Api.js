import * as Vars from '../Vars';

export const fetchPeps = async (id) => {
    try {
        const response = await fetch(`${Vars.SERVIDOR}peps/${id}/`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados da obra: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchPedidos = async (id) => {
    try {
        const response = await fetch(`${Vars.SERVIDOR}pedidos/${id}/`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados dos pedidos: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchPecas = async (id) => {
    try {
        const response = await fetch(`${Vars.SERVIDOR}pecas/${id}/`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados das peças: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchCronograma = async (id) => {
    try {
        const response = await fetch(`${Vars.SERVIDOR}cronograma/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados do cronograma: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}