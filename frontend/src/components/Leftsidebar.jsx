import React from 'react';
import '../App.css';

const Leftsidebar = ({ todos,toggleSideBarState }) => {
  // Create separate arrays for each list
  const personalTodos = todos.filter(todo => todo.list === 'personal');
  const workTodos = todos.filter(todo => todo.list === 'work');
  const othersTodos = todos.filter(todo => todo.list === 'others');

  return (
    
    <div className={`${toggleSideBarState==true?"open-sidebar":"close-sidebar"} left-side-bar md:w-[25rem] lg:w-[25rem] h-screen overflow-y-scroll fixed left-0 md:block lg:block md:static lg:static text-gray-300 bg-[#252525] rounded-lg z-10 list-none transition-all duration-100`}>
      <div className="logo">
        <h1 className='text-center text-5xl mt-3 font-bold'>FastTodo</h1>
      </div>
      <h2 className='text-left ml-2 mt-16 mb-5 text-2xl font-semibold'>My Lists</h2>
      <div className='p-4'>
        <div className="list ">
          <p className='text-xl font-bold my-2'>Personal</p>
          <div className="list-items w-full pl-2">
            {/* Map through personalTodos to render personal todos */}
            {personalTodos.length==0?`No todos in "personal" category`:``}
            {personalTodos.map(todo => (
              <div key={todo._id} className="list-item transition-all font-semibold hover:bg-[#f5c66a] p-3 rounded hover:cursor-pointer">{todo.text}</div>
            ))}
          </div>
        </div>
        <div className="list ">
        <p className='text-xl font-bold my-2'>Work</p>
          <div className="list-items pl-2">
            {/* Map through workTodos to render work todos */}
            {workTodos.length==0?`No todos in "work" category`:``}
            {workTodos.map(todo => (
              <div key={todo._id} className="list-item transition-all font-semibold hover:bg-[#f5c66a] p-3 rounded hover:cursor-pointer">{todo.text}</div>
            ))}
          </div>
        </div>
        <div className="list ">
        <p className='text-xl font-bold my-2'>Others</p>
          <div className="list-items pl-2">
            {/* Map through othersTodos to render others todos */}
            {othersTodos.length==0?`No todos in "others" category`:``}
            {othersTodos.map(todo => (
              
              <div key={todo._id} className="list-item transition-all font-semibold hover:bg-[#f5c66a] p-3 rounded hover:cursor-pointer">{todo.text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftsidebar;
