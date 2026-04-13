import React from 'react'
import { useState } from 'react'

const Nav = ({theme,setTheme}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
   <nav className="relative bg-nav-bg w-full p-4 flex items-center justify-between gap-x-11 border-solid border-b border-nav-text shadow-nav-glow  ">
  

    <ul className="hidden md:flex flex-row gap-x-15 mx-auto">
        <a className ="text-nav-text hover:text-nav-accent "href="./AboutMe.jsx">About Me</a>
        <a className ="text-nav-text hover:text-nav-accent "href="./Education.jsx">Education</a>
        <a className = "text-nav-text hover:text-nav-accent" href="./Projects.jsx">Projects</a>
        <a className="text-nav-text hover:text-nav-accent" href="./Skills.jsx">Skills</a>
        <a className="text-nav-text hover:text-nav-accent" href="./Contact.jsx">Contact</a>
 
    </ul>

    <h1 className="pointer-events-none absolute left-1/2 -translate-x-[150px] text-nav-text font-bold text-xl md:text-3xl whitespace-nowrap md:hidden">
      Sylvia's Personal Portfolio
    </h1>

 <div className="relative md:hidden flex flex-row gap-x-5 ">
        <div 
        onClick={()=>setIsMenuOpen(!isMenuOpen)}
        className=" w-8 h-6 flex flex-col justify-between m-left gap-y-1 cursor-pointer md:hidden">
            <div className="w-full h-1 rounded bg-nav-text"></div>
            <div className=" w-full h-1 rounded bg-nav-text"></div>
            <div className=" w-full h-1 rounded bg-nav-text"></div>
            
        </div> 
    </div>

  {isMenuOpen && (
    <div>

           <div className="md:hidden absolute top-full left-0 w-full bg-nav-bg p-4 flex flex-col gap-y-4 ">
                <a className="text-nav-text hover:text-nav-accent border-solid border-nav-text border-b " href="">About Me</a>
                <a className="text-nav-text hover:text-nav-accent border-solid border-nav-text border-b" href="">Education</a>
                <a className="text-nav-text hover:text-nav-accent border-solid border-nav-text border-b" href="">Projects</a>
                <a className="text-nav-text hover:text-nav-accent border-solid border-nav-text border-b" href="">Skills</a>
                <a className="text-nav-text hover:text-nav-accent border-solid border-nav-text border-b" href="">Contact</a>
            </div>

      <div className="absolute right-17 bottom-3.5 md:hidden">
            <select 
            value={theme} onChange={(e) => setTheme(e.target.value)}
            className=" bg-nav-bg text-nav-text border-solid  border-b  p-2 w-full hover:text-nav-accent"
            >   <option value="" disabled hidden className=" m-1 text-center">Change Theme</option>
                <option value="dark"  className="bg-nav-bg text-nav-text m-1 text-center">Dark</option>
                <option value="cozy"  className="bg-nav-bg text-nav-text m-1 text-center">Cozy</option>
            </select>
        </div>
             
    </div>
  )}


   </nav>
  )
}

export default Nav
