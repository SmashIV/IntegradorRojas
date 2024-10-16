import {useState } from 'react'
import '../assets/css/home.css'
import ExpProduc from '../components/ExpProduc'
import Header from '../components/Header'
import DisplayProd from '../components/DisplayProd';

export default function Home() {

    const [categorias, setCategorias] = useState("Todos los productos");

    return (
        <div>
            <Header />
            <ExpProduc categorias={categorias} setCategorias={setCategorias} />
            <DisplayProd categorias={categorias} />
        </div>
    )
}
