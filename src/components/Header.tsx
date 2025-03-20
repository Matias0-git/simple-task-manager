
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-6 mb-8">
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 bg-apple-blue text-white p-2 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold">TaskFlow</h1>
        </div>
        
        <div>
          <span className="text-sm text-apple-text-secondary">
            Matias Mena Da Dalt
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
