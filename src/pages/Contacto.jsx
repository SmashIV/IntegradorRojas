import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css"
import "../assets/css/contacto.css";

mapboxgl.accessToken = 'pk.eyJ1Ijoic21hc2hpdiIsImEiOiJjbTFlNmVhd2UwZjZ3MnBxOWdqaHI4N2M1In0.Dnz43U7013-WNeJYu1_D2g';

function Contacto() {
    useEffect(() => {
        const mapa = new mapboxgl.Map({
            container: 'mapa',
            style: 'mapbox://styles/mapbox/streets-v11', // Cambiar a un estilo más claro si es necesario
            center: [-75.72836903100165, -14.061310304004293], // Coordenadas para centrar el mapa
            zoom: 13,
        });

        const locales = [
            { long: -75.72836903100165, lat: -14.061310304004293, desc: 'Rojas Market Castrovirreyna' },
            { long: -75.72644, lat: -14.07970, desc: 'Rojas Market Santa Rosa de Palmar' },
            { long: -75.72516, lat: -14.07507, desc: 'Rojas Market Juan Pablo Fernandini' }
        ];

        locales.forEach(local => {
            console.log(local)
            new mapboxgl.Marker()
                .setLngLat([local.long, local.lat])
                .setPopup(new mapboxgl.Popup().setText(local.desc))
                .addTo(mapa);
        });

        const handleResize = () => {
            mapa.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            mapa.remove();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="contacto-view">
            <div className="contacto-header">
                <div className="contacto-titulo">
                    <a className="estrella-icono" href="">
                        <img src="" alt="" />
                    </a>
                    <h1>¡Conoce nuestros
                        <span> 3 locales!</span>
                    </h1>
                </div>
            </div>
            <div className="contacto-main">
                <p>Descubre las mejores opciones para poder comprar tus productos al mejor precio, visitanos ahora mismo.</p>
                <div className="contacto-contenedor">
                    <div className="lista-contenedor">
                        <ol className="indiv-lista">
                            <li className="lista">
                                <article className="lista-articulo">
                                    <div className="lista-info">
                                        <a href="">
                                            <h2 className="lista-info-texto">1. Rojas Market Castrovirreyna</h2>
                                        </a>
                                        <p className="lista-calificacion">
                                            <span>4.9</span>
                                            <span className="lista-rating">
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStarHalfAlt} />
                                            </span>
                                        </p>
                                        <p className='lista-descripcion'>
                                            El local se encuentra en ...... Calle ......., en este establecimiento contamos con ....... y .........
                                        </p>
                                    </div>
                                    <div className="lista-img">
                                        <img src="/src/assets/img/castrovirreyna.jpg" alt="" />
                                    </div>
                                </article>
                                <div className="award-icono">
                                    <span>1</span>
                                </div>
                            </li>
                            <li className="lista">
                                <article className="lista-articulo">
                                    <div className="lista-info">
                                        <a href="">
                                            <h2 className="lista-info-texto">2. Rojas Market Santa Rosa de Palmar</h2>
                                        </a>
                                        <p className="lista-calificacion">
                                            <span>4.6</span>
                                            <span className="lista-rating">
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStarHalfAlt} />
                                            </span>
                                        </p>
                                        <p className='lista-descripcion'>
                                            El local se encuentra en ...... Calle ......., en este establecimiento contamos con ....... y .........
                                        </p>
                                    </div>
                                    <div className="lista-img">
                                        <img src="/src/assets/img/santa_rosa.jpg" alt="" />
                                    </div>
                                </article>
                                <div className="award-icono">
                                    <span>2</span>
                                </div>
                            </li>
                            <li className="lista">
                                <article className="lista-articulo">
                                    <div className="lista-info">
                                        <a href="">
                                            <h2 className="lista-info-texto">3. Rojas Market Juan Pablo Fernandini</h2>
                                        </a>
                                        <p className="lista-calificacion">
                                            <span>4.9</span>
                                            <span className="lista-rating">
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStarHalfAlt} />
                                            </span>
                                        </p>
                                        <p className='lista-descripcion'>
                                            El local se encuentra en ...... Calle ......., en este establecimiento contamos con ....... y .........
                                        </p>
                                    </div>
                                    <div className="lista-img">
                                        <img src="/src/assets/img/fernandini.jpg" alt="" />
                                    </div>
                                </article>
                                <div className="award-icono">
                                    <span>3</span>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <div className="mapa-contenedor">
                        <div id="mapa" className='mapa'></div>
                    </div>
                </div>
            </div>
            <div className="tab-bar-movil">
                <button className="tab-lista">
                    <i></i> Lista
                </button>
                <button className="tab-lista">
                    <i></i> Mapa
                </button>
            </div>
        </div>
    );
}

export default Contacto;