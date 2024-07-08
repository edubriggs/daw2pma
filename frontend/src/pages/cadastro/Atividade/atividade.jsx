import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./atividade.module.css";

const CadastroAtividade = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState({ descricao: '', dt_final: '', categoria_id: '', usuario_id: '' });
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
        
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:3001/categoria');
                const data = await response.json();
                setCategorias(data.categorias);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };

        fetchUsuarios();
        fetchCategorias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        const atividadeData = { ...formData, dt_inicial: currentDate };
        try {
            const response = await fetch('http://localhost:3001/atividade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(atividadeData)
            });
            if (response.ok) {
                const data = await response.json();
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
                setFormData({ descricao: '', dt_final: '', categoria_id: '', usuario_id: '' });
            } else {
                console.error("Erro ao cadastrar atividade");
            }
        } catch (error) {
            console.error("Erro ao cadastrar atividade:", error);
        }
    };

    const handleHome = () => {
        navigate('/home');
    };

    return (
        <div id={styles.app}>
            <div id={styles.cadastro}>
                <p>Atividade</p>
                <form method="post" onSubmit={handleSubmit}>
                    <div className={styles.spacer}>
                        <label htmlFor="descricao">Descrição</label>
                        <input id={styles.descricao} type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
                    </div>
                    <div className={styles.spacer}>
                        <label htmlFor="dt_final">Data Final</label>
                        <input id={styles.dt_final} type="date" name="dt_final" value={formData.dt_final} onChange={handleChange} />
                    </div>
                    <div className={styles.spacer}>
                        <label htmlFor="categoria_id">Categoria</label>
                        <select id={styles.categoria_id} name="categoria_id" value={formData.categoria_id} onChange={handleChange}>
                            <option value="">Selecione uma categoria</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>{`Categoria ${categoria.id}`}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.spacer}>
                        <label htmlFor="usuario_id">Usuário</label>
                        <select id={styles.usuario_id} name="usuario_id" value={formData.usuario_id} onChange={handleChange}>
                            <option value="">Selecione um usuário</option>
                            {usuarios.map(usuario => (
                                <option key={usuario.id} value={usuario.id}>{`${usuario.nome} ${usuario.sobrenome} id ${usuario.id}`}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className={styles.bt}>Cadastrar</button>
                </form>
                <button className={`${styles.home} ${styles.bt}`} onClick={handleHome}>Home</button>
            </div>
            {showPopup && (
                <div className={styles.popup}>
                    <p>Atividade cadastrada com sucesso!</p>
                </div>
            )}
        </div>
    );
}

export default CadastroAtividade;
