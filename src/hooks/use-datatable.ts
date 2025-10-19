import { DEFAULT_LIMIT_LIST_PAGINATION, DEFAULT_PAGE } from "@/constants/datatable-constant";
import { useState } from "react";

export default function useDatatable() {
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT_LIST_PAGINATION);

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
    }

    const handleChangeLimit = (limit: number) => {
        setCurrentLimit(limit)
        setCurrentPage(DEFAULT_PAGE)
    }

    return {
        currentPage,
        handleChangePage,
        currentLimit,
        handleChangeLimit,
    }
}