import Account from "./Account";

interface AccountCard {
    id: number;
    account_id: Account | number;
    cardholder_first_name: string;
    cardholder_last_name: string;
    card_number: string;
    exp_month: number;
    exp_year: number;
    cvv: string;
}
export = AccountCard;