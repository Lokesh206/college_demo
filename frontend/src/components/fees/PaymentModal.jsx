import React, { useState } from 'react';
import { CreditCard, CheckCircle, ShieldCheck, X, Download, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

export default function PaymentModal({ studentId, balanceAmount, onSuccess, onClose }) {
  const [amount, setAmount] = useState(balanceAmount > 0 ? balanceAmount : 20000);
  const [method, setMethod] = useState('upi'); // upi, card, netbanking
  const [upiId, setUpiId] = useState('student@okaxis');
  const [loading, setLoading] = useState(false);
  const [completedTxn, setCompletedTxn] = useState(null);
  const [error, setError] = useState(null);

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const modeLabel = method === 'upi' ? `Sandbox UPI (${upiId})` : method === 'card' ? 'Sandbox Card Payment' : 'Sandbox NetBanking (HDFC Bank)';
      const res = await api.processSandboxPayment({
        student_id: studentId,
        amount: parseFloat(amount),
        payment_mode: modeLabel
      });

      setCompletedTxn(res.transaction);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (onSuccess) onSuccess(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white p-5 flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-serif text-white">Online Fee Payment Portal</h3>
              <p className="text-[11px] text-gold-400 font-medium">Sandbox Gateway Simulator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {completedTxn ? (
            <div className="text-center py-4 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-navy-950 font-serif">Payment Successful!</h4>
              <p className="text-xs text-slate-600">
                Your payment of <strong className="text-slate-900">₹ {completedTxn.amount.toLocaleString()}</strong> has been verified.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Receipt No:</span>
                  <span className="font-bold text-navy-950">{completedTxn.receipt_no}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono text-slate-700">{completedTxn.transaction_ref}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="text-slate-700">{completedTxn.payment_mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-emerald-600">Verified & Reconciled</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={api.getReceiptPdfUrl(completedTxn.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official PDF Receipt</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed">
                <span className="font-bold">Sandbox Environment:</span> This is a mock payment integration for demo purposes. No real bank accounts or credit cards are charged.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm font-bold text-slate-500">₹</span>
                  <input
                    type="number"
                    max={balanceAmount}
                    min={100}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="w-full pl-8 pr-3 py-2 text-sm font-bold rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Maximum payable balance: ₹ {balanceAmount.toLocaleString()}
                </p>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Sandbox Method
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setMethod('upi')}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition ${
                      method === 'upi'
                        ? 'border-navy-950 bg-navy-50 text-navy-950 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('card')}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition ${
                      method === 'card'
                        ? 'border-navy-950 bg-navy-50 text-navy-950 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Credit / Debit
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('netbanking')}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition ${
                      method === 'netbanking'
                        ? 'border-navy-950 bg-navy-50 text-navy-950 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Net Banking
                  </button>
                </div>
              </div>

              {method === 'upi' && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Virtual Payment Address (VPA / UPI ID)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none"
                    placeholder="student@okaxis"
                  />
                </div>
              )}

              {method === 'card' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    defaultValue="4111 2222 3333 4444"
                    disabled
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-600 font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      defaultValue="12/28"
                      disabled
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-600 font-mono"
                    />
                    <input
                      type="password"
                      defaultValue="123"
                      disabled
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-600 font-mono"
                    />
                  </div>
                </div>
              )}

              {method === 'netbanking' && (
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  Simulating direct checkout via <strong>HDFC Corporate Gateway</strong>.
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || amount <= 0}
                  className="w-full py-3 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-gold-500" />
                      <span>Verifying Sandbox Payment...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Pay ₹ {parseFloat(amount || 0).toLocaleString()} Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

