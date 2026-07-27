import { useParams } from "react-router-dom";
import TempleImages from "../../../../components/Dashboard/SanathanSthalDetailsPage/TempleImages/TempleImages";
import TempleInformation from "../../../../components/Dashboard/SanathanSthalDetailsPage/TempleInformation/TempleInformation";
import TempleVideos from "../../../../components/Dashboard/SanathanSthalDetailsPage/TempleVideos/TempleVideos";
import Breadcrumb from "../../../../components/Reusable/Breadcrumb/Breadcrumb";
import { useGetSingleTempleQuery } from "../../../../redux/Features/Temple/templeApi";
import LogoLoader from "../../../../components/Shared/LogoLoader/LogoLoader";

const SanatanSthalDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleTempleQuery(id);
  const templeData = data?.data || {};

  if (isLoading) return <LogoLoader />;
  return (
    <div className="font-Manrope space-y-12">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          {
            label: "Sanatan Sthal",
            path: `/dashboard/sanatan-sthal`,
          },
          {
            label: templeData?.basicInfo?.templeName,
            path: `/dashboard/sanatan-sthal/${id}`,
            isActive: true,
          },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT COLUMN: INFORMATION */}
        <TempleInformation data={templeData} />

        {/* RIGHT COLUMN: IMAGE GALLERY */}
        <TempleImages images={templeData?.media?.imageUrls} />
      </div>

      {/* VIDEOS SECTION */}
      <TempleVideos videos={templeData?.media?.videoUrls} />
    </div>
  );
};

export default SanatanSthalDetails;
