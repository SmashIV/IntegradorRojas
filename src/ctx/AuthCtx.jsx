import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        const usuarioStored = localStorage.getItem('usuario');
        if (usuarioStored) 
            setUsuario(JSON.parse(usuarioStored))
    }, []);

    const iniciarSesion = (usuario) => {
        setUsuario(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
    };

    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
        navigator('/');
    }


    return (

        <AuthContext.Provider value={{usuario, iniciarSesion, cerrarSesion}}>
            {children}
        </AuthContext.Provider>

    );
};