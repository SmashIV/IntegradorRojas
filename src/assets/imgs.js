import bebidas from "./img_productos/bebidas/Gaseosa-Big-Cola-Botella-3-3-lt-1-40734074.webp"
import carnes from "./img_productos/carnes/20071093.webp"
import congelados from "./img_productos/congelados/102636.webp"
import frutas from "./img_productos/frutas/159241-800-auto.webp"
import leches from "./img_productos/leches/bonle_chocolatada.webp"
import limpieza from "./img_productos/limpieza/20281211.webp"
import mascotas from "./img_productos/mascotas/20189061.webp"
import snacks from "./img_productos/snacks/20160317.webp"

import be_1 from "./img_productos/bebidas/20063486.webp"
import be_2 from "./img_productos/bebidas/20065707.webp"
import be_3 from "./img_productos/bebidas/20174916.webp"
import be_4 from "./img_productos/bebidas/20196995.webp"

import ca_1 from "./img_productos/carnes/20071093.webp"
import ca_2 from "./img_productos/carnes/20197700.webp"
import ca_3 from "./img_productos/carnes/20168637.webp"
import ca_4 from "./img_productos/carnes/20220310-1.webp"

import cong_1 from "./img_productos/congelados/102636.webp"
import cong_2 from "./img_productos/congelados/16894.webp"
import cong_3 from "./img_productos/congelados/114480.webp"
import cong_4 from "./img_productos/congelados/20202122.webp"

import fru_1 from "./img_productos/frutas/159241-800-auto.webp"
import fru_2 from "./img_productos/frutas/20174790.webp"
import fru_3 from "./img_productos/frutas/20191186.webp"
import fru_4 from "./img_productos/frutas/20201890.webp"

import le_1 from "./img_productos/leches/20283148.webp"
import le_2 from "./img_productos/leches/bonle_chocolatada.webp"
import le_3 from "./img_productos/leches/avellanas.webp"
import le_4 from "./img_productos/leches/cremadeleche.webp"

import li_1 from "./img_productos/limpieza/20021609.webp"
import li_2 from "./img_productos/limpieza/20182643-5.webp"
import li_3 from "./img_productos/limpieza/20191706.webp"
import li_4 from "./img_productos/limpieza/20192603.webp"

import masc_1 from "./img_productos/mascotas/20189061.webp"
import masc_2 from "./img_productos/mascotas/20326014.webp"
import masc_3 from "./img_productos/mascotas/20326019.webp"
import masc_4 from "./img_productos/mascotas/image-0.webp"

import sks_1 from "./img_productos/snacks/12954021-800-800.webp"
import sks_2 from "./img_productos/snacks/20160317.webp"
import sks_3 from "./img_productos/snacks/20201614.webp"
import sks_4 from "./img_productos/snacks/20329663.webp"

import boton_blanco from "./img/boton_blanco.jpeg"
import boton_verde from "./img/boton_verde.jpeg"
import boton_rojo from "./img/boton_rojo.jpeg"
import logo from "./img/logo1.jpeg"
import salir from "./img/salir_icono.jpeg"

export const img = {
    boton_blanco,
    boton_verde,
    boton_rojo,
    logo,
    salir
}

export const productos_menu = [
    {
        nombre_prod: "Bebidas",
        img_prod: bebidas
    },
    {
        nombre_prod: "Carnes",
        img_prod: carnes
    },
    {
        nombre_prod: "Congelados",
        img_prod: congelados
    },
    {
        nombre_prod: "Frutas",
        img_prod: frutas
    },
    {
        nombre_prod: "Leches",
        img_prod: leches
    },
    {
        nombre_prod: "Productos Limpieza",
        img_prod: limpieza
    },
    {
        nombre_prod: "Mascotas",
        img_prod: mascotas
    },
    {
        nombre_prod: "Snacks",
        img_prod: snacks
    }
]

