import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import MainMenu from './components/MainMenu';
import BalanceScreen from './components/BalanceScreen';
import TransactionScreen from './components/TransactionScreen';
import StatementScreen from './components/StatementScreen';
import atmService from './services/atmService';
import { Account, LoginCredentials } from './types/account';

type Screen = 'login' | 'menu' | 'balance' | 'withdraw' | 'deposit' | 'statement';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (credentials: LoginCredentials) => {
    setLoginLoading(true);
    setLoginError(null);

    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const account = atmService.validateLogin(credentials);
      if (account) {
        setCurrentAccount(account);
        setCurrentScreen('menu');
      } else {
        setLoginError('Invalid account number or PIN. Please try again.');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentAccount(null);
    setCurrentScreen('login');
    setLoginError(null);
  };

  const handleMenuSelect = (option: string) => {
    switch (option) {
      case 'balance':
        setCurrentScreen('balance');
        break;
      case 'withdraw':
        setCurrentScreen('withdraw');
        break;
      case 'deposit':
        setCurrentScreen('deposit');
        break;
      case 'statement':
        setCurrentScreen('statement');
        break;
      default:
        setCurrentScreen('menu');
    }
  };

  const handleTransaction = async (amount: number, type: 'withdraw' | 'deposit'): Promise<boolean> => {
    if (!currentAccount) return false;

    try {
      if (type === 'withdraw') {
        atmService.withdraw(currentAccount.accountNumber, amount);
      } else {
        atmService.deposit(currentAccount.accountNumber, amount);
      }

      // Refresh account data
      const updatedAccount = atmService.getAccount(currentAccount.accountNumber);
      if (updatedAccount) {
        setCurrentAccount(updatedAccount);
      }

      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleBalance = () => {
    if (!currentAccount) return;
    atmService.checkBalance(currentAccount.accountNumber);
    // Refresh account data to include balance check transaction
    const updatedAccount = atmService.getAccount(currentAccount.accountNumber);
    if (updatedAccount) {
      setCurrentAccount(updatedAccount);
    }
  };

  const renderScreen = () => {
    if (!currentAccount && currentScreen !== 'login') {
      return (
        <LoginScreen
          onLogin={handleLogin}
          error={loginError}
          loading={loginLoading}
        />
      );
    }

    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            error={loginError}
            loading={loginLoading}
          />
        );
      
      case 'menu':
        return currentAccount && (
          <MainMenu
            account={currentAccount}
            onSelectOption={handleMenuSelect}
            onLogout={handleLogout}
          />
        );
      
      case 'balance':
        return currentAccount && (
          <BalanceScreen
            account={currentAccount}
            onBack={() => {
              handleBalance();
              setCurrentScreen('menu');
            }}
          />
        );
      
      case 'withdraw':
        return currentAccount && (
          <TransactionScreen
            account={currentAccount}
            type="withdraw"
            onTransaction={(amount) => handleTransaction(amount, 'withdraw')}
            onBack={() => setCurrentScreen('menu')}
          />
        );
      
      case 'deposit':
        return currentAccount && (
          <TransactionScreen
            account={currentAccount}
            type="deposit"
            onTransaction={(amount) => handleTransaction(amount, 'deposit')}
            onBack={() => setCurrentScreen('menu')}
          />
        );
      
      case 'statement':
        return currentAccount && (
          <StatementScreen
            account={currentAccount}
            transactions={atmService.getTransactionHistory(currentAccount.accountNumber)}
            onBack={() => setCurrentScreen('menu')}
          />
        );
      
      default:
        return (
          <LoginScreen
            onLogin={handleLogin}
            error={loginError}
            loading={loginLoading}
          />
        );
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;