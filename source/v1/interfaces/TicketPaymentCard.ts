import Ticket from "./Ticket";
import AccountCard from "./AccountCard";
interface TicketPaymentCard {
    id?: number;
    ticket_id?: Ticket;
    card_id?: AccountCard;
}
export = TicketPaymentCard;