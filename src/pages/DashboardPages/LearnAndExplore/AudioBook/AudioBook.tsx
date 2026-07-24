import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import NewArrivals from "../../../../components/Dashboard/LearnAndExplorePages/AudioBookPage/NewArrivals/NewArrivals";
import MostPopular from "../../../../components/Dashboard/LearnAndExplorePages/AudioBookPage/MostPopular/MostPopular";
import PeopleAlsoLike from "../../../../components/Dashboard/LearnAndExplorePages/AudioBookPage/PeopleAlsoLike/PeopleAlsoLike";

const AudioBook = () => {
  return (
    <div className="font-Manrope space-y-8">
      {/* Header */}
      <DashboardHeading
        title="Audio Books"
        description="Explore our various spiritual audio books."
      />

      <NewArrivals />
      <MostPopular />
      <PeopleAlsoLike />
    </div>
  );
};

export default AudioBook;
