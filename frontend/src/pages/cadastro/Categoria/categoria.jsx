import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./categoria.module.css";

const CadastroCategoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState({ descricao: '' });
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:3001/categoria');
                const data = await response.json();
                setCategorias(data.categorias);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };
    
        fetchCategorias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        const categoriaData = { ...formData, dt_criacao: currentDate, dt_edicao: 'não editado' };
        try {
            const response = await fetch('http://localhost:3001/categoria', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoriaData)
            });
            if (response.ok) {
                const data = await response.json();
                setCategorias([...categorias, data]);
                setFormData({ descricao: '' });
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            } else {
                console.error("Erro ao cadastrar categoria");
            }
        } catch (error) {
            console.error("Erro ao cadastrar categoria:", error);
        }
    };

    const handleHome = () => {
        navigate('/home');
    };

    return (
        <div className={styles.app}>
            <div className={styles.cadastro}>
                <p>Categoria</p>
                <form method="post" onSubmit={handleSubmit}>
                    <div className={styles.spacer}>
                        <label htmlFor="descricao">Descrição</label>
                        <input className={styles.descricao} type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
                    </div>
                    <button type="submit" className={styles.bt}>Cadastrar</button>
                </form>
                <button className={`${styles.home} ${styles.bt}`} onClick={handleHome}>Home</button>
            </div>
            {showPopup && (
                <div className={styles.popup}>
                    <p>Categoria cadastrada com sucesso!</p>
                </div>
            )}
        </div>
    );
}

export default CadastroCategoria;
