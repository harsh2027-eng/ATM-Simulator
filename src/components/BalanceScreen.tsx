import React from 'react';
import { DollarSign, ArrowLeft, TrendingUp, Calendar } from 'lucide-react';
import { Account } from '../types/account';

interface BalanceScreenProps {
  account: Account;
  onBack: () => void;
}

export default function BalanceScreen({ account, onBack }: BalanceScreenProps) {
  const lastTransaction = account.transactionHistory
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Account Balance</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-8 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-green-100 text-sm">Available Balance</p>
                <p className="text-sm text-green-200">Account: ****{account.accountNumber.slice(-4)}</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          
          <div className="text-center py-8">
            <p className="text-5xl font-bold mb-2">${account.balance.toFixed(2)}</p>
            <p className="text-green-200">Current Available Balance</p>
          </div>
          
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-green-200">Account Type</p>
              <p className="font-semibold capitalize">{account.accountType}</p>
            </div>
            <div className="text-right">
              <p className="text-green-200">Minimum Balance</p>
              <p className="font-semibold">${account.minimumBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Balance Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Balance Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Available for Withdrawal</p>
                <p className="text-lg font-semibold text-green-600">
                  ${(account.balance - account.minimumBalance).toFixed(2)}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Minimum Balance Required</p>
                <p className="text-lg font-semibold text-blue-600">${account.minimumBalance.toFixed(2)}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Last Transaction */}
        {lastTransaction && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Last Transaction</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  lastTransaction.type === 'deposit' 
                    ? 'bg-green-500' 
                    : lastTransaction.type === 'withdrawal'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
                }`}>
                  {lastTransaction.type === 'deposit' && <ArrowLeft className="w-5 h-5 text-white rotate-180" />}
                  {lastTransaction.type === 'withdrawal' && <ArrowLeft className="w-5 h-5 text-white" />}
                  {lastTransaction.type === 'balance_check' && <DollarSign className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{lastTransaction.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {lastTransaction.timestamp.toLocaleDateString()} at {lastTransaction.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-semibold ${
                  lastTransaction.type === 'deposit' 
                    ? 'text-green-600' 
                    : lastTransaction.type === 'withdrawal'
                    ? 'text-red-600'
                    : 'text-blue-600'
                }`}>
                  {lastTransaction.type === 'deposit' && '+'}
                  {lastTransaction.type === 'withdrawal' && '-'}
                  {lastTransaction.amount > 0 ? `$${lastTransaction.amount.toFixed(2)}` : 'Inquiry'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}