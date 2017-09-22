import { AccountType } from "../enum/accounttype";

export class TransactionDetails {
    public accountId: AccountType;
    public transactionId: number;
    public transactionDate: Date;
    public transactionAmount: number;
    public note: string;
}