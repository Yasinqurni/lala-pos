import { DEFAULT_LIMIT_LIST_PAGINATION, DEFAULT_PAGE, DEFAULT_SEARCH } from "@/constants/datatable-constant";
import { useState } from "react";
import UseDebounce from "./use-debounce";

export default function useDatatable() {
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT_LIST_PAGINATION);
    const [ currentSearch, setCurrentSearch] = useState(DEFAULT_SEARCH);
    const debounce = UseDebounce();

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
    }

    const handleChangeLimit = (limit: number) => {
        setCurrentLimit(limit)
        setCurrentPage(DEFAULT_PAGE)
    }

    const handleChangeSearch = (search: string) => {
        debounce(() => {
            setCurrentSearch(search)
            setCurrentPage(DEFAULT_PAGE)
        }, 500)
    }
    

    return {
        currentPage,
        handleChangePage,
        currentLimit,
        handleChangeLimit,
        currentSearch,
        handleChangeSearch,
    }
}