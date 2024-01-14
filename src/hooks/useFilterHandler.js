import { useFilter } from "@providers/filter-provider"
import { createSearchParams, useSearchParams } from "react-router-dom";

const useFilterHandler = () => {
    const { FilterState, FilterDispatcher } = useFilter()
    const [_, setSearchParams] = useSearchParams();

    const handleCategoryChange = (e) => {
        let categoryList = [...FilterState.categories];
        if (e.target.checked) {
            categoryList.push(e.target.value);
        } else {
            categoryList = categoryList.filter((category) => category !== e.target.value);
        }
        FilterDispatcher({ type: "FILTER_BY_CATEGORY", payload: categoryList });
        setSearchParams(createSearchParams({ ...matchInit(FilterState), categories: categoryList }));
    }

    const handleSortByChange = (e) => {
        FilterDispatcher({
            type: "FILTER_BY_SORT",
            payload: e.target.value,
        });
        setSearchParams(
            createSearchParams({ ...matchInit(FilterState), sortBy: e.target.value })
        );

    }
    const handlePriceRangeChange = (range) => {
        const { min, max } = range
        FilterDispatcher({
            type: "FILTER_BY_PRICE_RANGE",
            payload: range,
        });
        setSearchParams(
            createSearchParams({ ...matchInit(FilterState), priceLow: min, priceHigh: max })
        );
    }

    const handleClearFilter = () => {
        FilterDispatcher({ type: "CLEAR_FILTERS" });
        setSearchParams();
    };


    return {
        handleCategoryChange,
        handleSortByChange,
        handlePriceRangeChange,
        handleClearFilter
    }
}


const matchInit = (FilterState) => {
    const init = {
        sortBy: null,
        categories: [],
        priceLow: 1,
        priceHigh: 1000,
    }

    const filteredData = Object.entries(FilterState).filter((key, i) => init[key[0]] !== key[1] && key[0] !== "filter");
    return Object.fromEntries(filteredData)
}
export default useFilterHandler