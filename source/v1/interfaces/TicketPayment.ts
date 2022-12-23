import TicketPaymentMethod  from "./TicketPaymentMethod";
import Ticket from "./Ticket";
interface TicketPayment {
    id?: number;
    ticket_id?: number | Ticket;
    payment_method_id?: number | TicketPaymentMethod;
    date?: Date;
}
export = TicketPayment;