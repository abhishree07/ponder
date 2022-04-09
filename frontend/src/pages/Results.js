const Results = (props) => {
  const { code } = props;

  return (
    <>
      <div className="min-h-screen mt-10 text-2xl">
        <div className="bg-white p-6 rounded-md mx-12">
          <div className="flex flex-row gap-2 pb-4">
            <div className="bg-red-500 h-4 w-4 rounded-full"></div>
            <div className="bg-yellow-500 h-4 w-4 rounded-full"></div>
            <div className="bg-green-500 h-4 w-4 rounded-full"></div>
          </div>
          {code}
        </div>
      </div>
    </>
  );
};

export default Results;
