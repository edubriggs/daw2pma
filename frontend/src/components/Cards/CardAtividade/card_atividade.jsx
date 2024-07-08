import React from "react";
import styles from "./card_atividade.module.css";

const CardAtividadeComponent = ({ id, usuario_nome, categoria_id, onOpenModal }) => {
    return (
        <div id={styles.card}>
            <div id={styles.fundo}>
                <ul className={styles.lista_ul}>
                    <li className={styles.list_item}>
                        <p className={`${styles.id_atividade} ${styles.list_item} ${styles.list_tittle}`}>{`Atividade ${id}`}</p>
                        <div id={styles.card_item}>
                            <p className={`${styles.usuario_nome_atividade} ${styles.list_item}`}>{usuario_nome}</p>
                            <p className={`${styles.categoria_id_atividade} ${styles.list_item}`}>{categoria_id}</p>
                        </div>
                    </li>
                </ul>
                <button id={styles.button_card} onClick={() => onOpenModal(id)}>VER MAIS</button>
            </div>
        </div>
    );
};

export default CardAtividadeComponent;
