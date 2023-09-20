import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services";
import ItemDetail from "../ItemDetail/ItemDetail";
import CartContext from "../../context/CartContext";


const ItemDetailContainer = () => {

    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState (true);
    const {id} = useParams();

    const { addItem, reducir, incrementar, count} = useContext(CartContext);


    useEffect(() => {
        getProduct(id)
        .then((response) => {
            setItem(response);
        })
        .catch(() => {
            setItem(null);
        })
        .finally(() => {
            setIsLoading (false);
        })
    }, [id]);

    return <ItemDetail 
        item={item}
        isLoading={isLoading} 
        addItem={addItem} 
        reducir= {reducir} 
        incrementar = {incrementar}
        count= {count}
    />;
};

export default ItemDetailContainer;