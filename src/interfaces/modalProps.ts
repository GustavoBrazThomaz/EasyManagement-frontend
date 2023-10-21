import { ICustomer } from "../pages/Home/repository/Customer";

export interface IModalProps {
    open: boolean,
    customer?: ICustomer
}