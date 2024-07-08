import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./usuario.module.css";

const CadastroUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [formData, setFormData] = useState({ nome: '', sobrenome: '', senha: '' });
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:3001/usuario');
                const data = await response.json();
                setUsuarios(data.usuarios);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
    
        fetchUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                setUsuarios([...usuarios, data]);
                setFormData({ nome: '', sobrenome: '', senha: '' });
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            } else {
                console.error("Erro ao cadastrar usuário");
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    };

    const handleHome = () => {
        navigate('/home');
    };

    return (
        <div id={styles.app}>
            <div id={styles.cadastro}>
                <p>Usuário</p>
                <form method="post" onSubmit={handleSubmit}>
                    <div className={styles.spacer}>
                        <label htmlFor="nome">Nome</label>
                        <input id={styles.nome} type="text" name="nome" value={formData.nome} onChange={handleChange} required/>
                    </div>
                    <div className={styles.spacer}>
                        <label htmlFor="sobrenome">Sobrenome</label>
                        <input id={styles.sobrenome} type="text" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required/>
                    </div>
                    <div className={styles.spacer}>
                        <label htmlFor="senha">Senha</label>
                        <input id={styles.senha} type="password" name="senha" value={formData.senha} onChange={handleChange} required/>
                    </div>
                    <button type="submit" className={styles.bt}>Cadastrar</button>
                </form>
                <button className={`${styles.home} ${styles.bt}`} onClick={handleHome}>Home</button>
            </div>
            {showPopup && (
                <div className={styles.popup}>
                    <p>Usuário cadastrado com sucesso!</p>
                </div>
            )}
        </div>
    );
}

export default CadastroUsuario;
