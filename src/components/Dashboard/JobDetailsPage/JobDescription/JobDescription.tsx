interface JobDescriptionProps {
  description: string;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ description }) => {
  return (
    <div className="bg-white border border-neutral-55 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-neutral-90 mb-3">About This Job</h3>
      <p className="text-sm text-neutral-50 leading-relaxed">{description}</p>
    </div>
  );
};

export default JobDescription;