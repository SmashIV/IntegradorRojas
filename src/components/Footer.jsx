import "../assets/css/footer.css"
import { img } from "../assets/imgs"
import 'remixicon/fonts/remixicon.css'

function Footer() {
    return (
        <div className="footer" id="footer">
            <div className="footer-contenido">
                <div className="footer-izq">
                    <img src={img.logo} alt="" />
                    <p>Texto de Prueba Footer Texto de Prueba Footer Texto de Prueba Footer Texto de Prueba Footer Texto de Prueba Footer Texto de Prueba Footer Texto de Prueba Footer</p>
                    <div className="footer-redes">
                        <i className="ri-facebook-fill"></i>
                        <i className="ri-twitter-x-line"></i>
                        <i className="ri-instagram-line"></i>
                    </div>
                </div>
                <div className="footer-centro">
                    <h2>Nuestra Empresa</h2>
                    <ul>
                        <li>Página Principal</li>
                        <li>Sobre Nosotros</li>
                        <li>Terminos y Condiciones</li>
                        <li>Políticas de Privacidad</li>
                    </ul>
                </div>
                <div className="footer-der">
                    <h2>Contacta con nosotros!</h2>
                    <ul>
                        <li>+51 999 222 333</li>
                        <li>rojasmarket@rojas.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copy">
                Derechos Reservados © Rojas Market - 2024 Ica - Perú
            </p>
        </div>
    )
}

export default Footer