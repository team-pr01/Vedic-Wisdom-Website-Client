/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaUser, FaClock } from "react-icons/fa";
import { useGetMyApplicationsQuery } from "../../../../redux/Features/Job/jobApplicationApi";
import { formatDate } from "../../../../utils/formatDate";
import { Link } from "react-router-dom";
import LogoLoader from "../../../../components/Shared/LogoLoader/LogoLoader";

const MyApplications = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const skip = (page - 1) * limit;

  const { data, isLoading } = useGetMyApplicationsQuery({ skip, limit });
  const applications = data?.data?.applications || [];
  const meta = data?.data?.meta || {};

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "applied":
        return {
          label: "Applied",
          className: "bg-blue-100 text-blue-700",
          icon: <FaClock className="text-blue-500" size={12} />,
        };
      case "shortlisted":
        return {
          label: "Shortlisted",
          className: "bg-purple-100 text-purple-700",
          icon: <FaClock className="text-purple-500" size={12} />,
        };
      case "hired":
        return {
          label: "Hired",
          className: "bg-green-100 text-green-700",
          icon: <FaClock className="text-green-500" size={12} />,
        };
      case "rejected":
        return {
          label: "Rejected",
          className: "bg-red-100 text-red-700",
          icon: <FaClock className="text-red-500" size={12} />,
        };
      case "withdrawn":
        return {
          label: "Withdrawn",
          className: "bg-gray-100 text-gray-700",
          icon: <FaClock className="text-gray-500" size={12} />,
        };
      default:
        return {
          label: status || "Applied",
          className: "bg-blue-100 text-blue-700",
          icon: <FaClock className="text-blue-500" size={12} />,
        };
    }
  };

  const getSalaryDisplay = (salary: any) => {
    if (!salary) return "—";
    if (salary.type === "paid") {
      return `${salary.currency} ${salary.minimum} - ${salary.maximum}`;
    }
    return salary.type || "Negotiable";
  };

  const getLocationDisplay = (location: any) => {
    if (!location) return "—";
    const parts = [location.city, location.state, location.country].filter(
      Boolean,
    );
    return parts.length > 0 ? parts.join(", ") : "—";
  };

  const handleWithdraw = (applicationId: string) => {
    // Implement withdraw logic
    console.log("Withdraw application:", applicationId);
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= (meta.totalPages || 1)) {
      setPage(newPage);
    }
  };

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-10 mb-4">
        My Applications ({meta?.total < 10 ? 0 : ""}
        {meta?.total || 0})
      </h2>

      <div className="mt-4 bg-white border border-neutral-20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-10/5 border-b border-neutral-20">
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Resume
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Applied On
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-neutral-40 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-20">
              {applications.length > 0 ? (
                applications.map((app: any) => {
                  const statusConfig = getStatusConfig(app.status);
                  const job = app.jobId || {};
                  const isWithdrawable =
                    app.status === "applied" || app.status === "pending";

                  return (
                    <tr key={app._id} className="text-neutral-10">
                      <td className="px-4 py-4">
                        <Link
                          to={`/dashboard/job/${job?._id}`}
                          className="font-medium line-clamp-1 underline"
                        >
                          {job.title || "—"}
                        </Link>
                        <p className="text-sm mt-0.5">
                          {getLocationDisplay(job.location)}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span>{getSalaryDisplay(job.salary)}</span>
                      </td>
                      <td className="px-4 py-4">
                        {app.resume ? (
                          <a
                            href={app.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            View Resume
                          </a>
                        ) : (
                          <span className="">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span>{formatDate(app.createdAt)}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}
                        >
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isWithdrawable && (
                            <button
                              onClick={() => handleWithdraw(app._id)}
                              className="px-3 py-1.5 font-medium text-accent-40 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              Withdraw Application
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className="text-center py-16">
                      <FaUser className="text-4xl text-neutral-30 mx-auto mb-3" />
                      <p className="text-neutral-60 font-medium">
                        No applications found
                      </p>
                      <p className="text-neutral-40 mt-1">
                        You haven't applied to any jobs yet
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {meta.totalPages > 0 && (
        <div className="mt-6 flex justify-end items-center gap-2">
          <div className="flex items-center gap-2 text-xs lg:text-sm">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className={`px-3 py-1.5 rounded-md border transition-colors ${
                page > 1
                  ? "border-primary-10 bg-primary-10 text-white hover:bg-primary-10/90 cursor-pointer"
                  : "border-neutral-55/60 text-neutral-50 cursor-not-allowed opacity-50"
              }`}
            >
              Prev
            </button>

            {meta.totalPages <= 5 ? (
              Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1.5 rounded-md border transition-colors ${
                      page === pageNum
                        ? "bg-primary-10 text-white border-primary-10"
                        : "border-neutral-55/60 hover:bg-primary-10 hover:text-white cursor-pointer"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )
            ) : (
              <>
                <button
                  onClick={() => goToPage(1)}
                  className={`px-3 py-1.5 rounded-md border transition-colors ${
                    page === 1
                      ? "bg-primary-10 text-white border-primary-10"
                      : "border-neutral-55/60 hover:bg-primary-10 hover:text-white cursor-pointer"
                  }`}
                >
                  1
                </button>

                {page > 3 && <span className="px-2 text-neutral-50">...</span>}

                {page > 2 && (
                  <button
                    onClick={() => goToPage(page - 1)}
                    className="px-3 py-1.5 rounded-md border border-neutral-55/60 hover:bg-primary-10 hover:text-white cursor-pointer"
                  >
                    {page - 1}
                  </button>
                )}

                {page !== 1 && page !== meta.totalPages && (
                  <button className="px-3 py-1.5 rounded-md border bg-primary-10 text-white border-primary-10">
                    {page}
                  </button>
                )}

                {page < meta.totalPages - 1 && (
                  <button
                    onClick={() => goToPage(page + 1)}
                    className="px-3 py-1.5 rounded-md border border-neutral-55/60 hover:bg-primary-10 hover:text-white cursor-pointer"
                  >
                    {page + 1}
                  </button>
                )}

                {page < meta.totalPages - 2 && (
                  <span className="px-2 text-neutral-50">...</span>
                )}

                {meta.totalPages > 1 && (
                  <button
                    onClick={() => goToPage(meta.totalPages)}
                    className={`px-3 py-1.5 rounded-md border transition-colors ${
                      page === meta.totalPages
                        ? "bg-primary-10 text-white border-primary-10"
                        : "border-neutral-55/60 hover:bg-primary-10 hover:text-white cursor-pointer"
                    }`}
                  >
                    {meta.totalPages}
                  </button>
                )}
              </>
            )}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= meta.totalPages}
              className={`px-3 py-1.5 rounded-md border transition-colors ${
                page < meta.totalPages
                  ? "border-primary-10 bg-primary-10 text-white hover:bg-primary-10/90 cursor-pointer"
                  : "border-neutral-55/60 text-neutral-50 cursor-not-allowed opacity-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
