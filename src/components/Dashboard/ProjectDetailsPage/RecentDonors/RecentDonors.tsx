/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoPeopleOutline } from "react-icons/io5";

const RecentDonors = ({recentDonors}) => {
  return (
    <div className="bg-white rounded-4xl p-6 border border-slate-100 shadow-sm">
      <h4 className="text-sm font-bold text-neutral-5 mb-4 flex items-center gap-2">
        <IoPeopleOutline className="text-primary-5" />
        Recent Donations
      </h4>
      <div className="space-y-4">
        {recentDonors?.map((donor:any, i:any) => (
          <div
            key={i}
            className="flex justify-between items-center text-sm border-b border-neutral-55 pb-3 last:border-0 last:pb-0"
          >
            <div>
              <p className="font-bold text-neutral-5">{donor.name}</p>
              <p className="text-[10px] text-neutral-10">{donor.time}</p>
            </div>
            <p className="font-bold text-primary-5">{donor.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDonors;
