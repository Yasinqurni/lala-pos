'use client'

import DataTable from "@/components/common/datatable";
import DropdownAction from "@/components/common/dropdown-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DATA_TABLE_PRODUCT_HEADER } from "@/constants/datatable-constant";
import { DEFAULT_ACTION_DROPDOWN } from "@/constants/default-constant";
import useDatatable from "@/hooks/use-datatable";
import { getProductQuery } from "@/queries/products/get-product";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import DialogCreateProduct from "./dialog-create-product";


export default function ProductManagement() {
    const {
        currentPage,
        handleChangePage,
        currentLimit,
        handleChangeLimit,
        currentSearch,
        handleChangeSearch,
      } = useDatatable();

      const [openCreate, setOpenCreate] = useState(false);
    
      const { data: products, isLoading } = useQuery({
        queryKey: ["products", currentLimit, currentPage, currentSearch],
        queryFn: () => getProductQuery(currentLimit, currentPage, currentSearch),
      });

      const filteredData = useMemo(() => {
        return (products?.data || []).map((each, index) => {
          const status = each.is_active ? 'ACTIVE' : 'INACTIVE'
          return [
              index + 1,
              each.name,
              each.sku,
              each.description,
              status,
              each.price,
              each.selling_price,
              <DropdownAction key={each.id} menu={DEFAULT_ACTION_DROPDOWN} />,
          ];
        });
      }, [products]);
    
      const totalPages = useMemo(() => {
        return products && products.count !== null
          ? Math.ceil(products.count / currentLimit)
          : 0;
      }, [products, currentLimit]);

    return (
        <div className="w-full">
        <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
          <h1 className="font-bold">Product Management</h1>
          <div className="flex gap-2">
            <Input
              placeholder="Search by name"
              onChange={(e) => handleChangeSearch(e.target.value)}
            />

          {/* Dialog Create */}
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button variant="outline">Add</Button>
            </DialogTrigger>
            {openCreate && <DialogCreateProduct onClose={() => setOpenCreate(false)} />}
          </Dialog>
          </div>
        </div>
  
        <DataTable
          headers={DATA_TABLE_PRODUCT_HEADER}
          isLoading={isLoading}
          data={filteredData}
          totalPages={totalPages}
          currentLimit={currentLimit}
          currentPage={currentPage}
          onChangePage={handleChangePage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    )
}