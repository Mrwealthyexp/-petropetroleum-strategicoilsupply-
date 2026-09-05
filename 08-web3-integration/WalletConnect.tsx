'use client';

import { useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';

export function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    setIsConnecting(true);
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) { alert('Install MetaMask'); return; }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
    } catch (e) { console.error(e); }
    setIsConnecting(false);
  };

  const disconnect = () => setAddress(null);

  if (address) return (
    <button onClick={disconnect} className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg">
      <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
      <span className="text-sm text-white font-mono">{address.slice(0,6)}...{address.slice(-4)}</span>
      <LogOut className="w-4 h-4 text-gray-500" />
    </button>
  );

  return (
    <button onClick={connect} disabled={isConnecting} className="flex items-center gap-2 px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg">
      <Wallet className="w-4 h-4 text-[#00ff88]" />
      <span className="text-sm text-[#00ff88] font-semibold">{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
    </button>
  );
}