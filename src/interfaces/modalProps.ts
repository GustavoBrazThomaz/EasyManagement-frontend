import { ICustomer } from "../pages/Home/repository/Customer";

export interface IModalProps {
    open: boolean,
    id?: string,
    customer?: ICustomer
}