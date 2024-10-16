import '../assets/css/usuarioview.css'

function UsuarioView() {
    return (
        <div className="contenedor-usuario">
            <div className="sidebar">
                <ul>
                    <li>
                        Detalles de la cuenta
                    </li>
                    <li>
                        Pedidos Realizados
                    </li>
                    <li>
                        Preferencias
                    </li>
                </ul>
            </div>
            <div className="formulario-usuario">
                <h2>Detalle de la cuenta</h2>
                <form className='usuario-form'>
                    <label className='usuario-label'>
                        <span>Nombres</span>
                        <input className='usuario-input' type="text" placeholder="Rodrigo"/>
                    </label>
                    <label className='usuario-label'>
                        <span>Apellidos</span>
                        <input className='usuario-input' type="text" placeholder="Huatangari Navarrete"/>
                    </label>
                    <label className='usuario-label'>
                        <span>Tipos de Documento</span>
                        <select className='usuario-select'>
                            <option>DNI</option>
                            <option>Pasaporte</option>
                        </select>
                    </label>
                    <label className='usuario-label'>
                        <span>Numero de Documento</span>
                        <input className='usuario-input' type="text" placeholder="1234578" disabled/>
                    </label>
                    <label className='usuario-label'>
                        <span>Contraseña</span>
                        <input className='usuario-input' type="password" value="12345678" disabled />
                        <a className='edit-formulario' href="*">Editar</a>
                    </label>
                    <label className='usuario-label'>
                        <span>Correo Electronico</span>
                        <input className='usuario-input' type="email" placeholder="rodrigo@gmail.com" />
                    </label>
                    <label className='usuario-label'>
                        <span>Numero de celular</span>
                        <input className='usuario-input' type="text" placeholder="Agregar Numero" />
                    </label>
                </form>
            </div>
        </div>
    )
}

export default UsuarioView