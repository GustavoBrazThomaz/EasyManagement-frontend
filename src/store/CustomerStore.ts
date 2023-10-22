import { create } from "zustand";
import { ICustomer } from "../pages/Home/repository/Customer";

const emptyCustomer: ICustomer = {
  email: "",
  price: 0,
  name: "",
  payment: false,
};

type CustomerStore = {
  open_edit: boolean;
  customer: ICustomer;
  toggleOpenEdit: () => void;
  setCustomer: (customer: ICustomer) => void;

  open_create: boolean;
  toggleOpenCreate: () => void;

  open_delete: boolean;
  toggleOpenDelete: () => void;

  refresh: boolean;
  toggleRefresh: () => void;
};

export const useCustomerStore = create<CustomerStore>()((set) => ({
  open_edit: false,
  customer: emptyCustomer,
  open_create: false,
  open_delete: false,
  refresh: false,
  toggleOpenEdit: () => set((state) => ({ open_edit: !state.open_edit })),
  setCustomer: (customer: ICustomer) => set(() => ({ customer: customer })),
  toggleOpenCreate: () => set((state) => ({ open_create: !state.open_create })),
  toggleOpenDelete: () => set((state) => ({ open_delete: !state.open_delete })),
  toggleRefresh: () => set((state) => ({ refresh: !state.refresh })),
}));
