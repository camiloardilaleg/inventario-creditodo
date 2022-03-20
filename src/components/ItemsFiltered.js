import '../inventario.css';


export const ItemsFiltered = ({ itemsFiltered, onItemsFilteredHandleChange}) => {
    
    const handleChange = (e) => {
        onItemsFilteredHandleChange(e);
    }
    

    return (
        <div className="itemsFiltered">
            {itemsFiltered.map(item => (
                <label 
                    className="labelItems" 
                    htmlFor={item.name}
                    key={item.codigo}
                >
                    <input 
                        type="radio"
                        name='productList'
                        value={item.name}
                        onChange={handleChange}
                    />
                    {item.name}
                </label>
            ))}
        </div>
    )
}