"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import donationImage2 from "@/public/Image/donation2.jpg"

const PRESET_AMOUNTS = [10, 20, 50, 100];

const MOMO_NETWORKS = [
  { id: 'mtn', name: 'MTN Mobile Money', color: 'bg-amber-400 text-slate-900 border-amber-400' },
  { id: 'telecel', name: 'Telecel Cash', color: 'bg-red-600 text-white border-red-600' },
  { id: 'at', name: 'AT Money', color: 'bg-blue-600 text-white border-blue-600' },
];

// Placeholder configured details for the 2 banks & USSD
const BANK_ACCOUNTS = [
  {
    id: 1,
    bankName: "Bank of Africa",
    accountName:"MaryMaud Charity",
    branch:"Octagon",
    accountNumber: "01908350011"
  },
  {
    id: 2,
    bankName: "Access Bank",
    ccountName:"MaryMaud Charity",
    branch:"Octagon",
    accountNumber: "1046000005211"
  },
];

const USSD_DETAILS = {
  code: "*713*7595#",
  merchantName: "Mary Maud Charity",
  instructions: [
    "Dial the USSD code on your mobile phone.",
    "Select Option 1 (Make Payment / Donation).",
    "Enter your desired donation amount.",
    "Confirm payment by entering your Mobile Money PIN."
  ]
};

