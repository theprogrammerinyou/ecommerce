import styles from "../shop.module.scss"
import { genKey } from "@global/js"
import { useProducts } from "@providers/product-provider"
import useFilterHandler from "@hooks/useFilterHandler"
import { useFilter } from "@providers/filter-provider"

const Categories = () => {
    const { categories } = useProducts()
    const { handleCategoryChange } = useFilterHandler()
    const { FilterState: { categories: filterCategories } } = useFilter()

    return (
        <div className={`${styles.side} ${styles.category_container}`}>
            <h5>Categories</h5>
            {categories.length === 0
                ? [...Array(5)].map((_, i) => {
                    return <Checkbox key={i} loading={true} />
                })
                : categories.map(({ categoryName, productCount, _id }) => {
                    return <Checkbox key={_id} value={categoryName} onChange={handleCategoryChange} count={productCount} categories={filterCategories} />
                })
            }
        </div>
    )
}

const Checkbox = ({ value, count, onChange, categories, loading }) => {
    const id = genKey()

    return (
        <>
            {loading
                ? <span className={`${styles.category_loader} loader`}></span>
                : <>
                    <input type="checkbox" value={value} id={id} onChange={onChange} checked={categories.includes(value)} />
                    <label htmlFor={id} >
                        <span className={`${styles.category} ${styles.selected}`}>{value}</span>
                        <span className={styles.count}>{count}</span>
                    </label>
                </>
            }
        </>
    )
}

export default Categories