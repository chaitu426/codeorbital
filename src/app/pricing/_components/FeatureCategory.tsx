const FeatureCategory = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => (
  <div className="flex flex-col space-y-6 bg-gradient-to-b from-[#1a1a2e] to-[#111] p-6 rounded-lg shadow-lg">
    <h3 className="text-lg font-bold text-white tracking-wide">{label}</h3>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
);

export default FeatureCategory;