export const lista_productos = [
    // Bebidas
    {
        _id: "1",
        nombre: "Agua San Mateo 7L",
        imagen: be_1,
        precio: 7,
        descripcion: "El agua es esencial para la hidratación y el bienestar general.",
        categoria: "Bebidas"
    },
    {
        _id: "2",
        nombre: "Jugo de Mango Gloria 1L",
        imagen: be_2,
        precio: 6,
        descripcion: "Disfruta del delicioso sabor del mango con este jugo natural.",
        categoria: "Bebidas"
    },
    {
        _id: "3",
        nombre: "Jugo de Manzana y Camu Camu BIO",
        imagen: be_3,
        precio: 8,
        descripcion: "Un jugo saludable que combina la frescura de la manzana con los beneficios del camu camu.",
        categoria: "Bebidas"
    },
    {
        _id: "4",
        nombre: "Bebida de Aloe Vera Sabor Piña Kero",
        imagen: be_4,
        precio: 5,
        descripcion: "Refrescante bebida de aloe vera con un toque de piña.",
        categoria: "Bebidas"
    },
    // Carnes
    {
        _id: "5",
        nombre: "Filete de Basa Bell's",
        imagen: ca_1,
        precio: 18,
        descripcion: "Filete de pescado Basa de alta calidad, ideal para una dieta balanceada.",
        categoria: "Carnes"
    },
    {
        _id: "6",
        nombre: "Gallina Congelada Sadia",
        imagen: ca_2,
        precio: 22,
        descripcion: "Gallina congelada lista para preparar en tus mejores recetas.",
        categoria: "Carnes"
    },
    {
        _id: "7",
        nombre: "Lomo de Res El Buen Corte",
        imagen: ca_3,
        precio: 35,
        descripcion: "Delicioso lomo de res, ideal para parrillas y asados.",
        categoria: "Carnes"
    },
    {
        _id: "8",
        nombre: "Pechuga Especial de Pollo San Fernando",
        imagen: ca_4,
        precio: 25,
        descripcion: "Pechuga de pollo de calidad premium, perfecta para una comida saludable.",
        categoria: "Carnes"
    },
    // Congelados
    {
        _id: "9",
        nombre: "Ravioles de Carne 500g Don Italo",
        imagen: cong_1,
        precio: 15,
        descripcion: "Ravioles de carne congelados, ideales para una comida rápida y deliciosa.",
        categoria: "Congelados"
    },
    {
        _id: "10",
        nombre: "Hamburguesa de Pollo 840g Redondos",
        imagen: cong_2,
        precio: 20,
        descripcion: "Hamburguesas de pollo congeladas, perfectas para una comida rápida y nutritiva.",
        categoria: "Congelados"
    },
    {
        _id: "11",
        nombre: "Hamburguesa de Res 600g Otto Kunz",
        imagen: cong_3,
        precio: 22,
        descripcion: "Hamburguesas de res de alta calidad, listas para cocinar y disfrutar.",
        categoria: "Congelados"
    },
    {
        _id: "12",
        nombre: "Pezi Duri Tricolor 900ml D'Onofrio",
        imagen: cong_4,
        precio: 12,
        descripcion: "Helado tricolor de D'Onofrio, perfecto para disfrutar en cualquier momento.",
        categoria: "Congelados"
    },
    // Frutas
    {
        _id: "13",
        nombre: "Sandía x kg",
        imagen: fru_1,
        precio: 4,
        descripcion: "Sandía fresca, ideal para los días calurosos.",
        categoria: "Frutas"
    },
    {
        _id: "14",
        nombre: "Fresa Entera 1kg El Frutero",
        imagen: fru_2,
        precio: 10,
        descripcion: "Fresas frescas y enteras, perfectas para postres o batidos.",
        categoria: "Frutas"
    },
    {
        _id: "15",
        nombre: "Fresa Congelada 500g Fest",
        imagen: fru_3,
        precio: 8,
        descripcion: "Fresas congeladas, listas para tus smoothies o recetas.",
        categoria: "Frutas"
    },
    {
        _id: "16",
        nombre: "Palta x kg Bell's",
        imagen: fru_4,
        precio: 6,
        descripcion: "Palta fresca y cremosa, ideal para ensaladas o guacamole.",
        categoria: "Frutas"
    },
    // Leches
    {
        _id: "17",
        nombre: "Leche de Soja 1L OraSI",
        imagen: le_1,
        precio: 8,
        descripcion: "Leche de soja sin lactosa, perfecta para personas con intolerancias.",
        categoria: "Leches"
    },
    {
        _id: "18",
        nombre: "Sixpack Bonlé Chocolate 180ml",
        imagen: le_2,
        precio: 12,
        descripcion: "Deliciosa leche con chocolate, ideal para un snack o desayuno.",
        categoria: "Leches"
    },
    {
        _id: "19",
        nombre: "Leche de Avellanas 1L Vemondo",
        imagen: le_3,
        precio: 10,
        descripcion: "Leche de avellanas, una opción deliciosa y saludable.",
        categoria: "Leches"
    },
    {
        _id: "20",
        nombre: "Crema de Leche UHT 946ml Gloria",
        imagen: le_4,
        precio: 14,
        descripcion: "Crema de leche UHT, ideal para repostería y cocina.",
        categoria: "Leches"
    },
    // Productos Limpieza
    {
        _id: "21",
        nombre: "Lejía Tradicional Clorox 4L",
        imagen: li_1,
        precio: 18,
        descripcion: "Lejía tradicional para la limpieza y desinfección del hogar.",
        categoria: "Productos Limpieza"
    },
    {
        _id: "22",
        nombre: "Detergente Marsella 2kg",
        imagen: li_2,
        precio: 16,
        descripcion: "Detergente en polvo Marsella, eficaz en la limpieza de la ropa.",
        categoria: "Productos Limpieza"
    },
    {
        _id: "23",
        nombre: "Total Toalla Nova 1 Rollo",
        imagen: li_3,
        precio: 5,
        descripcion: "Rollo de toalla Nova, resistente y absorbente.",
        categoria: "Productos Limpieza"
    },
    {
        _id: "24",
        nombre: "Desinfectante Frosch 600ml",
        imagen: li_4,
        precio: 12,
        descripcion: "Desinfectante Frosch, ideal para mantener tu hogar libre de bacterias.",
        categoria: "Productos Limpieza"
    },
    // Mascotas
    {
        _id: "25",
        nombre: "Paté Sabor Carne Ricocan 330g",
        imagen: masc_1,
        precio: 6,
        descripcion: "Paté para perros sabor carne, delicioso y nutritivo.",
        categoria: "Mascotas"
    },
    {
        _id: "26",
        nombre: "Sticks de Ganado Vacuno Bell's",
        imagen: masc_2,
        precio: 10,
        descripcion: "Sticks de ganado vacuno, una golosina irresistible para tu perro.",
        categoria: "Mascotas"
    },
    {
        _id: "27",
        nombre: "Snacks de Ganado Vacuno Bell's",
        imagen: masc_3,
        precio: 8,
        descripcion: "Snacks para perros de ganado vacuno, perfectos para entrenar.",
        categoria: "Mascotas"
    },
    {
        _id: "28",
        nombre: "Alimento Super Cat Adultos 2kg",
        imagen: masc_4,
        precio: 15,
        descripcion: "Alimento para gatos adultos, balanceado y delicioso.",
        categoria: "Mascotas"
    },
    // Snacks
    {
        _id: "29",
        nombre: "Papas Lay's Clásicas 600mg",
        imagen: sks_1,
        precio: 4,
        descripcion: "Papas fritas clásicas, un snack crujiente y delicioso.",
        categoria: "Snacks"
    },
    {
        _id: "30",
        nombre: "Cocktail de Frutos Secos Natura 150g",
        imagen: sks_2,
        precio: 12,
        descripcion: "Mezcla de frutos secos, ideal para un snack saludable.",
        categoria: "Snacks"
    },
    {
        _id: "31",
        nombre: "Chifles Norteños Mily's 500g",
        imagen: sks_3,
        precio: 10,
        descripcion: "Chifles norteños, un snack tradicional y delicioso.",
        categoria: "Snacks"
    },
    {
        _id: "32",
        nombre: "Papas InkaChips Sal de Mar 150g",
        imagen: sks_4,
        precio: 6,
        descripcion: "Papas fritas con sal de mar, un toque de sabor peruano.",
        categoria: "Snacks"
    }
];
