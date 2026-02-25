const employees = [
  {
    id: 1,
    firstName: "Amit",
    name: "Amit Sharma",
    email: "employee1@example.com",
    password: "123",
    taskNumber: { active: 1, completed: 1, failed: 1, accepted: 1, newTask: 0 },
    tasks: [
      {
        title: "Design Login Page",
        description: "Create UI for login page using React",
        date: "2026-01-10",
        categories: ["UI", "React"],
        active: true,
        completed: false,
        failed: false,
        newTask: true
      },
      {
        title: "Fix Navbar Bug",
        description: "Resolve alignment issue in navbar",
        date: "2026-01-12",
        categories: ["Bug", "CSS"],
        active: false,
        completed: true,
        failed: false,
        newTask: false
      },
      {
        title: "API Integration",
        description: "Integrate login API with frontend",
        date: "2026-01-15",
        categories: ["API", "Backend"],
        active: false,
        completed: false,
        failed: true,
        newTask: false
      }
    ]
  },

  {
    id: 2,
    firstName: "Rahul",
    name: "Rahul Verma",
    email: "employee2@example.com",
    password: "123",
    taskNumber: { active: 1, completed: 1, failed: 0, accepted: 1, newTask: 0 },
    tasks: [
      {
        title: "Create Dashboard",
        description: "Develop dashboard layout",
        date: "2026-01-11",
        categories: ["Dashboard", "UI"],
        active: true,
        completed: false,
        failed: false,
        newTask: true
      },
      {
        title: "Optimize Images",
        description: "Reduce image sizes for faster load",
        date: "2026-01-13",
        categories: ["Performance"],
        active: false,
        completed: true,
        failed: false,
        newTask: false
      },
      {
        title: "Write Unit Tests",
        description: "Add unit tests for components",
        date: "2026-01-16",
        categories: ["Testing", "Jest"],
        active: false,
        completed: false,
        failed: false,
        newTask: false
      }
    ]
  },

  {
    id: 3,
    firstName: "Neha",
    name: "Neha Gupta",
    email: "employee3@example.com",
    password: "123",
    taskNumber: { active: 1, completed: 1, failed: 0, accepted: 1, newTask: 0 },
    tasks: [
      {
        title: "Database Schema",
        description: "Design DB schema for users",
        date: "2026-01-09",
        categories: ["Database", "Design"],
        active: false,
        completed: true,
        failed: false,
        newTask: false
      },
      {
        title: "Auth Middleware",
        description: "Create authentication middleware",
        date: "2026-01-14",
        categories: ["Auth", "Backend"],
        active: true,
        completed: false,
        failed: false,
        newTask: true
      },
      {
        title: "Error Handling",
        description: "Handle API error responses",
        date: "2026-01-17",
        categories: ["API"],
        active: false,
        completed: false,
        failed: false,
        newTask: false
      }
    ]
  },

  {
    id: 4,
    firstName: "Priya",
    name: "Priya Singh",
    email: "employee4@example.com",
    password: "123",
    taskNumber: { active: 1, completed: 2, failed: 0, accepted: 2, newTask: 0 },
    tasks: [
      {
        title: "Prepare Documentation",
        description: "Write project documentation",
        date: "2026-01-08",
        categories: ["Docs"],
        active: false,
        completed: true,
        failed: false,
        newTask: false
      },
      {
        title: "Client Meeting",
        description: "Discuss requirements with client",
        date: "2026-01-12",
        categories: ["Meeting"],
        active: false,
        completed: true,
        failed: false,
        newTask: false
      },
      {
        title: "Requirement Changes",
        description: "Update features as per feedback",
        date: "2026-01-18",
        categories: ["Planning"],
        active: true,
        completed: false,
        failed: false,
        newTask: true
      }
    ]
  },

  {
    id: 5,
    firstName: "Rohit",
    name: "Rohit Kumar",
    email: "employee5@example.com",
    password: "123",
    taskNumber: { active: 1, completed: 1, failed: 0, accepted: 1, newTask: 0 },
    tasks: [
      {
        title: "Setup Project",
        description: "Initialize Vite + React project",
        date: "2026-01-07",
        categories: ["Setup"],
        active: false,
        completed: true,
        failed: false,
        newTask: false
      },
      {
        title: "Deploy App",
        description: "Deploy application on Netlify",
        date: "2026-01-14",
        categories: ["Deployment"],
        active: true,
        completed: false,
        failed: false,
        newTask: true
      },
      {
        title: "Monitor Errors",
        description: "Check logs and fix runtime errors",
        date: "2026-01-19",
        categories: ["Monitoring"],
        active: false,
        completed: false,
        failed: false,
        newTask: false
      }
    ]
  }
  // employees 6–8 follow the same pattern
];


const admin = [
  {
    "id": 101,
    "firstName": "Suresh",
    "name": "Suresh Mehta",
    "email": "admin@example.com",
    "password": "123"
  }
];


 export const setLocalStorage= ()=>{
    localStorage.setItem("employees",JSON.stringify(employees));
    localStorage.setItem("admin",JSON.stringify(admin));
 }
 export const getLocalStorage= ()=>{
  const employees=  JSON.parse(localStorage.getItem('employees'));
  const admin=  JSON.parse(localStorage.getItem('admin'));
 
  return {employees,admin}
 }