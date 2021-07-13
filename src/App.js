import React from 'react';
import Header from './components/Header';
import axios from "axios";
import {Home} from "./pages/Home";
import {Route} from "react-router";
import {Favorites} from "./pages/Favorites";
import {Orders} from "./pages/Orders";
import Drawer from "./components/Drawer";

export const AppContext = React.createContext({})

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('')
    const [favorites, setFavorites] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    /* const getTotalPrice = () => cartItems.reduce((sum, obj) => obj.price + sum, 0)
     const getTotalTax = () => Math.floor(getTotalPrice(cartItems) * 0.95)*/


    React.useEffect(() => {

        async function fetchData() {
            try {
                const [{data: favoriteResponse}] = await Promise.all([axios.get('https://60e07aaa6b689e001788caa6.mockapi.io/favorites')])
                const cartResponse = await axios.get('https://60e07aaa6b689e001788caa6.mockapi.io/cart')
                const {data: itemResponse} = await axios.get('https://60e07aaa6b689e001788caa6.mockapi.io/items')

                setLoading(false)

                setCartItems(cartResponse.data)
                setFavorites(favoriteResponse)
                setItems(itemResponse)
            } catch (error) {
                alert('Ошибка при запросе данных')
            }


        }

        fetchData();

    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find(cartObj => Number(cartObj.parentId) === Number(obj.id))
            if (findItem) {
               setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://60e07aaa6b689e001788caa6.mockapi.io/cart/${findItem.id}`)
            } else {
                setCartItems((prev) => [...prev, obj]);
               const {data} =  await  axios.post('https://60e07aaa6b689e001788caa6.mockapi.io/cart', obj)
                setCartItems((prev) => prev.map(item => {
                    if(item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }));
            }
        } catch (error) {
            alert('Произошла ошибка')
        }

    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
                await axios.delete(`https://60e07aaa6b689e001788caa6.mockapi.io/favorites/${obj.id}`)
            } else {
                const {data} = await axios.post('https://60e07aaa6b689e001788caa6.mockapi.io/favorites', obj)
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в избранные')
        }
    };


    const getInputValue = (e) => {
        setInputValue(e.target.value)
    }

    const clearInputValue = () => {
        setInputValue('')
    }


    const onRemoveItem = (id) => {
       try {
           axios.delete(`https://60e07aaa6b689e001788caa6.mockapi.io/cart/${id}`)
           setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
       } catch (error) {
           alert('Произошла ошибка при удалении товара из корзины')
       }
    }

    const addedItems = (id) => {
        return cartItems.some(items => Number(items.parentId) === Number(id))

    }


    return (
        <AppContext.Provider value={{
            items,
            cartItems,
            favorites,
            addedItems,
            onAddToFavorite,
            setCartOpened,
            setCartItems,
            onAddToCart
        }}>
            <div className="wrapper clear">
                <div>
                    <Drawer onRemoveItem={onRemoveItem} items={cartItems} onClose={() => setCartOpened(false)}
                            opened={cartOpened}/>
                </div>
                <Header onClickCart={() => setCartOpened(true)}/>
                <Route path={'/'} exact>
                    <Home
                        items={items}
                        inputValue={inputValue}
                        favorites={favorites}
                        onAddToCart={onAddToCart}
                        getInputValue={getInputValue}
                        clearInputValue={clearInputValue}
                        cartItems={cartItems}
                        loading={loading}
                        onAddToFavorite={onAddToFavorite}
                    />
                </Route>
                <Route path={'/favorites'} exact>
                    <Favorites/>
                </Route>
                <Route path={'/orders'} exact>
                    <Orders/>
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
