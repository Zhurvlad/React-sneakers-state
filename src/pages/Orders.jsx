import React from 'react';
import Card from "../components/Card";
import axios from "axios";
import {AppContext} from "../App";



export const Orders = ({}) => {
    const [orders, setOrders] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://60e07aaa6b689e001788caa6.mockapi.io/orders')
                /*setOrders(data.map((obj) => obj.items).flat())*/
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setLoading(false)
            } catch (error) {
                alert('Ошибка при запросе заказов')
            }
          })()
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
                <div className="search-block d-flex">
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {(loading ? [...Array(10)] : orders).map((item, id) => (
                    <Card
                        loading={loading}
                        {...item}
                        key={id}
                    />
                ))}
            </div>
        </div>
    );
};

