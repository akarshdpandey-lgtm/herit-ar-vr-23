import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, ExternalLink, CheckCircle2, AlertTriangle, Database } from 'lucide-react';

interface ProviderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProviderStatusModal: React.FC<ProviderStatusModalProps> = ({ isOpen, onClose }) => {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/providers/status');
        const json = await res.json();
        if (json.success) {
          setProviders(json.providers);
        }
      } catch (err) {
        console.error('Failed to load provider status', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative flex flex-col w-full max-w-2xl max-h-[85vh] rounded-2xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="border-b border-stone-100 bg-stone-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Transparent Data & Verification Integrity
              </h3>
              <p className="text-xs text-stone-700">
                Zero fake data • Fully compliant public APIs • Clear fare labels
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-200 hover:text-stone-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Mandate description card */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              <span>Anti-Fabrication & Legal Sourcing Policy</span>
            </div>
            <p className="leading-relaxed">
              HeritAR strictly forbids invented prices or unauthorized scraping. Every fare, price, and tariff displayed is categorized into:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[11px]">
              <li><b>Govt Official Tariff</b>: Calculated using official state Transport Department Gazette rate models.</li>
              <li><b>Publicly Listed Price</b>: Verified benchmark prices from public catalogs & OpenStreetMap tags.</li>
              <li><b>Estimated Range</b>: Mathematical traffic models; live deep links provided to verify before paying.</li>
              <li><b>Unavailable</b>: Clearly labeled when live data cannot be ethically and legally verified.</li>
            </ul>
          </div>

          {/* Providers List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Active Data Feeds & Services
            </h4>
            <div className="space-y-2">
              {providers.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50/50 p-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <span>{p.name}</span>
                      <span className="rounded bg-white px-1.5 py-0.2 text-[10px] font-medium text-stone-600 border border-stone-200">
                        {p.type}
                      </span>
                    </div>
                    {p.license && (
                      <div className="text-[11px] text-stone-700">License: {p.license}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="capitalize">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-100 bg-stone-50 px-6 py-3 text-right">
          <button
            onClick={onClose}
            className="rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-stone-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
