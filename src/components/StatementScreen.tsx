import React from 'react';
import { ArrowLeft, FileText, ArrowUpRight, ArrowDownLeft, DollarSign, Calendar, Download } from 'lucide-react';
import { Account, Transaction } from '../types/account';

interface StatementScreenProps {
  account: Account;
  transactions: Transaction[];
  onBack: () => void;
}

export default function StatementScreen({ account, transactions, onBack }: StatementScreenProps) {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowUpRight className="w-4 h-4" />;
      case 'withdrawal':
        return <ArrowDownLeft className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'withdrawal':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const formatAmount = (transaction: Transaction) => {
    if (transaction.type === 'balance_check') return 'Inquiry';
    const sign = transaction.type === 'deposit' ? '+' : '-';
    return `${sign}$${transaction.amount.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Mini Statement</h1>
          </div>
        </div>

        {/* Statement Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Account Statement</h2>
              <p className="text-gray-500">Account: ****{account.accountNumber.slice(-4)}</p>
              <p className="text-gray-500">Generated: {new Date().toLocaleDateString()}</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold text-green-600">${account.balance.toFixed(2)}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="text-lg font-semibold text-blue-600 capitalize">{account.accountType}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-lg font-semibold text-purple-600">{transactions.length}</p>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-4">
            <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
            <p className="text-purple-100 text-sm">Last 10 transactions</p>
          </div>

          {transactions.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getTransactionColor(transaction.type)}`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {transaction.timestamp.toLocaleDateString()} at {transaction.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${
                        transaction.type === 'deposit' 
                          ? 'text-green-600' 
                          : transaction.type === 'withdrawal'
                          ? 'text-red-600'
                          : 'text-blue-600'
                      }`}>
                        {formatAmount(transaction)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Balance: ${transaction.balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statement Footer */}
        <div className="mt-6 bg-white rounded-lg p-4 text-center text-sm text-gray-500">
          <p>This is a computer-generated mini statement. For detailed statements, please visit our branch or use online banking.</p>
        </div>
      </div>
    </div>
  );
}