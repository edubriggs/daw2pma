import React, { useState, useEffect } from "react";
import styles from "./modal_usuario.module.css";

const ModalUsuarioComponent = ({ id, onClose }) => {
    const [usuario, setUsuario] = useState({ nome: '', sobrenome: '', senha: '' });
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await fetch(`http://localhost:3001/usuario/${id}`);
                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        };
        fetchUsuario();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleEditar = async () => {
        try {
            const response = await fetch(`http://localhost:3001/usuario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            if (response.ok) {
                setShowEditSuccess(true);
                setTimeout(() => {
                    setShowEditSuccess(false);
                    onClose();
                }, 3000);
            } else {
                console.error("Erro ao editar usuário");
            }
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
        }
    };

    const handleRemover = async () => {
        try {
            const response = await fetch(`http://localhost:3001/usuario/${id}`, {
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
                console.error("Erro ao remover usuário");
            }
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const isFormValid = usuario.nome.trim() !== '' && usuario.sobrenome.trim() !== '' && usuario.senha.trim() !== '';

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <label>Nome</label>
                <input type="text" name="nome" value={usuario.nome} onChange={handleChange} />
                <label>Sobrenome</label>
                <input type="text" name="sobrenome" value={usuario.sobrenome} onChange={handleChange} />
                <label>Senha</label>
                <input type="text" name="senha" value={usuario.senha} onChange={handleChange} />
                <div className={styles.buttonContainer}>
                    <button className={styles.editButton} onClick={handleEditar} disabled={!isFormValid}>Editar</button>
                    <button className={styles.removeButton} onClick={handleRemover}>Remover</button>
                </div>
            </div>
            {showEditSuccess && (
                <div className={styles.successModal}>
                    <p>Usuário editado com sucesso!</p>
                </div>
            )}
            {showRemoveSuccess && (
                <div className={styles.successModal}>
                    <p>Usuário removido com sucesso!</p>
                </div>
            )}
        </div>
    );
};

export default ModalUsuarioComponent;

