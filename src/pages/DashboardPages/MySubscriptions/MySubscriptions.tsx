import { FaCheckCircle, FaHistory, FaTimesCircle, FaCalendarAlt, FaReceipt } from "react-icons/fa";
import { useGetMySubscriptionQuery } from "../../../redux/Features/Subscription/subscriptionApi";
import LogoLoader from "../../../components/Shared/LogoLoader/LogoLoader";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import { formatDate } from "../../../utils/formatDate";

// Define types based on your provided data
type TSubscriptionPlan = {
  _id: string;
  name: string;
  description: string;
  features: string[];
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  isPopular: boolean;
};

type TMySubscription = {
  _id: string;
  userId: string;
  plan: TSubscriptionPlan;
  billingType: "monthly" | "yearly";
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled";
  transactionId: string;
  createdAt: string;
};

const MySubscriptions = () => {
  const { data, isLoading } = useGetMySubscriptionQuery({});
  
  // Handle the API response structure (assuming data?.data is the array based on your console log)
  const subscriptions: TMySubscription[] = data?.data?.subscriptions || [];

  if (isLoading) return <LogoLoader />;

  // Separate active and history
  const activeSubscription = subscriptions.find((sub) => sub.status === "active");
  const history = subscriptions
    .filter((sub) => sub.status !== "active")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="font-Manrope pb-20">
      <DashboardHeading
        title="My Subscriptions"
        description="Manage your active plan and view your billing history."
      />

      {/* Active Subscription Section */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-neutral-90 mb-4 flex items-center gap-2">
          <FaCheckCircle className="text-green-500" /> Active Plan
        </h3>
        
        {activeSubscription ? (
          <div className="bg-gradient-to-r from-primary-10/10 to-primary-20/5 border border-primary-10/20 rounded-2xl p-6 lg:p-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-10/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="flex flex-col lg:flex-row justify-between gap-8 relative z-10">
              {/* Plan Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-extrabold text-neutral-90">
                    {activeSubscription.plan.name}
                  </h2>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Active
                  </span>
                </div>
                <p className="text-neutral-60 text-sm max-w-lg mb-6">
                  {activeSubscription.plan.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  {activeSubscription.plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-lg border border-neutral-55/20">
                      <FaCheckCircle className="text-primary-10 text-xs" />
                      <span className="text-neutral-90 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Info */}
              <div className="w-full lg:w-72 bg-white rounded-xl p-5 shadow-sm border border-neutral-55/30 h-fit">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-neutral-50 font-medium uppercase tracking-wider">Amount Paid</p>
                    <p className="text-2xl font-bold text-neutral-90">
                      {activeSubscription.plan.currency}{" "}
                      {activeSubscription.billingType === "monthly"
                        ? activeSubscription.plan.monthlyPrice
                        : activeSubscription.plan.yearlyPrice}
                      <span className="text-sm font-normal text-neutral-50 ml-1">
                        / {activeSubscription.billingType}
                      </span>
                    </p>
                  </div>
                  
                  <div className="border-t border-neutral-55/20 pt-4">
                    <p className="text-xs text-neutral-50 font-medium uppercase tracking-wider mb-1">Next Billing Date</p>
                    <p className="text-sm font-bold text-neutral-90 flex items-center gap-2">
                      <FaCalendarAlt className="text-primary-10"/> 
                     {formatDate(activeSubscription.endDate)}
                    </p>
                  </div>

                  <div className="border-t border-neutral-55/20 pt-4">
                    <p className="text-xs text-neutral-50 font-medium uppercase tracking-wider mb-1">Transaction ID</p>
                    <p className="text-xs font-mono text-neutral-60 bg-neutral-55/30 px-2 py-1 rounded w-fit">
                      {activeSubscription.transactionId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-neutral-55/10 border border-neutral-55/30 rounded-2xl p-10 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <FaTimesCircle className="text-3xl text-neutral-40" />
            </div>
            <h3 className="text-xl font-bold text-neutral-90 mb-2">No Active Subscription</h3>
            <p className="text-neutral-50 text-sm max-w-sm mb-6">
              You currently don't have any active plan. Upgrade to premium to unlock all spiritual features.
            </p>
          </div>
        )}
      </div>

      {/* History Section */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-neutral-90 mb-4 flex items-center gap-2">
          <FaHistory className="text-neutral-60" /> Billing History
        </h3>

        {history.length > 0 ? (
          <div className="bg-white border border-neutral-55/40 rounded-2xl overflow-hidden shadow-sm">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-60">
                <thead className="bg-neutral-55/5 text-xs text-neutral-50 uppercase font-semibold border-b border-neutral-55/40">
                  <tr>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-55/20">
                  {history.map((sub) => (
                    <tr key={sub._id} className="hover:bg-neutral-55/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-neutral-90">
                        {sub.plan.name}
                        <span className="block text-xs font-normal text-neutral-50 capitalize">
                          {sub.billingType} billing
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(sub.createdAt)}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">
                        {sub.transactionId}
                      </td>
                      <td className="px-6 py-4 font-bold text-neutral-90">
                        {sub.plan.currency}{" "}
                        {sub.billingType === "monthly"
                          ? sub.plan.monthlyPrice
                          : sub.plan.yearlyPrice}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold capitalize ${
                          sub.status === "expired" 
                            ? "bg-red-50 text-red-600" 
                            : sub.status === "cancelled"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-neutral-100 text-neutral-600"
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col divide-y divide-neutral-55/20">
              {history.map((sub) => (
                <div key={sub._id} className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-neutral-90">{sub.plan.name}</h4>
                      <p className="text-xs text-neutral-50 capitalize mt-0.5">{sub.billingType} billing</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold capitalize ${
                      sub.status === "expired" ? "bg-red-50 text-red-600" : "bg-neutral-100 text-neutral-600"
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm bg-neutral-55/5 p-3 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-neutral-50">Date</span>
                      <span className="font-medium text-neutral-90">{formatDate(sub.createdAt)}</span>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                      <span className="text-xs text-neutral-50">Amount</span>
                      <span className="font-bold text-neutral-90">
                        {sub.plan.currency}{" "}
                        {sub.billingType === "monthly" ? sub.plan.monthlyPrice : sub.plan.yearlyPrice}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-neutral-50 flex items-center gap-2">
                    <FaReceipt /> Txn: <span className="font-mono">{sub.transactionId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center p-10 bg-white border border-neutral-55/30 rounded-2xl">
            <p className="text-neutral-50 font-medium">No past billing history found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubscriptions;