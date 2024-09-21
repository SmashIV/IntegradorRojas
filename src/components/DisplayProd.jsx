/* eslint-disable react/prop-types */
import { useContext } from "react"
import "../assets/css/displayProd.css"
import { ProdStoreCtx } from "../ctx/ProdStoreCtx"
import Producto from "./Producto"
function DisplayProd({categorias}) {
    
    const {lista_productos} = useContext(ProdStoreCtx)
    
    return (
        <div className="dis-prod" id="dis-prod">
            <h2>Productos Recomendados</h2>
            <div className="dis-lista">
                {lista_productos.map((prod, index) => {
                    if (categorias ==="Todos los productos" || categorias===prod.categoria) {
                        return <Producto key={index} id={prod._id} nombre={prod.nombre} descripcion={prod.descripcion} precio={prod.precio} imagen={prod.imagen}/>
                    }
                }
                )}
            </div>
        </div>
    )
}

export default DisplayProd