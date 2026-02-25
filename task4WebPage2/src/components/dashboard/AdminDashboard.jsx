import React from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import { useState } from "react";
const AdminDashboard = () => {
  function logOutUser() {
    localStorage.setItem("loggedInUser", "");
    window.location.reload();
  }
  const [userData,setUserData] = useContext(AuthContext);
  // console.log(authData.employees);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [asignTo, setAsignTo] = useState("");
  const [category, setCategory] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    
    // Create the task object with correct property names
    const task = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      categories: [category], // Make it an array
      active: false,
      newTask: true,
      failed: false,
      completed: false
    };

    // Clear form
    setTaskTitle('');
    setTaskDate('');
    setTaskDescription('');
    setAsignTo('');
    setCategory('');

    const data = [...userData]; // Create a copy
    let employeeFound = false;

    // Check if employee exists
    data.forEach((element) => {
      if (asignTo === element.firstName) { 
        element.tasks.push(task);   
        // Initialize newTask count if it doesn't exist
        if (!element.taskNumber.newTask) {
          element.taskNumber.newTask = 0;
        }
        element.taskNumber.newTask = element.taskNumber.newTask + 1;    
        employeeFound = true;
      }
    });

    // If employee doesn't exist, create new employee
    if (!employeeFound) {
      const newEmployee = {
        id: data.length + 1,
        firstName: asignTo,
        name: `${asignTo} Employee`,
        email: `${asignTo.toLowerCase()}@example.com`,
        password: "123",
        taskNumber: { active: 0, completed: 0, failed: 0, accepted: 0, newTask: 1 },
        tasks: [task]
      };
      data.push(newEmployee);
    }
    
    // Update the context
    setUserData(data);

    // Persist to localStorage
    localStorage.setItem('employees', JSON.stringify(data));
    
  }

  return (
    <div className=" p-6  flex flex-col gap-6 ">
      <header className="flex items-center justify-between">
        <span className="text-2xl font-bold ">
          Hello <h1>Tushar 🖐️</h1>
        </span>
        <button
          onClick={() => {
            logOutUser();
          }}
          className="bg-red-600 px-4 py-2 rounded-xl active:scale-97"
        >
          Log Out
        </button>
      </header>
      <center className="flex h-fit bg-gray-300 w-full flex-1 gap-16 p-4">
        <form
          onSubmit={(e) => {
            submitHandler(e);            
          }}
          className="flex h-fit bg-gray-300 w-full flex-1 gap-16 p-4"
        >
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex flex-col items-start w-full">
              <label className="text-xl " htmlFor="UI">
                Task Title
              </label>
              <input value={taskTitle}
               onChange={(e)=>{
                setTaskTitle(e.target.value);
               }}
                className="border-2 outline-none text-xl w-full rounded-md px-2 "
                type="text"
                id="UI"
                placeholder="Make a UI design"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-xl " htmlFor="date">
                Date
              </label>
              <input value={taskDate}
               onChange={(e)=>{
                setTaskDate(e.target.value);
               }}
                className="border-2 outline-none text-xl w-full rounded-md px-2 "
                type="date"
                id="date"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-xl " htmlFor="emp_name">
                Asign to
              </label>
              <input value={asignTo}
               onChange={(e)=>{
                setAsignTo(e.target.value);
               }}
                className="border-2 outline-none text-xl w-full rounded-md px-2 "
                type="text"
                id="emp_name"
                placeholder="Employee name"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-xl " htmlFor="design">
                Category
              </label>
              <input value={category}
               onChange={(e)=>{
                setCategory(e.target.value);
               }}
                className="border-2 outline-none text-xl w-full rounded-md px-2 "
                type="text"
                id="design"
                placeholder="Design, dev, etc"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-8">
            <div className="flex flex-col items-start h-full">
              <label className="text-xl " htmlFor="description">
                Desription
              </label>
              <textarea value={taskDescription}
               onChange={(e)=>{
                setTaskDescription(e.target.value);
               }}
                className="border-2 outline-none text-xl w-full h-full rounded-md px-2 "
                id="description"
              />
            </div>
            <button className="w-full active:scale-97 text-2xl bg-green-700 py-1 rounded-2xl">
              Create Task
            </button>
          </div>
        </form>
      </center>
      <footer
        id="adminDashBoardFooter"
        className="flex flex-col gap-4 py-2 overflow-y-auto"
      >
        <div className="flex justify-between items-start text-center bg-red-300 py-3 px-4 text-xl font-medium rounded-xl">
          <h2>Employee Name</h2>
          <h4>New Task</h4>
          <h6>Active Task</h6>
          <h6>Completed</h6>
          <h6>Failed</h6>
        </div>
        <div
          id="adminDashBoardFooter1"
          className="flex flex-col gap-2 overflow-y-auto"
        >
          {userData.map((elem, idx) => {
            return (
              <div key={idx} className="flex justify-between items-start text-center  bg-red-300 py-3 px-4 text-xl font-medium rounded-xl">
                <h2>{elem.firstName}</h2>
                <h4 className="text-blue-600">{elem.taskNumber.accepted}</h4>
                <h6 className="text-black">{elem.taskNumber.active}</h6>
                <h6 className="text-green-700">{elem.taskNumber.completed}</h6>
                <h6 className="text-red-700">{elem.taskNumber.failed}</h6>
              </div>
            );
          })}
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
