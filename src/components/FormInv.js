import React, { useState, useContext, useEffect } from 'react';

import '../inventario.css';
import { filterByInputText } from '../funciones/filterByInputText';
import { ItemsFiltered } from './ItemsFiltered';
import { ItemsSelectedTable } from './ItemsSelectedTable';

import { GlobalContext } from '../context/GlobalState';

export const FormInv = () => {
    
    const { itemsSelected, addItem, itemToUpdate, removeAllItems } = useContext(GlobalContext);
    
    const [inputSearch, setInputSearch] = useState('');
    const [itemsFiltered, setItemsFiltered] = useState([]);
    const [product, setProduct] = useState('');
    const [code, setCode] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    // Actualiza el componente una vez un cambio en itemToUpdate sea hecho.
    useEffect(() => {
        setCode(itemToUpdate.codigo);
        setProduct(itemToUpdate.name);
        setPrice(itemToUpdate.precio);
        setQuantity(itemToUpdate.cantidad);
    }, [itemToUpdate])

    const handleChange = (e) => {
        
        if (e.target.name === 'inputSearch') {
            if (e.target.value === ''){
                setInputSearch(e.target.value);
                setItemsFiltered([]);
                setCode(999);
                setProduct('');
                setPrice(0);
                setQuantity(0);

            } else {
                let resultItemsFiltered = filterByInputText(e.target.value);
                setInputSearch(e.target.value);
                setItemsFiltered(resultItemsFiltered);
            }
        }

        if (e.target.name === 'codigo') { 
            e.target.value === '' ? setCode('') : setCode(parseInt(e.target.value));
        }

        if (e.target.name === 'producto') {
            setProduct(e.target.value);
        }

        if (e.target.name === 'precio') {
            e.target.value === '' ? setPrice('') : setPrice(parseFloat(e.target.value));
        }

        if (e.target.name === 'cantidad') {
            e.target.value === '' ? setQuantity('') : setQuantity(parseInt(e.target.value));
        }

        if (e.target.name === 'productList') {
            let itemSelected = itemsFiltered.filter(item => 
                item.name === e.target.value)[0];
            
            setProduct(itemSelected.name);
            setCode(itemSelected.codigo);
            setPrice(itemSelected.precio);
            setQuantity(itemSelected.cantidad);
        }
    }
    
    const handleAdd = (e) => {

        if (code !== 0 && code !== '' && product !== '' && price !== 0 && !isNaN(price) && price !== '' && quantity !== 0 && quantity !== '') {
            
            if (itemsSelected.filter(item => item.codigo === code).length === 0){
                if (itemsSelected.filter(item => item.name === product).length === 0){
                    let item ={
                        'codigo': parseInt(code),
                        'name': String(product),
                        'cantidad': parseInt(quantity),
                        'precio': parseFloat(price),
                        'created at': new Date()
                        }
                    addItem(item);
                } else {
                    alert('El producto ya esta agregado');
                }
            } else {
                alert('Codigo ya utilizado')
            }           
        } else {
            alert('Debe completar todos los campos');
        }
        
        e.preventDefault();
    }

    const handleSumbit = (e) => {
        
        if (itemsSelected.length > 0){
            if (window.confirm('¿Quieres enviar todo el inventario a la base de datos, el cuadro se limpiará?')) {
                fetch("https://sheet.best/api/sheets/24c38baf-e24d-42e6-acf4-97d73a5944ae",
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(itemsSelected),
                    })
                    .then((r) => r.json())
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                removeAllItems();
            }
        } else {
            alert('No hay productos para enviar');
        }   
    }

    return(
        <main className="main">
            <h1>Inventario</h1>
            <ItemsFiltered 
                itemsFiltered={itemsFiltered} 
                onItemsFilteredHandleChange={handleChange} 
            />
            <form onSubmit={handleAdd} className="form">
                <label htmlFor="inputSearch">Buscar</label>
                <input type="text" 
                    onChange={handleChange} 
                    value={inputSearch} 
                    id="inputSearch"
                    name="inputSearch" 
                    placeholder="Busca tu producto aquí" 
                    autoFocus />
                <label htmlFor="codigo">Codigo</label>
                <input 
                    type="number"
                    id='codigo'
                    name='codigo'
                    value={code}
                    onChange={handleChange}
                />
                <label htmlFor="producto">Producto</label>
                <input 
                    type="text" 
                    id="producto" 
                    name="producto" 
                    value={product}
                    onChange={handleChange}
                />
                <label htmlFor="precio">Precio</label>
                <input 
                    type="number" 
                    step={0.01}
                    id="precio" 
                    name="precio" 
                    value={price}
                    onChange={handleChange}
                />
                <label htmlFor="cantida">Cantidad</label>
                <input 
                    type="number" 
                    id="cantidad" 
                    name="cantidad" 
                    value={quantity}
                    onChange={handleChange}
                />
                <button className="button">Añadir</button>
            </form>
            <ItemsSelectedTable itemsSelected={itemsSelected}/>
            <button onClick={handleSumbit} className="button-enviar">Enviar</button>
        </main>
    )
}