import { inventario } from '../data/inventario';

export function filterByInputText(texto, attr = "name") {
    // Se busca en funcion del nombre de producto
    if (attr === "name") {
        let textSplitted = texto.split(' ');
        let words = '.*'
        for (let i = 0; i < textSplitted.length; i++) {
            words += String(textSplitted[i].toLowerCase() + '.*');
        }
        let reg = new RegExp(String(`${texto.toLowerCase()}|${words}`), "g");
        let f = inventario.filter((item) => (
            // aplica el regex a los nombres de productos
            item[attr].toLowerCase().match(reg)
        ))
        // devuelve los primeros seis elementos del array
        return f.slice(0, 6)
    } else {
        let f = this.inventario.filter((item) => (
            item[attr] === texto
        ))
        return f
    }
}