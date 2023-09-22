import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services";
import ItemList from "./ItemList";



const ItemListContainer = () => {
    const [items, setItems] = useState ([]);
    const [isLoading, setIsLoading] = useState (true);
    const {categoria} = useParams();
    
    useEffect (() => {
        
        setIsLoading (true);
        
        getProducts(categoria).then((response) => {
            setItems (response);
            setIsLoading (false);
        });
    }, [categoria]);

    return <ItemList items={items} isLoading={isLoading} categoria={categoria}/>;
};

export default ItemListContainer;