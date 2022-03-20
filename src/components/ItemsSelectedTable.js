import '../inventario.css';

import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';


export const ItemsSelectedTable = () => {
    
    const { itemsSelected, removeItem, updateItem} = useContext(GlobalContext);
    
    return (
        <table className='itemsSelectedTable'>
            <thead className='headerTable'>
                <tr>
                    <th>Codigo</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cant.</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody className='bodyTable'>
                {itemsSelected.map(item => (
                    <tr key={item.codigo}>
                        <td>{item.codigo}</td>
                        <td>{item.name}</td>
                        <td>{item.precio}</td>
                        <td>{item.cantidad}</td>
                        <td className='editAndDelete'>
                            <label htmlFor={item.name}>Editar</label>
                            <input 
                                type="radio" 
                                name="edit"
                                onClick={() => updateItem(item)}
                                value={item.name}
                            />
                            <label htmlFor={item.name}>Borrar</label>
                            <input 
                                type="radio" 
                                name="delete"
                                onClick={() => removeItem(item)}
                                value={item.name}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}