import React, { useState } from 'react';
import { ArrowLeft, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { Account } from '../types/account';

interface TransactionScreenProps {
  account: Account;
  type: 'withdraw' | 'deposit';
  onTransaction: (amount: number) => Promise<boolean>;
  onBack: () => void;
}

export default function TransactionScreen({ account, type, onTransaction, onBack }: TransactionScreenProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isWithdraw = type === 'withdraw';
  const maxWithdrawable = account.balance - account.minimumBalance;

  const quickAmounts = isWithdraw 
    ? [20, 50, 100, 200, 500].filter(amt => amt <= maxWithdrawable)
    : [50, 100, 200, 500, 1000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (isWithdraw && numAmount > maxWithdrawable) {
      setError(`Insufficient funds. Maximum withdrawal: $${maxWithdrawable.toFixed(2)}`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await onTransaction(numAmount);
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          onBack();
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
    setError('');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaction Successful!</h2>
          <p className="text-gray-600 mb-4">
            {isWithdraw 
              ? `$${amount} has been withdrawn from your account`
              : `$${amount} has been deposited to your account`
            }
          </p>
          <p className="text-sm text-gray-500">Redirecting to main menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${
      isWithdraw ? 'from-red-50 to-pink-100' : 'from-blue-50 to-indigo-100'
    } p-4`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isWithdraw ? 'Withdraw Cash' : 'Deposit Cash'}
          </h1>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold text-gray-900">${account.balance.toFixed(2)}</p>
            </div>
            {isWithdraw && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Available for Withdrawal</p>
                <p className="text-xl font-semibold text-green-600">${maxWithdrawable.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Transaction Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError('');
                  }}
                  step="0.01"
                  min="0.01"
                  className="w-full pl-12 pr-4 py-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Amounts</p>
              <div className="grid grid-cols-5 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => handleQuickAmount(quickAmount)}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      amount === quickAmount.toString()
                        ? `bg-gradient-to-r ${isWithdraw ? 'from-red-500 to-pink-600' : 'from-blue-500 to-indigo-600'} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ${quickAmount}
                  </button>
                ))}
              </div>
            </div>

            {/* Warning for Withdrawals */}
            {isWithdraw && amount && parseFloat(amount) > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <div className="text-sm text-amber-700">
                    <p className="font-semibold">Withdrawal Information</p>
                    <p>
                      Balance after withdrawal: ${(account.balance - parseFloat(amount)).toFixed(2)}
                    </p>
                    <p>
                      Minimum balance requirement: ${account.minimumBalance.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !amount || parseFloat(amount) <= 0}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                isWithdraw
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
              }`}
            >
              {loading 
                ? 'Processing...' 
                : `${isWithdraw ? 'Withdraw' : 'Deposit'} $${amount || '0.00'}`
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}