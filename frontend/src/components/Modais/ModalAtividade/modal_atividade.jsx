import React, { useState, useEffect } from "react";
import styles from "./modal_atividade.module.css";

const ModalAtividadeComponent = ({ id, onClose }) => {
    const [atividade, setAtividade] = useState({ descricao: '', dt_final: '', categoria_id: '', usuario_id: '' });
    const [categorias, setCategorias] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);

    useEffect(() => {
        const fetchAtividade = async () => {
            try {
                const response = await fetch(`http://localhost:3001/atividade/${id}`);
                const data = await response.json();
                setAtividade(data);
            } catch (error) {
                console.error("Erro ao buscar atividade:", error);
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
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:3001/usuario');
                const data = await response.json();
                setUsuarios(data.usuarios);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchAtividade();
        fetchCategorias();
        fetchUsuarios();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAtividade({ ...atividade, [name]: value });
    };

    const handleEditar = async () => {
        try {
            const response = await fetch(`http://localhost:3001/atividade/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(atividade)
            });
            if (response.ok) {
                setShowEditSuccess(true);
                setTimeout(() => {
                    setShowEditSuccess(false);
                    onClose();
                }, 3000);
            } else {
                console.error("Erro ao editar atividade");
            }
        } catch (error) {
            console.error("Erro ao editar atividade:", error);
        }
    };

    const handleRemover = async () => {
        try {
            const response = await fetch(`http://localhost:3001/atividade/${id}`, {
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
                console.error("Erro ao remover atividade");
            }
        } catch (error) {
            console.error("Erro ao remover atividade:", error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const isFormValid = atividade.descricao.trim() !== ''

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <label>Descrição</label>
                <input type="text" name="descricao" value={atividade.descricao} onChange={handleChange} />
                <label>Data Final</label>
                <input type="date" name="dt_final" value={atividade.dt_final} onChange={handleChange} />
                <label>Categoria</label>
                <select name="categoria_id" value={atividade.categoria_id} onChange={handleChange}>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{`Categoria ${categoria.id}`}</option>
                    ))}
                </select>
                <label>Usuário</label>
                <select name="usuario_id" value={atividade.usuario_id} onChange={handleChange}>
                    {usuarios.map(usuario => (
                        <option key={usuario.id} value={usuario.id}>{`${usuario.nome} ${usuario.sobrenome} id ${usuario.id}`}</option>
                    ))}
                </select>
                <div className={styles.buttonContainer}>
                    <button className={styles.editButton} onClick={handleEditar} disabled={!isFormValid}>Editar</button>
                    <button className={styles.removeButton} onClick={handleRemover}>Remover</button>
                </div>
            </div>
            {showEditSuccess && (
                <div className={styles.successModal}>
                    <p>Atividade editada com sucesso!</p>
                </div>
            )}
            {showRemoveSuccess && (
                <div className={styles.successModal}>
                    <p>Atividade removida com sucesso!</p>
                </div>
            )}
        </div>
    );
};

export default ModalAtividadeComponent;
