export interface Account {
  accountNumber: string;
  pin: string;
  balance: number;
  accountType: 'savings' | 'current';
  minimumBalance: number;
  transactionHistory: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'balance_check';
  amount: number;
  balance: number;
  timestamp: Date;
  description: string;
}

export interface LoginCredentials {
  accountNumber: string;
  pin: string;
}