import React from 'react';
import Card from "../components/Card";
import {AppContext} from "../App";



export const Favorites = ({}) => {
    const {favorites, onAddToFavorite} = React.useContext(AppContext)

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Избранные</h1>
                <div className="search-block d-flex">
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {favorites && favorites.map((obj, id) =>
                    <Card
                        {...obj}
                        key={obj+id}
                        onFavorite={onAddToFavorite}
                    />
                )}
            </div>
        </div>
    );
};

