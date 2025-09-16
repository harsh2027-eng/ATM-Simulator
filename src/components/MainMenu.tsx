import React from 'react';
import { DollarSign, ArrowDownLeft, ArrowUpRight, FileText, LogOut, User } from 'lucide-react';
import { Account } from '../types/account';

interface MainMenuProps {
  account: Account;
  onSelectOption: (option: string) => void;
  onLogout: () => void;
}

export default function MainMenu({ account, onSelectOption, onLogout }: MainMenuProps) {
  const menuItems = [
    {
      id: 'balance',
      title: 'Check Balance',
      description: 'View current balance',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700'
    },
    {
      id: 'withdraw',
      title: 'Withdraw Cash',
      description: 'Withdraw money',
      icon: ArrowDownLeft,
      color: 'from-red-500 to-pink-600',
      hoverColor: 'hover:from-red-600 hover:to-pink-700'
    },
    {
      id: 'deposit',
      title: 'Deposit Cash',
      description: 'Add money to account',
      icon: ArrowUpRight,
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700'
    },
    {
      id: 'statement',
      title: 'Mini Statement',
      description: 'Recent transactions',
      icon: FileText,
      color: 'from-purple-500 to-violet-600',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-sm text-gray-500">Account: ****{account.accountNumber.slice(-4)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold text-green-600">${account.balance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectOption(item.id)}
                className={`bg-gradient-to-r ${item.color} ${item.hoverColor} p-6 rounded-2xl shadow-lg text-white transform transition-all duration-200 hover:scale-105 hover:shadow-xl`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{account.accountType}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Minimum Balance</p>
              <p className="text-lg font-semibold text-gray-900">${account.minimumBalance.toFixed(2)}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-lg font-semibold text-gray-900">{account.transactionHistory.length}</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={onLogout}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}