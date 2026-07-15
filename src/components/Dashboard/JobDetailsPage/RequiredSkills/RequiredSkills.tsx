interface RequiredSkillsProps {
  skills: string[];
}

const RequiredSkills: React.FC<RequiredSkillsProps> = ({ skills }) => {
  return (
    <div className="bg-white border border-neutral-55 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-neutral-90 mb-3">Required Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-primary-10/10 text-primary-10 text-sm font-medium rounded-lg"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RequiredSkills;