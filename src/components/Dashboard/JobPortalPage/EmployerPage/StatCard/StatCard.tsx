interface StatCardProps {
  stat: {
    id: number;
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    change: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  return (
    <div className="bg-white border border-neutral-55 shadow rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-40">{stat.title}</p>
          <p className="text-2xl font-bold text-neutral-90 mt-1">{stat.value}</p>
        </div>
        <div className={`p-2.5 rounded-xl ${stat.color}`}>
          {stat.icon}
        </div>
      </div>
      <p className="text-xs text-neutral-40 mt-3">{stat.change}</p>
    </div>
  );
};

export default StatCard;