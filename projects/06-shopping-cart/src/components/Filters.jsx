import { useId } from "react"
import "./Filters.css"
import { useFilters } from "../hooks/useFilters"

export const Filters = () => {
    const {filters, setFilters} = useFilters()
    
    const minPriceFilterID = useId()
    const categoryFilterID = useId()

    const handleChangeMinPrice = (event) => {

        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

    return (
        <section className="filters">

            <div>
                <label htmlFor={minPriceFilterID}>A partir de:</label>
                <input 
                    type="range" 
                    id={minPriceFilterID}
                    min='0'
                    max='1000'
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>{filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterID}>Categoria</label>
                <select id={categoryFilterID} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="laptops">Portatiles</option>
                    <option value="smartphones">Celulares</option>
                    <option value="fragrances">Fragancias</option>
                    <option value="groceries">Comida</option>
                </select>
            </div>

        </section> 
    )
}
