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

    const [talle, setTalle] = useState('');

    // const [talle, setTalle] = useState([
    //     {s: " ", cant: 0},
    //     {m: " ", cant: 0},
    //     {l: " ", cant: 0},
    //     {xl: " ", cant: 0}    
    // ]);

    // const toggleTalle = (valor, cant) => {
    //     console.log("handleToggle", valor);
    //     const prueba = {...talle[0]};
    //     console.log("Talle", prueba);
    //     switch (valor){
    //         case "S":
    //             setTalle({...talle[0], s: valor, cant: talle.cant + cant});
    //             break;
    //         case "M":
    //             setTalle({...talle[1], m: valor, cant: talle.cant + cant});
    //             break;
    //         case "L":
    //             setTalle({...talle[2], l: valor, cant: talle.cant + cant});
    //             break;
    //         case "XL":
    //             setTalle({...talle[3], xl: valor, cant: talle.cant + cant});
    //             break;
    //         default:
    //             break;
    //     }
    //     //setTalle(valor);
    //     console.log ("Talle:", talle);
    // };

    const toggleTalle = (valor) => {
        setTalle(valor);
    };


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
        toggleTalle={toggleTalle}
        talle={talle}
    />;
};

export default ItemDetailContainer;