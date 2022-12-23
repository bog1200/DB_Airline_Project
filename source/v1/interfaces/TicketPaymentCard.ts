import Ticket from "./Ticket";
import AccountCard from "./AccountCard";
interface TicketPaymentCard {
    id?: number;
    ticket_id?: number | Ticket;
    card_id?: number | AccountCard;
}
export = TicketPaymentCard;