import { CSVColumns } from "./InterfaceColumns";

function ExportCSV() {
  return (
    <>
      <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md bg-sky-200 md:border-4 border-sky-500 shadow-lg space-y-5">
        <span className="text-lg font-plex-sans-medium">Avaliable columns</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-plex-sans">
          <label htmlFor="index" className="flex items-center p-2 hover:bg-white rounded-md space-x-3 cursor-pointer duration-300 checkbox">
            <input type="checkbox" id="index"/>
            <span>Index</span>
          </label>
          <label htmlFor="name" className="flex items-center p-2 hover:bg-white rounded-md space-x-3 cursor-pointer duration-300">
            <input type="checkbox" id="name"/>
            <span>Name</span>
          </label>
          <label htmlFor="email_id" className="flex items-center p-2 hover:bg-white rounded-md space-x-3 cursor-pointer duration-300">
            <input type="checkbox" id="email_id"/>
            <span>Email ID</span>
          </label>
          <label htmlFor="status" className="flex items-center p-2 hover:bg-white rounded-md space-x-3 cursor-pointer duration-300">
            <input type="checkbox" id="status"/>
            <span>Status</span>
          </label>
          <label htmlFor="remark" className="flex items-center p-2 hover:bg-white rounded-md space-x-3 cursor-pointer duration-300">
            <input type="checkbox" id="remark"/>
            <span>Remark</span>
          </label>
        </div>
        <button className="w-full py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium duration-500 hover:bg-blue-500">Export CSV</button>
      </main>
    </>
  );
};

export default ExportCSV;
