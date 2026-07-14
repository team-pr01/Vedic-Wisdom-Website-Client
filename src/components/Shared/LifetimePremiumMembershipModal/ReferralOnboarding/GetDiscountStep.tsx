const GetDiscountStep = () => {
  return (
    <div className="space-y-6">
      {/* Discount Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-90">
            Unlock 30% Premium Discount
          </h3>
          <p className="text-sm text-neutral-60 mt-0.5">
            Complete the process to get your discount
          </p>
        </div>
        <span className="text-xs font-medium text-primary-10 bg-primary-10/10 px-3 py-1 rounded-full">
          Step 4 of 4
        </span>
      </div>

      {/* Discount Card */}
      <div className="bg-linear-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 text-center">
        <div className="inline-block bg-primary-10/20 px-4 py-1 rounded-full mb-3">
          <span className="text-primary-10 text-sm font-bold">✨ 30% OFF</span>
        </div>
        <h4 className="text-xl font-bold text-neutral-90">
          Lifetime Premium Membership
        </h4>
        <p className="text-sm text-neutral-60 mt-2 max-w-md mx-auto">
          Unlock 30% off on your premium subscription by completing the referral
          process.
        </p>
      </div>

      {/* Action */}
      <div className="bg-white border border-neutral-20 rounded-xl p-4">
        <p className="text-sm font-medium text-neutral-90 mb-2">What's next?</p>
        <p className="text-sm text-neutral-60">
          Share your referral code with at least 2 friends. When they join using
          your code, your 30% lifetime discount will be unlocked automatically!
        </p>
      </div>
    </div>
  );
};

export default GetDiscountStep;
