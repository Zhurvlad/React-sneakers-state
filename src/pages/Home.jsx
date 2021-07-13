import React from 'react';
import Card from "../components/Card";



export const Home = ({
                         items,
                         inputValue,
                         clearInputValue,
                         getInputValue,
                         onAddToCart,
                         loading,
                         onAddToFavorite
                     }) => {


    const renderBlock = () => {
        const filterItems = items.filter((item) => item.name.toLowerCase().includes(inputValue.toLocaleString()))
        return (loading ? [...Array(10)] : filterItems).map((item, id) => (
                <Card
                    loading={loading}
                    {...item}
                    key={item + id}
                    onPlus={(obj) => onAddToCart(obj)}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    favorited={false}
                />
            ))

    }

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{inputValue ? `Поиск по запросу: ${inputValue}` : 'Все кросовки'}</h1>
                <div className="search-block d-flex">
                    {inputValue &&
                    <img onClick={clearInputValue} className="cu-p clear" src="img/btn-remove.svg" alt="Close"/>}
                    <input placeholder="Поиск..." value={inputValue} onChange={getInputValue}/>
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderBlock()}
            </div>
        </div>
    );
};

