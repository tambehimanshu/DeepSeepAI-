
import axios from 'axios'


import React from 'react'
import { data, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

function Login() {
 const[formData, setFormData] = React.useState({
    
    email: '',
    password: '',
    })

    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const[,setAuthUser] = useAuth()

    const handleChange = (e) => {   
        const value = e.target.value;
        const name = e.target.name;

        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSingup=async()=> {
    setLoading(true);
    setError('');
        try {
          
    const {data} =await axios.post("http://localhost:3323/api/v1/user/login", {
      
        email: formData.email,
        password: formData.password
    }, {
        withCredentials: true
        
    });
  
alert(data.message || 'login successful'); 
localStorage.setItem("user", JSON.stringify(data.user));
localStorage.setItem("token", data.token);
setAuthUser(data.token);

//console.log(setAuthUser);
navigate('/login');
        
    }
    catch (error) {
           const msg = error?.response?.data?.errors || 'An error occurred during signup';
              setError(msg);
    }
    finally{
        setLoading(false);

    }

}



  return (
    <div className='min-h-screen flex items-center justify-center bg-black text-white px-4'>
        <div className='max-w-md w-full bg-[#1e1e1e] text-white p-6 rounded-2xl shadow-lg space-y-6'>
            {/* heading */}
            <h1 className='text-white items-center justify-center text-center'>Login</h1>

          
       
        {/* email */}
         <div className='mb-4 mt-2 '>
                <input type="email"
                name='email' 
                placeholder='enter your email'
                className='w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]'
                value={formData.email}
                onChange={handleChange}                />
            </div>
        {/* password */}
        <div className='relative mb-4 mt-2 '>
                <input type="password"
                name='password' 
                placeholder='password' 
                className='w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0] '
                value={formData.password}
                onChange={handleChange}
                />
                {/* <span className=' absolute right-3 top-3 text-gray-400'><Eye size={18}/></span> */}
            </div>
        {/* erroe msg */}
   {error && <p className='text-red-500 text-sm'>{error}</p >}
        {/* terms and conditions */}
        <p className='text-xs text-gray-400 mt-4 mb-6'>By signing up or logging in, you consent to DeepSeek's <a className='underline' href="#">terms of use</a> and <a className='underline' href="#">Privacy Policy</a></p>

        <button onClick={handleSingup} disabled={loading} className='w-full bg-[#7a6ff6] hover:bg-[#6c61a6] text-white px-4 py-2 rounded-md transition disable:opacity-50 '>
            {loading ? 'Signing up...' : 'Sign up'}
        </button>

        <div className=' flex justify-between mt-4 text-sm'>
            <a className='text-[#7a6ff6]  hover:underline' href="">Haven't account</a>
            <Link to={'/signup'} className='text-[#7a6ff6]  hover:underline'>Login</Link>
        </div>
         </div>

    </div>
  )
}

export default Login