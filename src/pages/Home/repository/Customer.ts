import { AxiosResponse } from "axios";
import { API } from "../../../api/API";

export interface ICustomer {
  _id?: string;
  name: string;
  email: string;
  price: number;
  payment: boolean;
}

export async function getCustomers(): Promise<AxiosResponse<ICustomer[]>> {
  const response = await API.get("/customer");
  return response;
}

export async function postCustomer(customer: ICustomer) {
  try {
    const response = await API.post("/customer", customer);
    return response;
  } catch {
    throw new Error("Erro ao criar cliente");
  }
}
