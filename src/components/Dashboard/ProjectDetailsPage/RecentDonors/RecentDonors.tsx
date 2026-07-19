/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoPeopleOutline } from "react-icons/io5";
import type { TDonor } from "../../../../types/project.type";
import { formatDate } from "../../../../utils/formatDate";

const RecentDonors = ({
  currency,
  donors,
}: {
  currency: string;
  donors: TDonor[];
}) => {
  return (
    <div className="bg-white rounded-4xl p-6 border border-slate-100 shadow-sm">
      <h4 className="text-sm font-bold text-neutral-5 mb-4 flex items-center gap-2">
        <IoPeopleOutline className="text-primary-5" />
        Recent Donations
      </h4>
      <div className="space-y-4">
        {donors?.map((donor: any, i: any) => (
          <div
            key={i}
            className="flex justify-between items-center text-sm border-b border-neutral-55 pb-3 last:border-0 last:pb-0"
          >
            <div>
              <p className="font-bold text-neutral-5">{donor?.name}</p>
              <p className="text-[10px] text-neutral-10">
                {formatDate(donor?.donatedAt)}
              </p>
            </div>
            <p className="font-bold text-primary-5">
              {currency}
              {donor?.amount}
            </p>
          </div>
        ))}
      </div>

      {donors?.length === 0 && (
        <p className="text-sm text-neutral-60 mt-4">No donations made yet</p>
      )}
    </div>
  );
};

export default RecentDonors;