export default function DonationForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form States
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [network, setNetwork] = useState<string>('mtn');

  // Donor Details
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Validation & UI States
  const [amountError, setAmountError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedUssd, setCopiedUssd] = useState<boolean>(false);

  const formatGHS = (val: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
    setAmountError('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setIsCustom(true);
    
    const numericVal = parseFloat(val);
    if (!val) {
      setSelectedAmount(null);
      setAmountError('Please enter a custom donation amount.');
    } else if (isNaN(numericVal) || numericVal <= 0) {
      setSelectedAmount(null);
      setAmountError('Please enter a valid amount greater than GHS 0.');
    } else {
      setSelectedAmount(numericVal);
      setAmountError('');
    }
  };

  const validatePhone = (input: string) => {
    if (!input.trim()) return 'Mobile Money phone number is required.';
    const ghPhoneRegex = /^(\+233|0)[235][0-9]{8}$/;
    if (!ghPhoneRegex.test(input.replace(/\s+/g, ''))) {
      return 'Please enter a valid Ghanaian phone number (e.g., 0241234567 or +233241234567).';
    }
    return '';
  };

  const handleNextFromStep1 = () => {
    if (!selectedAmount || selectedAmount <= 0) {
      setAmountError('Please select or enter a valid donation amount.');
      return;
    }
    setAmountError('');
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    const err = validatePhone(phone);
    if (err) {
      setPhoneError(err);
      return;
    }
    setPhoneError('');
    setCurrentStep(3);
  };

  const handleCopyAccount = async (accNum: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(accNum);
        setCopiedAccount(accNum);
        setTimeout(() => setCopiedAccount(null), 3000);
      }
    } catch {
      // Fallback
    }
  };

  const handleCopyUssd = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(USSD_DETAILS.code);
        setCopiedUssd(true);
        setTimeout(() => setCopiedUssd(false), 3000);
      }
    } catch {
      // Fallback
    }
  };

  const activeDisplayAmount = selectedAmount && selectedAmount > 0 ? formatGHS(selectedAmount) : 'GHS 0.00';
  const selectedNetworkObj = MOMO_NETWORKS.find((n) => n.id === network);

  return (
    <section id="donation-form" className="py-16 md:py-20 lg:py-24 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* MAIN MOBILE MONEY DONATION CARD */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT COLUMN: Wider Image & Mission Summary (No Blue Tint) */}
          <div className="lg:col-span-6 relative bg-[#242653] text-white p-8 lg:p-12 flex flex-col justify-between min-h-[420px] lg:min-h-full">
            <Image
              src={donationImage2}
              alt="Mary Maud Charity community support"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242653] via-[#242653]/40 to-transparent pointer-events-none"></div>

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#E91E63]/30 border border-[#E91E63]/50 text-[#FCE7F3] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                Mobile Money Donation
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white drop-shadow-sm">
                Your Support Changes Lives.
              </h2>
              <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal drop-shadow-sm">
                Every Mobile Money contribution directly helps vulnerable children and families across Ghana with health, education, and essential support.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/20 space-y-2">
              <span className="block text-xs text-gray-300">Selected Donation:</span>
              <span className="text-2xl font-black text-[#FCE7F3]">{activeDisplayAmount}</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Mobile Money Flow */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
            
            <div>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#E91E63] uppercase tracking-wider">
                    {currentStep === 3 ? "Confirmation" : `Step ${currentStep} of 2`}
                  </span>
                  <span className="text-xs font-semibold text-[#6B7280]">
                    {currentStep === 1 && "Choose Amount & Network"}
                    {currentStep === 2 && "MoMo Details"}
                    {currentStep === 3 && "Payment Status"}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#E91E63] transition-all duration-300 ease-out"
                    style={{ width: `${currentStep === 3 ? 100 : (currentStep / 2) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* STEP 1: AMOUNT & NETWORK SELECTION */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#20213A]">
                      Select Amount & Network
                    </h3>
                    <p className="text-xs text-[#6B7280] mt-1">
                      Choose your contribution and preferred Mobile Money provider in Ghana.
                    </p>
                  </div>

                  {/* Preset Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRESET_AMOUNTS.map((amt) => {
                      const isSelected = !isCustom && selectedAmount === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handlePresetSelect(amt)}
                          className={`py-3.5 px-4 rounded-xl text-sm font-bold transition-all border text-center focus:outline-none focus:ring-2 focus:ring-[#E91E63] ${
                            isSelected
                              ? 'bg-[#E91E63] text-white border-[#E91E63] shadow-md shadow-[#E91E63]/20 scale-[1.02]'
                              : 'bg-white text-[#20213A] border-gray-200 hover:border-[#E91E63]/50 hover:bg-[#FCE7F3]/30'
                          }`}
                        >
                          GHS {amt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label htmlFor="custom-amount" className="block text-xs font-semibold text-[#6B7280] mb-1.5">
                      Or enter a custom amount
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-semibold text-gray-500">
                        GHS
                      </span>
                      <input
                        id="custom-amount"
                        type="number"
                        min="1"
                        step="any"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="Enter custom amount"
                        className={`w-full pl-14 pr-4 py-3 rounded-xl border text-sm text-[#20213A] focus:outline-none focus:ring-2 focus:ring-[#E91E63] ${
                          isCustom && amountError
                            ? 'border-rose-500 bg-rose-50/30'
                            : isCustom
                            ? 'border-[#E91E63] bg-[#FCE7F3]/20'
                            : 'border-gray-200 bg-white'
                        }`}
                      />
                    </div>
                    {amountError && (
                      <p className="text-xs text-rose-500 mt-1.5 font-medium" role="alert">{amountError}</p>
                    )}
                  </div>

                  {/* Network Selection */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#20213A] mb-2">
                      Select Mobile Money Network
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {MOMO_NETWORKS.map((net) => {
                        const isSelected = network === net.id;
                        return (
                          <button
                            key={net.id}
                            type="button"
                            onClick={() => setNetwork(net.id)}
                            className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#E91E63] ${
                              isSelected
                                ? 'border-[#E91E63] bg-[#FCE7F3]/40 text-[#20213A] ring-2 ring-[#E91E63]/30'
                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            <span className={`w-3 h-3 rounded-full border ${net.color}`}></span>
                            <span>{net.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PHONE & DONOR NAME */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#20213A]">
                      Enter Mobile Money Details
                    </h3>
                    <p className="text-xs text-[#6B7280] mt-1">
                      Enter the phone number registered with your {selectedNetworkObj?.name}.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="full-name" className="block text-xs font-semibold text-[#20213A] mb-1">
                        Full Name <span className="text-xs text-gray-400">(Optional)</span>
                      </label>
                      <input
                        id="full-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Kwame Mensah"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone-number" className="block text-xs font-semibold text-[#20213A] mb-1">
                        Mobile Money Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="phone-number"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (phoneError) setPhoneError('');
                        }}
                        placeholder="0241234567 or 0201234567"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#E91E63] ${
                          phoneError ? 'border-rose-500 bg-rose-50/20' : 'border-gray-200'
                        }`}
                      />
                      {phoneError && (
                        <p className="text-xs text-rose-500 mt-1" role="alert">{phoneError}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#FCE7F3]/30 border border-[#E91E63]/20 p-4 rounded-xl text-xs text-[#20213A]">
                    <p className="font-semibold text-[#E91E63]">MoMo Prompt Notice:</p>
                    <p className="mt-0.5 text-gray-600">
                      When automated processing goes live, a payment prompt will automatically appear on your phone screen to enter your PIN.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 3: PROTOTYPE NOTICE */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center py-4 space-y-3">
                    <div className="w-12 h-12 bg-[#FCE7F3] rounded-full flex items-center justify-center text-[#E91E63] mx-auto">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M12 6v6m8 0a8 8 0 11-16 0 8 8 0 0116 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#20213A]">
                      MoMo Payment Integration Pending
                    </h3>
                    <p className="text-sm text-[#6B7280] max-w-md mx-auto leading-relaxed">
                      Thank you! Direct automated Mobile Money checkout for <strong className="text-[#20213A]">{activeDisplayAmount}</strong> on <strong className="text-[#20213A]">{phone}</strong> will be active soon once payment gateway approval is complete.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600">
                    <p className="font-semibold text-[#20213A]">Need to transfer or dial USSD immediately?</p>
                    <p className="mt-0.5">Please check the USSD code and Bank Transfer options right below this form.</p>
                  </div>
                </div>
              )}
            </div>

            {/* CONTROLS (BACK & NEXT BUTTONS) */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              {currentStep > 1 && currentStep < 3 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="inline-flex items-center text-sm font-semibold text-[#242653] hover:text-[#E91E63] transition-colors focus:outline-none px-3 py-2 rounded-lg"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              )}

              {currentStep === 1 && <div></div>}

              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={handleNextFromStep1}
                  className="inline-flex items-center bg-[#E91E63] hover:bg-[#D81B60] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-[#E91E63]/20 focus:outline-none"
                >
                  <span>Next: MoMo Details</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={handleNextFromStep2}
                  className="inline-flex items-center bg-[#E91E63] hover:bg-[#D81B60] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-[#E91E63]/20 focus:outline-none"
                >
                  <span>Proceed to Pay</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {currentStep === 3 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full inline-flex items-center justify-center bg-[#242653] hover:bg-[#1C1E42] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all focus:outline-none"
                >
                  Back to Donation Form
                </button>
              )}
            </div>

          </div>

        </div>

        {/* ALTERNATIVE PAYMENT METHODS GRID (USSD & 2 BANK ACCOUNTS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* USSD CODE CARD */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                Quick USSD Dial
              </div>
              <h3 className="text-xl font-bold text-[#20213A]">
                Donate via USSD Code
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Dial our shortcode on any network in Ghana to donate instantly without using internet data.
              </p>

              {/* USSD Box */}
              <div className="bg-[#FCE7F3]/40 border border-[#E91E63]/30 rounded-2xl p-4 flex items-center justify-between mt-2">
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    USSD Code
                  </span>
                  <span className="text-2xl font-mono font-black text-[#242653]">
                    {USSD_DETAILS.code}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUssd}
                  className="px-4 py-2 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs font-semibold transition-all focus:outline-none shadow-sm"
                >
                  {copiedUssd ? "Copied!" : "Copy Code"}
                </button>
              </div>

              {/* Quick Steps */}
              <div className="pt-2">
                <span className="block text-xs font-bold text-[#20213A] mb-2">How it works:</span>
                <ol className="space-y-1.5 text-xs text-gray-600 list-decimal list-inside">
                  {USSD_DETAILS.instructions.map((step, idx) => (
                    <li key={idx} className="leading-tight">{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 italic pt-2 border-t border-gray-100">
              *Works across MTN, Telecel, and AT networks.
            </p>
          </div>

          {/* MULTIPLE BANK ACCOUNTS CARD */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 space-y-5 shadow-sm">
            <div className="space-y-1">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                Direct Transfer
              </div>
              <h3 className="text-xl font-bold text-[#20213A]">
                Official Bank Accounts
              </h3>
              <p className="text-xs text-[#6B7280]">
                Transfer your donation directly into any of Mary Maud Charity&apos;s two official bank accounts below.
              </p>
            </div>

            {/* Grid for 2 Bank Accounts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {BANK_ACCOUNTS.map((acc) => (
                <div key={acc.id} className="bg-[#242653] text-white rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-md">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs text-[#FCE7F3] font-bold">{acc.bankName}</span>
                      <span className="text-[10px] text-gray-300 bg-white/10 px-2 py-0.5 rounded">Option {acc.id}</span>
                    </div>

                    <div>
                      <span className="block text-[11px] text-gray-300">Account Name</span>
                      <span className="text-xs font-semibold text-white">{acc.accountName}</span>
                    </div>

                    <div>
                      <span className="block text-[11px] text-gray-300">Account Number</span>
                      <span className="text-sm font-mono font-bold text-[#FCE7F3] tracking-wider">
                        {acc.accountNumber}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[11px] text-gray-300">Branch</span>
                      <span className="text-xs text-gray-200">{acc.branch}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyAccount(acc.accountNumber)}
                    className="w-full py-2 rounded-xl bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs font-semibold transition-all focus:outline-none"
                  >
                    {copiedAccount === acc.accountNumber ? "Copied!" : "Copy Number"}
                  </button>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-500 italic pt-2 border-t border-gray-100">
              Please verify account details before completing a bank transfer.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}