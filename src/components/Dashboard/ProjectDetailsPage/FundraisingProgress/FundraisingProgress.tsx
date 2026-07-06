interface FundraisingStats {
  raised: number;
  goal: number;
  currency?: string;
}

const FundraisingProgress = ({ 
  raised, 
  goal, 
  currency = "₹" 
}: FundraisingStats) => {
  const percentage = Math.min((raised / goal) * 100, 100);
  
  const formatCurrency = (amount: number) => {
    return `${currency} ${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-3 border border-neutral-55 bg-white p-4 rounded-2xl">
      {/* Stats Row - Better aligned */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-neutral-60 text-xs font-medium uppercase tracking-wider">
              Raised
            </p>
            <p className="text-neutral-90 text-xl font-bold">
              {formatCurrency(raised)}
            </p>
          </div>
          <div className="w-px h-8 bg-neutral-30" />
          <div>
            <p className="text-neutral-60 text-xs font-medium uppercase tracking-wider">
              Goal
            </p>
            <p className="text-neutral-90 text-xl font-bold">
              {formatCurrency(goal)}
            </p>
          </div>
        </div>
        <div className="bg-primary-10/10 px-3 py-1.5 rounded-full">
          <span className="text-primary-10 font-bold text-sm">
            {Math.round(percentage)}% Funded
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="w-full h-2.5 bg-neutral-30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-linear-to-r from-primary-10 to-primary-20 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Remaining Amount */}
      <div className="flex justify-end">
        <p className="text-xs text-neutral-60">
          {formatCurrency(goal - raised)} remaining to reach goal
        </p>
      </div>
    </div>
  );
};

export default FundraisingProgress;