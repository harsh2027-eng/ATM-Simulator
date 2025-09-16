import React, { useState } from 'react';
import { CreditCard, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { LoginCredentials } from '../types/account';

interface LoginScreenProps {
  onLogin: (credentials: LoginCredentials) => void;
  error: string | null;
  loading: boolean;
}

export default function LoginScreen({ onLogin, error, loading }: LoginScreenProps) {
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ accountNumber: accountNumber.trim(), pin });
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
    }
  };

  const clearPin = () => {
    setPin('');
  };

  const removeLastDigit = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">SecureBank ATM</h1>
            <p className="text-blue-100 text-sm">24/7 Banking Services</p>
          </div>

          {/* Form */}
          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your account number"
                    required
                  />
                </div>
              </div>

              {/* PIN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength={4}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
                    placeholder="****"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Virtual Keypad */}
              <div className="grid grid-cols-3 gap-1.5 bg-gray-50 p-3 rounded-lg">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handlePinInput(digit.toString())}
                    className="bg-white border border-gray-300 rounded-lg py-2 px-3 font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors text-sm"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearPin}
                  className="bg-red-50 border border-red-200 rounded-lg py-2 px-3 font-semibold text-red-600 hover:bg-red-100 transition-colors text-xs"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => handlePinInput('0')}
                  className="bg-white border border-gray-300 rounded-lg py-2 px-3 font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors text-sm"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={removeLastDigit}
                  className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 font-semibold text-gray-600 hover:bg-gray-100 transition-colors text-xs"
                >
                  ⌫
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-red-700 text-xs">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || accountNumber.length < 10 || pin.length < 4}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold text-base hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {loading ? 'Authenticating...' : 'Access Account'}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
              <Shield className="w-3 h-3 mr-1" />
              Secured with harsh encryption
            </div>

            {/* Sample Accounts */}
            <div className="mt-3 bg-blue-50 rounded-lg p-3">
              <h3 className="text-xs font-semibold text-blue-800 mb-1">Demo Accounts</h3>
              <div className="text-xs text-blue-600 space-y-0.5">
                <div>Account: 1234567890, PIN: 1234</div>
                <div>Account: 0987654321, PIN: 5678</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}