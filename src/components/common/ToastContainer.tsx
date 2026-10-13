import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-4 h-4 text-[#2764B4] shrink-0" />;
        let borderClass = 'border-[#2764B4]/30 bg-white';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-4 h-4 text-[#16835D] shrink-0" />;
          borderClass = 'border-[#16835D]/30 bg-white';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
          borderClass = 'border-amber-400/40 bg-white';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-[#C62828] shrink-0" />;
          borderClass = 'border-[#C62828]/40 bg-white';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto shadow-lg rounded-xl p-3 border ${borderClass} flex items-start gap-2.5 transition-all animate-in slide-in-from-bottom-2 duration-200`}
          >
            {icon}
            <div className="text-xs text-[#17231E] font-medium leading-relaxed flex-1">
              {toast.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};
