import { create } from "zustand";
import { ICustomer } from "../pages/Home/repository/Customer";

type CustomerStore = {
  open_edit: boolean;
  customer_edit: ICustomer | null
  toggleOpenEdit: () => void;
  setCustomerToEdit: (customer: ICustomer) => void

  open_create: boolean;
  toggleOpenCreate: () => void;

  open_delete: boolean;
  toggleOpenDelete: () => void;

  refresh: boolean;
  toggleRefresh: () => void;
};

export const useCustomerStore = create<CustomerStore>()((set) => ({
  open_edit: false,
  customer_edit: null,
  open_create: false,
  open_delete: false,
  refresh: false,
  toggleOpenEdit: () => set((state) => ({ open_edit: !state.open_edit })),
  setCustomerToEdit: (customer: ICustomer) => set(() => ({ customer_edit: customer})),
  toggleOpenCreate: () => set((state) => ({ open_create: !state.open_create })),
  toggleOpenDelete: () => set((state) => ({ open_delete: !state.open_delete })),
  toggleRefresh: () => set((state) => ({ refresh: !state.refresh })),
}));
