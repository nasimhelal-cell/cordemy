const SectionHeader = ({ span, h2, p }) => {
  return (
    <div className="flex flex-col text-center gap-2">
      <span className="text-lg font-medium"> {span}</span>
      <h2 className="text-2xl"> {h2}</h2>
      <p className="w-3/5 mx-auto text-gray-500">{p}</p>
    </div>
  );
};

export default SectionHeader;
