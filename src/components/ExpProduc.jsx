import PropTypes from 'prop-types';
import { productos_menu } from "../assets/imgs";
import "../assets/css/expProd.css";

function ExpProduc({ categorias, setCategorias }) {
    return (
        <div className="exp-prod" id="exp-prod">
            <h1>¡Explora todos nuestros productos!</h1>
            <p className="exp-texto">Puedes escoger entre una diversa selección de productos, ofrecemos los mejores productos con una calidad incomparable.
            </p>
            <div className="exp-prod-lista">
                {productos_menu.map((prod, index) => {
                    return (
                        <div onClick={() => setCategorias(prev => prev === prod.nombre_prod ? "Todos los productos" : prod.nombre_prod)} key={index} className="exp-prod-item">
                            <img className={categorias === prod.nombre_prod ? "active" : ""} src={prod.img_prod} alt={prod.nombre_prod} />
                            <p>{prod.nombre_prod}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

ExpProduc.propTypes = {
    categorias: PropTypes.string.isRequired,
    setCategorias: PropTypes.func.isRequired,
};

export default ExpProduc;