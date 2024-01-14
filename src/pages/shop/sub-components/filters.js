import styles from "../shop.module.scss"
import { Button, List, ListItem } from "react-felix-ui"
import { genKey } from "@global/js"
import useFilterHandler from "@hooks/useFilterHandler"
import { useFilter } from "@providers/filter-provider"
import RangeSlider from "@components/rang-slider/range-slider"
const Filters = () => {

    const { FilterState: { sortBy, priceLow, priceHigh } } = useFilter()
    const sortByInputs = ["Price - High to Low", "Price - Low to High", "Customer Ratings"]
    const { handleSortByChange, handlePriceRangeChange, handleClearFilter } = useFilterHandler()

    return (
        <div className={`${styles.side} ${styles.filter__container}`}>
            <div className={styles.control}>
                <h5>Filters</h5>
                <Button size="xs" variant="ghost" onClick={handleClearFilter} isRound={true} isTransform={false} color="danger">Clear All</Button>
            </div>
            <div className={styles.range_container}>
                <RangeSlider min={1} max={1000} setMin={priceLow} setMax={priceHigh} onMouseUp={(range) => handlePriceRangeChange(range)} />
            </div>
            <span className={styles.heading}>Sort By</span>
            <List style="none">
                {
                    sortByInputs.map((item, i) => {
                        return <Radio value={item} name="sortBy" key={i} onChange={handleSortByChange} checked={item === sortBy} />
                    })
                }
            </List>
        </div>
    )
}

const Radio = ({ value, name, checked, onChange }) => {
    const id = genKey()
    return (
        <ListItem>
            <input
                type="radio"
                className={styles.subOption}
                id={id} name={name}
                value={value}
                onChange={onChange}
                checked={checked}
            />
            <label htmlFor={id}> {value}</label>
        </ListItem>
    )
}
export default Filters