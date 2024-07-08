import React from "react";
import styles from "./card_usuario.module.css";

const CardUsuarioComponent = ({ id, nome, sobrenome, onOpenModal }) => {
    return (
        <div id={styles.card}>
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.id_usuario} ${styles.list_item} ${styles.list_tittle}`}>{`Usuário ${id}`}</p>
                        <div id={styles.card_item}>
                            <p className={`${styles.nome_usuario} ${styles.list_item}`}>{nome}</p>
                            <p className={`${styles.sobrenome_usuario} ${styles.list_item}`}>{sobrenome}</p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={() => onOpenModal(id)}>VER MAIS</button>
            </div>
        </div>
    );
};

export default CardUsuarioComponent;
