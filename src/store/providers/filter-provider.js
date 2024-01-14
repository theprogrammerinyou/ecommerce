import { createContext, useContext, useEffect, useReducer } from "react"
import { FilterReducer } from "../reducers/filter-reducer"
import { fetchFilterStateFromParams } from "../reducers/reducer-functions"
import { useSearchParams } from "react-router-dom";
const FilterContext = createContext()

const FilterProvider = ({ children }) => {
    const [searchParams] = useSearchParams();
    const [FilterState, FilterDispatcher] = useReducer(FilterReducer, fetchFilterStateFromParams(searchParams))
    return (
        <FilterContext.Provider value={{ FilterState, FilterDispatcher }}>
            {children}
        </FilterContext.Provider>
    )
}
const useFilter = () => useContext(FilterContext)

export { useFilter, FilterProvider } 