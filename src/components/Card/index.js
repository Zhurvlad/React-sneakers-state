import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";
import {AppContext} from "../../App";
import {LoadingBlock} from "../LoadingBlock";

function Card({
                  id,

                  name,
                  img,
                  price,
                  onPlus,
                  onFavorite,
                  favorited = false,
                      loading = false}) {
    const {addedItems} = React.useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(favorited)
    const obj = {id, parentId:id, name, img, price}
    console.log(favorited)

    const onClickPlus = () => {
        onPlus(obj);

    };

    const addFavorite = () => {
        onFavorite(obj)
        setIsFavorite(!isFavorite)

    }

    return (
        <div className={styles.card}>
            {loading ? <LoadingBlock/>
                :
                <>
                    {onFavorite && <div className={styles.favorite} onClick={addFavorite}>
                        <img src={isFavorite ? 'img/heart-liked.svg' : 'img/heart-unliked.svg'} alt="Unliked"/>
                    </div>}
                    <img width={133} height={112} src={img} alt="Sneakers"/>
                    <h5>{name}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        { onPlus && <img
                            className={styles.plus}
                            onClick={onClickPlus}
                            src={addedItems(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                            alt="Plus"
                        />}
                    </div>
                </>}

        </div>
    );
}

export default Card;
