interface ISearchStudent {
    searchString: string
}

const SearchStudent: React.FC<ISearchStudent> = ({ searchString }) => {
  return (
    <>
      <main className="flex flex-col p-5 space-y-5 rounded-md bg-sky-200 md:border-4 border-sky-500 font-plex-sans">
        <span className="text-lg text-center font-plex-sans-medium">Search Student</span>
        <div className="flex justify-between items-center space-x-3">
          <label htmlFor="email_id">Email ID</label>
          <input id="email_id" className="p-2 rounded-md" onChange={e => (searchString = e.target.value)} value={searchString}/>
        </div>
        <button className="w-full py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium duration-500 hover:bg-blue-500">Search Student</button>
      </main>
    </>
  );
};

export default SearchStudent;
