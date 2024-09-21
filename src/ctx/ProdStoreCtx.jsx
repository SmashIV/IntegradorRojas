/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { lista_productos } from "../assets/imgs";

export const ProdStoreCtx = createContext(null);

export const ProdStoreCtxProvider = (props) => {

    const [prodCarrito, setProdCarrito] = useState({});

    /*Funcion para poder agregar productos al carrito, el nombre puede ser confuso xD*/ 
    const agregarCarrito = (prodId) => {
        if (!prodCarrito[prodId]) {
            setProdCarrito((prev) => ({...prev,[prodId]:1}))
        } else {
            setProdCarrito((prev) => ({...prev,[prodId]:prev[prodId]+1}))
        }
    }
    /*Funcion para eliminar productos al carrito*/ 
    const eliminarCarrito = (prodId) => {
        setProdCarrito((prev) => ({...prev, [prodId]:prev[prodId]-1}))
    }

    useEffect(() => {
        console.log(prodCarrito)
    }, [prodCarrito])

    const obtenerTotal = () => {
        let montoTotal = 0;
        for (const prodItem in prodCarrito) {
            if (prodCarrito[prodItem] > 0) {
                let prodInfo = lista_productos.find((producto) => producto._id === prodItem);
                montoTotal += prodInfo.precio * prodCarrito[prodItem];
            }
        }
        return montoTotal;
    }

    const valorContext = {
        lista_productos,
        prodCarrito,
        setProdCarrito,
        agregarCarrito,
        eliminarCarrito,
        obtenerTotal
    };

    return (
        <ProdStoreCtx.Provider value={valorContext}>
            {props.children}
        </ProdStoreCtx.Provider>
    );
};
