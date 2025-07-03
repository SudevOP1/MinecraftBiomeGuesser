const OuterDiv = ({ maxWidth = "max-w-5xl", classname = "", children }) => {
  return (
    <div
      className="min-h-screen bg-gray-950 text-white p-8 flex
      flex-col items-center justify-center font-minecraft"
    >
      <div
        className={`w-full ${maxWidth} ${classname} bg-indigo-700/30 rounded-3xl
        shadow-2xl border-2 border-indigo-700 p-10 my-8`}
      >
        {children}
      </div>
    </div>
  );
};

export default OuterDiv;
