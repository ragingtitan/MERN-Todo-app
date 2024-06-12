import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FiTrash2 } from "react-icons/fi";
import Leftsidebar from "./components/Leftsidebar";
import { FiEdit } from "react-icons/fi";
import { FiMenu } from 'react-icons/fi';
import { FiX } from 'react-icons/fi'; 
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [updateState, setupdateState] = useState(false);
  const [listName, setListName] = useState("personal");
const [toggleSideBarState, settoggleSideBar] = useState(false);

  const toggleSideBar = ()=>{
    settoggleSideBar(!toggleSideBarState);
  }
  const handleSelect = (event) => {
    setListName(event.target.value);
  };
  useEffect(() => {
    fetchTodos();
  }, []);


  const updateStateTodo=async (id)=>{
    try{
      const response=await fetch(`http://localhost:4000/api/todo/updatestate/`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({_id:id,state:true})
      });
      const data=await response.json();
      setupdateState(true)
      fetchTodos();
    }
    catch(error){
      console.log(error);
    }
  }
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/todo/");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    // Optimistic UI Update
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);

    try {
      const response = await fetch("http://localhost:4000/api/todo/delete/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Revert the change if the request fails
      setTodos((prevTodos) => [
        ...prevTodos,
        todos.find((todo) => todo._id === id),
      ]);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodoText === "") {
      alert("Please enter a todo!");
      return;
    }
    if (listName === "") {
      alert("Please select category!");
      return;
    }
    console.log(listName);
    try {
      const response = await fetch("http://localhost:4000/api/todo/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTodoText, list: listName }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodoText("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  const todoComplete = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        return todo._id === id ? { ...todo, completed: !todo.completed } : todo;
      });
    });
  };
  const currentDate = new Date();
  const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  
  function parseDate(date) {
    const dateTime = new Date(date);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    date = `${day}-${month}-${year}`;
    return date;
  }

  return (
    <>
      <div className="todo flex flex-row-reverse h-full">
        {/* <Sidebar  /> */}
        <div className="todo-wrapper justify-around w-full">
        <FiMenu onClick={toggleSideBar} className={`${toggleSideBarState?"hidden":"block"} w-8 h-8 z-50 text-white cursor-pointer hover:text-[#f5c66a] fixed top-6 left-2 md:hidden lg:hidden`}/>
        <FiX onClick={toggleSideBar} className={`${!toggleSideBarState?"hidden":"block"} w-8 h-8 z-50 text-white cursor-pointer hover:text-red-700 fixed top-6 left-60 md:hidden lg:hidden`}/>
          <Navbar />
          <form
            onSubmit={handleAddTodo}
            className="flex flex-col gap-10 items-center justify-center"
          >
            <div className="w-full flex flex-col sm:flex-col md:flex-col lg:flex-row gap-5 justify-center items-center my-10">
              <div className="flex h-12 md:h-[4rem] lg:h-[4rem] w-3/4 rounded px-4 focus:outline-none focus:bg-gray-700 items-center bg-[#252525] justify-between">
                <input
                  autoComplete="none"
                  type="text"
                  id="input-todo"
                  className="rounded h-12 md:h-[4rem] lg:h-[4rem] w-full focus:outline-none bg-[#252525] text-white border-none"
                  placeholder="Please add a todo"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                />
                {/* Pass setListName as a prop to Dropdown component */}
                <div className="flex items-center justify-center p-1 rounded text-black hover:cursor-pointer hover:border">
                  <select
                    className="w-4 bg-transparent"
                    value={listName}
                    onChange={handleSelect}
                  >
                    <option value="">Select an option</option>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="add-todo-btn hover:opacity-80 transition-all P-2 w-20 md:w-32 md:h-16 lg:w-32 lg:h-16 bg-[#252525] h-10 text-white rounded"
              >
                Add
              </button>
            </div>
          </form>
          <div className="w-full flex justify-center">
            <div className="todo-list max-h-5/6 overflow-y-scroll  flex gap-5 justify-start items-center flex-col">
              {todos.length === 0 ? (
                <p className="text-gray-500">No todos</p>
              ) : (
                todos.map((todo) => (
                  <div
                    className={`flex h-16 items-center justify-center transition-all  hover:opacity-90 text-black rounded w-full bg-[#252525] ${todo.isDone ? "bg-green-700 hover:opacity-80":"block hover:bg-[#f5c66a]"}`}
                    key={todo._id}
                  >
                    <div className="w-full justify-between gap-5 md:text-lg lg:text:md flex hover:cursor-pointer text-gray-300 p-3 items-center">
                      <div className="flex gap-5">
                        <input
                          type="checkbox"
                          onClick={() => {
                            todoComplete(todo._id);
                            updateStateTodo(todo._id);
                          }}
                          
                          className={`checkbox ${todo.isDone==true?"hidden":"block"} hover:cursor-pointer  md:w-5 lg:w-5 todo-item`}
                        />
                        <div className={`todo-info flex flex-col-reverse items-center justify-center `}>
                          <p
                            className={`text-left w-full ${
                              todo.isDone ? "line-through" : ""
                            }`}
                          >
                            {todo.text}
                          </p>
                          <p
                            className={`text-sm font-medium text-left w-full ${new Date(todo.date) < currentDateWithoutTime && todo.isDone==false?"text-red-700":""}`}
                          >
                            {
                              parseDate(todo.date)
                            }
                            {`\t#`+todo.list}
                            
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className={`edit-btn ${todo.isDone==true?"hidden":""}`}>
                          <FiEdit />
                        </div>
                        <div
                          onClick={() => {
                            handleDeleteTodo(todo._id);
                          }}
                          className="delete-btn hover:text-red-700 transition-all duration-200"
                        >
                          <FiTrash2 />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <Leftsidebar toggleSideBarState={toggleSideBarState} todos={todos} />
        
      </div>
    </>
  );
}

export default App;
