interface RequiredSkillsProps {
  requiredSkills: string;
}

const RequiredSkills: React.FC<RequiredSkillsProps> = ({ requiredSkills }) => {
  return (
    <div className="bg-white border border-neutral-55 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-neutral-90 mb-3">Required Skills</h3>
      <p className="text-sm text-neutral-50 leading-relaxed">{requiredSkills}</p>
    </div>
  );
};

export default RequiredSkills;