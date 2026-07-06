import TempleImages from "../../../components/Dashboard/SanathanSthalDetailsPage/TempleImages/TempleImages";
import TempleInformation from "../../../components/Dashboard/SanathanSthalDetailsPage/TempleInformation/TempleInformation";
import TempleVideos from "../../../components/Dashboard/SanathanSthalDetailsPage/TempleVideos/TempleVideos";
import Breadcrumb from "../../../components/Reusable/Breadcrumb/Breadcrumb";

const SanatanSthalDetails = () => {
  return (
    <div className="font-Manrope space-y-12">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          {
            label: "Temple Details",
            path: "/dashboard/sanatan-sthal/1",
            isActive: true,
          },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT COLUMN: INFORMATION */}
        <TempleInformation />

        {/* RIGHT COLUMN: IMAGE GALLERY */}
        <TempleImages />
      </div>

      {/* VIDEOS SECTION */}
      <TempleVideos />
    </div>
  );
};

export default SanatanSthalDetails;
