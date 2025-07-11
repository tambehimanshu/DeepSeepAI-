import { ArrowUp, Bot, Globe, Paperclip, Search } from "lucide-react";

import React,{useState} from "react";

function Promt() {
    const [inputValue, setInputValue] =useState(""); // for input field
    const[typeMessage, setTypeMessage] =useState(""); // once we hit the enter btn  /ArrowUp then the input must me push to typeMessage
 
     const handleSend=()=>{
        const trimmed = inputValue.trim();
        if(!trimmed) return; // if input is empty, do nothing
        setTypeMessage(trimmed); // set the message to typeMessage
        setInputValue(""); // clear the input field
      
 





     }
  return (
    <div className="flex flex-col items-center justify-between  w-full px-4 flex-1 pb-4">
      {/* greeting */}
      <div className=" mt-16 text-center
    "> 
        <div className="flex items-center justify-center gap-2 ">
          <img src="" alt="" />
          <h1 className="text-3xl font-semibold text-white mb-2">Hi , I'm DeepSeek</h1>
        </div>
        <p className="text-gray-400 text-base mt-2">How can I help you today?</p>
      </div>

      {/* promt  */}
      <div className='flex-1 max-w-4xl w-full overflow-y-auto mt-6 mb-4 space-y-4 max-h-[60vh] px-1' >
        {typeMessage && (
            <div className='w-full flex items-end justify-end'>
                <div className='text-white text-lg bg-blue-500 self-end max-w-[75%] rounded-xl px-4 py-2'>{typeMessage}</div>
            </div>
        )}
      
      </div>
      {/* input box */}
      <div className='w-full max-w-4xl relative mt-auto'>
        <div className='bg-[#2f2f2f] rounded-[2rem] px-6 py-8 shadow-md'>
          <input
            className='bg-transparent w-full text-white placeholder-gray-400 text-lg outline-none'
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}  
            placeholder="Ask Anything to DeepSeek"
          />
          <div className='flex items-center justify-between mt-4 gap-4'>
            <div className='flex gap-2'>
              <button className='flex items-center gap-2 border border-gray-500 px-3 py-1.5 rounded-full hover:bg-gray-600 transition duration-300'>
                <Bot  className='w-4 h-4'/>
                DeepThink (R1)
              </button>
              <button className=" flex items-center gap-2 border border-gray-500 px-3 py-1.5 rounded-full hover:bg-gray-600 transition duration-300">
                <Globe className="w-4 h-4" />
                Search
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white transition duration-300">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="bg-gray-500 hover:bg-blue-900 p-2 rounded-full text-white transition duration-300" onClick={handleSend}>
                <ArrowUp  className="w-4 h-4"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promt;
