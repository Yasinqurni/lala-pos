'use client'

import DataTable from "@/components/common/datatable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DATA_TABLE_USER_HEADER } from "@/constants/datatable-constant";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getUserQuery } from "@/queries/users/get-users";
import DropdownAction from "@/components/common/dropdown-action";
import { DEFAULT_ACTION_DROPDOWN } from "@/constants/default-constant";
import useDatatable from "@/hooks/use-datatable";
import DialogCreateUser from "./dialog-create-user";

export default function UserManagement() {
  const {
    currentPage, 
    handleChangePage, 
    currentLimit, 
    handleChangeLimit,
    currentSearch,
    handleChangeSearch,
  } = useDatatable();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users', currentLimit, currentPage, currentSearch],
    queryFn: () => getUserQuery(currentLimit, currentPage, currentSearch),
  });

  const filteredData = useMemo(() => {
    return (users?.data || []).map((user, index) => [
      index + 1,
      user.id,
      user.name,
      user.email,
      user.role,
      <DropdownAction key={user.id} menu={DEFAULT_ACTION_DROPDOWN}/>,
    ]);
  }, [users]);

  const totalPages = useMemo(() => {
    return users && users.count !== null
      ? Math.ceil(users.count / currentLimit)
      : 0;
  }, [users, currentLimit]);

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="font-bold">User Management</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name"
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add</Button>
          </DialogTrigger>
          {open && <DialogCreateUser onClose={() => setOpen(false)} />}
        </Dialog>
        </div>
      </div>

      <DataTable 
        headers={DATA_TABLE_USER_HEADER} 
        isLoading={isLoading} 
        data={filteredData}
        totalPages={totalPages}
        currentLimit={currentLimit}
        currentPage={currentPage}
        onChangePage={handleChangePage}
        onChangeLimit={handleChangeLimit}
      />
    </div>
  );
}
