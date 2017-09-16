import { AccountType } from "../enum/accounttype";

export class AccountDetails {
    public accountId: AccountType;
    public transactionId: number;
    public transactionDate: Date;
    public transactionAmount: number;
    public note: string;
}