import React, { useState, useEffect } from "react";
import styles from "./modal_categoria.module.css";

const ModalCategoriaComponent = ({ id, onClose }) => {
    const [categoria, setCategoria] = useState({ descricao: '', dt_criacao: '', dt_edicao: '' });
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await fetch(`http://localhost:3001/categoria/${id}`);
                const data = await response.json();
                setCategoria(data);
            } catch (error) {
                console.error("Erro ao buscar categoria:", error);
            }
        };
        fetchCategoria();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria({ ...categoria, [name]: value });
    };

    const handleEditar = async () => {
        if (!categoria.descricao) {
            alert("O campo descrição não pode estar vazio.");
            return;
        }
        
        const updatedCategoria = { ...categoria, dt_edicao: new Date().toISOString().split('T')[0] };
        try {
            const response = await fetch(`http://localhost:3001/categoria/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCategoria)
            });
            if (response.ok) {
                setShowEditSuccess(true);
                setTimeout(() => {
                    setShowEditSuccess(false);
                    onClose();
                }, 3000);
            } else {
                console.error("Erro ao editar categoria");
            }
        } catch (error) {
            console.error("Erro ao editar categoria:", error);
        }
    };

    const handleRemover = async () => {
        try {
            const response = await fetch(`http://localhost:3001/categoria/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                setShowRemoveSuccess(true);
                setTimeout(() => {
                    setShowRemoveSuccess(false);
                    onClose();
                }, 3000);
            } else {
                console.error("Erro ao remover categoria");
            }
        } catch (error) {
            console.error("Erro ao remover categoria:", error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const isFormValid = categoria.descricao.trim() !== '';

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <label>Descrição</label>
                <input type="text" name="descricao" value={categoria.descricao} onChange={handleChange} />
                <label>Data de Criação</label>
                <input type="text" name="dt_criacao" value={categoria.dt_criacao} onChange={handleChange} disabled />
                <label>Data de Edição</label>
                <input type="text" name="dt_edicao" value={categoria.dt_edicao} onChange={handleChange} disabled />
                <div className={styles.buttonContainer}>
                    <button className={styles.editButton} onClick={handleEditar} disabled={!isFormValid}>Editar</button>
                    <button className={styles.removeButton} onClick={handleRemover}>Remover</button>
                </div>
            </div>
            {showEditSuccess && (
                <div className={styles.successModal}>
                    <p>Categoria editada com sucesso!</p>
                </div>
            )}
            {showRemoveSuccess && (
                <div className={styles.successModal}>
                    <p>Categoria removida com sucesso!</p>
                </div>
            )}
        </div>
    );
};

export default ModalCategoriaComponent;

