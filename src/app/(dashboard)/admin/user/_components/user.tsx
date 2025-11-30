'use client'

import DataTable from "@/components/common/datatable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DATA_TABLE_USER_HEADER } from "@/constants/datatable-constant";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getUserQuery } from "@/queries/users/get-users";
import DropdownAction from "@/components/common/dropdown-action";
import { DEFAULT_ACTION_DROPDOWN } from "@/constants/default-constant";
import useDatatable from "@/hooks/use-datatable";
import DialogCreateUser from "./dialog-create-user";
import DialogUpdateUser from "./dialog-update-user";
import DialogDeleteUser from "./dialog-delete-user";

export default function UserManagement() {
  const {
    currentPage,
    handleChangePage,
    currentLimit,
    handleChangeLimit,
    currentSearch,
    handleChangeSearch,
  } = useDatatable();

  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", currentLimit, currentPage, currentSearch],
    queryFn: () => getUserQuery(currentLimit, currentPage, currentSearch),
  });

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
  };

  const handleChangeAction = (open: boolean) => {
    setOpenDelete(open);
    if (!open) {
      setSelectedUserId(null);
    }
  };

  const selectedUser = useMemo(() => {
    if (!selectedUserId || !users?.data) return undefined;
    return users.data.find((user) => user.id === selectedUserId);
  }, [selectedUserId, users]);

  const filteredData = useMemo(() => {
    return (users?.data || []).map((user, index) => {
      const menuWithAction = DEFAULT_ACTION_DROPDOWN.map((item) => {
        if (item.value === "edit") {
          return {
            ...item,
            action: () => {
              setSelectedUserId(user.id);
              setOpenUpdate(true);
            },
          };
        }
        if (item.value === "delete") {
          return {
            ...item,
            action: () => {
              setSelectedUserId(user.id);
              setOpenDelete(true);
            },
          };
        }
        return item;
      });

      return [
        index + 1,
        user.id,
        user.name,
        user.email,
        user.role,
        <DropdownAction key={user.id} menu={menuWithAction} />,
      ];
    });
  }, [users]);

  const totalPages = useMemo(() => {
    return users && users.count !== null
      ? Math.ceil(users.count / currentLimit)
      : 0;
  }, [users, currentLimit]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="font-bold">User Management</h1>
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
            {openCreate && <DialogCreateUser onClose={() => setOpenCreate(false)} />}
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

      {/* Dialog Update */}
      <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
        {openUpdate && selectedUserId && (
          <DialogUpdateUser
            userId={selectedUserId}
            refetch={refetch}
            onClose={() => {
              setOpenUpdate(false);
              setSelectedUserId(null);
            }}
          />
        )}
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        {openDelete && selectedUser && (
          <DialogDeleteUser
            refetch={refetch}
            currentData={selectedUser}
            handleChangeAction={handleChangeAction}
          />
        )}
      </Dialog>
    </div>
  );
}
