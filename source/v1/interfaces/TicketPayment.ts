import TicketPaymentMethod  from "./TicketPaymentMethod";
import Ticket from "./Ticket";
interface TicketPayment {
    id?: number;
    ticket_id?: Ticket;
    payment_method_id?: TicketPaymentMethod;
    date?: Date;
}
export = TicketPayment;