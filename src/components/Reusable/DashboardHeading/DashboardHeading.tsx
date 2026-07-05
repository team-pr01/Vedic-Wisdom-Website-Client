const DashboardHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className="heading-dashboard">{title}</h2>
      <p className="description mt-1">{description}</p>
    </div>
  );
};

export default DashboardHeading;
