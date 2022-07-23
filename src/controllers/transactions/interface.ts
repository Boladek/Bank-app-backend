interface Transaction {
    description: string;
    type: "withdraw" | "deposit";
    credit?: number;
    debit?: number;
    balance?: number;
    status: "pending" | "failed" | "success";
    user_id: string | any;
  }

export interface UniqueTransaction {
  user_id: string | any;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}
   
export default Transaction;