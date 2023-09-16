import React, { useState, useEffect } from 'react';
import './Pages.css';
import Main from '../template/main';
import { useNavigate, useParams } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [obras, setObra] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState(null);

    const handleLogin = (username, password) => {
        // verificar se o login e a senha estão corretos
        if (username === 'usuário' && password === 'senha') {
            // redirecionar para a página /obras
            navigate('/obras');
        } else {
            return (
                <p>Erro</p>
            )
        }
    };

    useEffect(() => {
        setActiveTab('Login');

        const loginData = {
            username: 'usuário',
            password: 'senha'
        };

        setObra(loginData);
    }, [id]);

    if (error) {
        return <p>Erro: {error}</p>;
    }

    if (!obras) {
        return <p>Carregando...</p>;
    }

    return (
        <Main>
            <div className='login-box'>
                <style>{`
                    body { overflow: hidden;}
                    Main {
                    display: flex;
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                    margin-top: 100px;
                    }
            `}
                </style>
                <p className='login-tittle'>Login</p>
                <div className='login-div'>
                    <form onSubmit={handleLogin}>
                        <label>
                            <input
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder='MA'
                            />
                        </label>
                        <br />
                        <label>
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder='Senha'
                            />
                        </label>
                        <br />
                        <input type="submit" value="Entrar" />
                    </form>
                </div>
            </div>
        </Main>
    );
}
