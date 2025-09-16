import { Account, Transaction, LoginCredentials } from '../types/account';

class ATMService {
  private accounts: Map<string, Account> = new Map();

  constructor() {
    this.initializeSampleAccounts();
    this.loadAccountsFromStorage();
  }

  private initializeSampleAccounts(): void {
    const sampleAccounts: Account[] = [
      {
        accountNumber: '1234567890',
        pin: '1234',
        balance: 1500.00,
        accountType: 'savings',
        minimumBalance: 100.00,
        transactionHistory: [
          {
            id: '1',
            type: 'deposit',
            amount: 500.00,
            balance: 1500.00,
            timestamp: new Date(Date.now() - 86400000 * 2),
            description: 'Cash Deposit'
          },
          {
            id: '2',
            type: 'withdrawal',
            amount: 200.00,
            balance: 1300.00,
            timestamp: new Date(Date.now() - 86400000),
            description: 'ATM Withdrawal'
          }
        ]
      },
      {
        accountNumber: '0987654321',
        pin: '5678',
        balance: 2500.00,
        accountType: 'savings',
        minimumBalance: 100.00,
        transactionHistory: [
          {
            id: '3',
            type: 'deposit',
            amount: 1000.00,
            balance: 2500.00,
            timestamp: new Date(Date.now() - 86400000 * 3),
            description: 'Salary Credit'
          },
          {
            id: '4',
            type: 'withdrawal',
            amount: 300.00,
            balance: 2200.00,
            timestamp: new Date(Date.now() - 86400000 * 2),
            description: 'ATM Withdrawal'
          }
        ]
      }
    ];

    sampleAccounts.forEach(account => {
      this.accounts.set(account.accountNumber, account);
    });
  }

  private loadAccountsFromStorage(): void {
    const stored = localStorage.getItem('atm_accounts');
    if (stored) {
      try {
        const accountsData = JSON.parse(stored);
        Object.keys(accountsData).forEach(key => {
          const account = accountsData[key];
          account.transactionHistory = account.transactionHistory.map((t: any) => ({
            ...t,
            timestamp: new Date(t.timestamp)
          }));
          this.accounts.set(key, account);
        });
      } catch (error) {
        console.error('Error loading accounts from storage:', error);
      }
    }
  }

  private saveAccountsToStorage(): void {
    const accountsObj: { [key: string]: Account } = {};
    this.accounts.forEach((account, key) => {
      accountsObj[key] = account;
    });
    localStorage.setItem('atm_accounts', JSON.stringify(accountsObj));
  }

  validateLogin(credentials: LoginCredentials): Account | null {
    const account = this.accounts.get(credentials.accountNumber);
    if (account && account.pin === credentials.pin) {
      return account;
    }
    return null;
  }

  checkBalance(accountNumber: string): number {
    const account = this.accounts.get(accountNumber);
    if (!account) throw new Error('Account not found');
    
    this.addTransaction(accountNumber, {
      id: Date.now().toString(),
      type: 'balance_check',
      amount: 0,
      balance: account.balance,
      timestamp: new Date(),
      description: 'Balance Inquiry'
    });
    
    return account.balance;
  }

  withdraw(accountNumber: string, amount: number): boolean {
    const account = this.accounts.get(accountNumber);
    if (!account) throw new Error('Account not found');

    if (amount <= 0) {
      throw new Error('Invalid amount');
    }

    if (amount > account.balance) {
      throw new Error('Insufficient funds');
    }

    if ((account.balance - amount) < account.minimumBalance) {
      throw new Error(`Minimum balance of $${account.minimumBalance.toFixed(2)} must be maintained`);
    }

    account.balance -= amount;
    this.addTransaction(accountNumber, {
      id: Date.now().toString(),
      type: 'withdrawal',
      amount: amount,
      balance: account.balance,
      timestamp: new Date(),
      description: 'ATM Withdrawal'
    });

    this.saveAccountsToStorage();
    return true;
  }

  deposit(accountNumber: string, amount: number): boolean {
    const account = this.accounts.get(accountNumber);
    if (!account) throw new Error('Account not found');

    if (amount <= 0) {
      throw new Error('Invalid amount');
    }

    account.balance += amount;
    this.addTransaction(accountNumber, {
      id: Date.now().toString(),
      type: 'deposit',
      amount: amount,
      balance: account.balance,
      timestamp: new Date(),
      description: 'Cash Deposit'
    });

    this.saveAccountsToStorage();
    return true;
  }

  getTransactionHistory(accountNumber: string, limit: number = 10): Transaction[] {
    const account = this.accounts.get(accountNumber);
    if (!account) throw new Error('Account not found');

    return account.transactionHistory
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  private addTransaction(accountNumber: string, transaction: Transaction): void {
    const account = this.accounts.get(accountNumber);
    if (!account) return;

    account.transactionHistory.push(transaction);
    this.accounts.set(accountNumber, account);
  }

  getAccount(accountNumber: string): Account | undefined {
    return this.accounts.get(accountNumber);
  }
}

export default new ATMService();