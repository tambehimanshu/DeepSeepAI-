import React, { use } from 'react'
import { LogOut, X } from 'lucide-react'


import Cookies from "js-cookie";
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sidebar({isMobile = false, onclose}) { 
  const user=JSON.parse(localStorage.getItem("user"));
 // console.log(user);
   const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

   const handleLogout = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); // 👈 Get the user before removing it

    const { data } = await axios.get(
      "http://localhost:3323/api/v1/user/logout",
      {
        withCredentials: true,
      }
    );

    // ✅ Remove prompt history specific to this user
    if (user?._id) {
      console.log("Removing prompt history for user:", user?._id);

      localStorage.removeItem(`promtHistory_${user._id}`);
    }

    // ✅ Clear other stored data
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    alert(data.message);

    setAuthUser(null);
    navigate("/login");
  } catch (error) {
    alert(error?.response?.data?.errors || "Logout Failed");
  }
};

  

  return (
<>
<div className={`hidden md:flex h-full w-full  flex-col  bg-[#232327] text-white p-4 ${isMobile ? 'top-0 left-0 z-50 w-64 md:hidden':'hidden md:flex'}`}> 

    {/* header */}
    <div className=' p-4 border-b border-gray-700 flex items-center justify-between '> 
        <div className='text-xl font-bold text-white'>Deepseek</div>
        { isMobile &&(
          <button onClick={onclose}>
            <X className='text-gray-300 w-6 h-6'/>
          </button>
        )}

        <button><X className='text-gray-300 w-6 h-6'/></button>
    </div>

    {/* history */}

    <div className='flex-1 overflow-y-auto px-4 py-3 space-y-2'>
        <button className='w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl mb-4'>New Chat</button>
        <div className='text-gray-500 text-sm mt-20 text-center'>  No chat history yet</div>
    </div>



    {/* settings / footer */}

    <div className='p-4 border-t border-gray-700 '>
        <div className='flex flex-col gap-3'>
            <div className=' flex items-center gap-2 cursor-pointer '>
                <img  className='rounded-full    w-8 h-8' src="ec" alt="ds" />
                <span className='text-gray-300'>{user? user.firstName:"My Profile"}</span>
            </div>
            <button className=' flex items-center gap-2 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 duration-300 transition' onClick={handleLogout}><LogOut className=''/> Logout</button>
        </div>
    </div>
</div>
</>
  )
}

export default Sidebar