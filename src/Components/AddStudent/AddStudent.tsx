function AddStudent() {
  return (
    <div className="flex flex-col p-5 space-y-5 rounded-md bg-sky-200 md:border-4 border-sky-500 font-plex-sans">
      <span className="text-lg text-center font-plex-sans-medium">Add Student</span>
      <div className="flex justify-between items-center space-x-3">
        <label htmlFor="student_id">ID</label>
        <input id="student_id" className="p-2 rounded-md"/>
      </div>
      <div className="flex justify-between items-center space-x-3">
        <label htmlFor="email_id">Email ID</label>
        <input type='email' id="email_id" className="p-2 rounded-md"/>
      </div>
      <div className="flex justify-between items-center space-x-3">
        <div className="space-x-3">
          <input name="status" type="radio" value="Present" id="present"/>
          <label htmlFor="present">Present</label>
        </div>
        <div className="space-x-3">
          <input name="status" type="radio" value="Leave" id="leave"/>
          <label htmlFor="leave">Leave</label>
        </div>
        <div className="space-x-3">
          <input name="status" type="radio" value="Absent" id="absent"/>
          <label htmlFor="absent">Absent</label>
        </div>
      </div>
      <button className="w-full py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium duration-500 hover:bg-blue-500">Add Student</button>
    </div>
  )
}

export default AddStudent;
