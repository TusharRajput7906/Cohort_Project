import React from 'react'
import NewTask from './NewTask';
import Completed from './Completed';
import Accepted from './Accepted';
import Failed from './Failed';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const EmployeeDashBoard = ({data}) => {
    // console.log(data);
    const [userData, setUserData] = useContext(AuthContext);
    
    // Handle case where data might be "admin" string or missing properties
    const firstName = data?.firstName || "User";
    const taskNumber = data?.taskNumber || { active: 0, completed: 0, accepted: 0, failed: 0, newTask: 0 };
    const tasks = data?.tasks || [];
    
    function logOutUser(){
        localStorage.setItem("loggedInUser",'')
        window.location.reload();
    }

    const markTaskCompleted = (taskIndex) => {
        const updatedData = [...userData];
        const employeeIndex = updatedData.findIndex(emp => emp.id === data.id);
        
        if (employeeIndex !== -1) {
            const task = updatedData[employeeIndex].tasks[taskIndex];
            task.active = false;
            task.completed = true;
            task.failed = false;
            task.newTask = false;
            
            // Update task counts
            updatedData[employeeIndex].taskNumber.active = Math.max(0, updatedData[employeeIndex].taskNumber.active - 1);
            updatedData[employeeIndex].taskNumber.completed += 1;
            
            setUserData(updatedData);
        }
    };

    const markTaskFailed = (taskIndex) => {
        const updatedData = [...userData];
        const employeeIndex = updatedData.findIndex(emp => emp.id === data.id);
        
        if (employeeIndex !== -1) {
            const task = updatedData[employeeIndex].tasks[taskIndex];
            task.active = false;
            task.completed = false;
            task.failed = true;
            task.newTask = false;
            
            // Update task counts
            updatedData[employeeIndex].taskNumber.active = Math.max(0, updatedData[employeeIndex].taskNumber.active - 1);
            updatedData[employeeIndex].taskNumber.failed += 1;
            
            setUserData(updatedData);
        }
    };

    const acceptTask = (taskIndex) => {
        const updatedData = [...userData];
        const employeeIndex = updatedData.findIndex(emp => emp.id === data.id);
        
        if (employeeIndex !== -1) {
            const task = updatedData[employeeIndex].tasks[taskIndex];
            task.active = true;
            task.completed = false;
            task.failed = false;
            task.newTask = false;
            
            // Update task counts
            updatedData[employeeIndex].taskNumber.newTask = Math.max(0, updatedData[employeeIndex].taskNumber.newTask - 1);
            updatedData[employeeIndex].taskNumber.active += 1;
            updatedData[employeeIndex].taskNumber.accepted += 1;
            
            setUserData(updatedData);
        }
    };
  return (
    <div className='h-screen p-6 flex flex-col gap-8'>
        {/* <h1>{data.id}</h1> */}
      <header className='flex items-center justify-between'>
        <span className='text-2xl font-bold '>Hello <h1>{firstName} 🖐️</h1></span>
        <button onClick={()=>{
            logOutUser();
        }} className='bg-red-600 px-4 py-2 rounded-xl active:scale-97'>Log Out</button>
      </header>
      <center className='flex gap-4'>
        <div className='w-[45%] bg-blue-300 h-30 rounded-2xl flex p-8'>
            <span className=' flex flex-col items-start text-2xl font-bold'>{taskNumber.newTask || 0}<h3>New Task</h3></span>
        </div>
        <div className='w-[45%] bg-green-300 h-30 rounded-2xl flex p-8'>
            <span className=' flex flex-col items-start text-2xl font-bold'>{taskNumber.completed}<h3>Complete Task</h3></span>
        </div>
        <div className='w-[45%] bg-amber-300 h-30 rounded-2xl flex p-8'>
            <span className=' flex flex-col items-start text-2xl font-bold'>{taskNumber.accepted}<h3>Accepted Task</h3></span>
        </div>
        <div className='w-[45%] bg-red-300 h-30 rounded-2xl flex p-8'>
            <span className=' flex flex-col items-start text-2xl font-bold'>{taskNumber.failed}<h3>Failed Task</h3></span>
        </div>
      </center>
      <footer className='flex gap-4 overflow-x-auto'>
        {tasks.map((elem,idx)=>{
            if(elem.active){
                return <Accepted key={idx} data={elem} index={idx} onComplete={markTaskCompleted} onFail={markTaskFailed}/>
            }
            if(elem.completed){
                return <Completed key={idx} data={elem} />
            }
            if(elem.failed){
                return <Failed key={idx} data={elem} />
            }
            if(elem.newTask){
                return <NewTask key={idx} data={elem} index={idx} onAccept={acceptTask} />
            }
        })}
      </footer>
    </div>
  )
}

export default EmployeeDashBoard
