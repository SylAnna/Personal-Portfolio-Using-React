import React from 'react'
import portfolioPic from "./assets/portfolio-pic.png"

const AboutMe = () => {
  return (
    <div id= "aboutMe" className="h-full bg-content-bg m-1  relative">

    <div>
     <div className="bg-nav-text border-10 border-solid border-nav-accent rounded-full w-80 h-80 m-auto mt-10  flex flex-col justify-center align-center p-5 z-50">
      <h1 className="text-page-content font-bold text-center text-[100px]">S</h1>
     </div>   
</div>

<h1 className=""> Sylvia</h1>



  <div className="hd:hidden flex flex-col m-10 gap-10 ">
     <p className="text-page-content bg-nav-text p-5 border rounded-lg">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt dolores sed ullam necessitatibus accusamus officia aliquam unde nemo, repudiandae voluptas perspiciatis neque deleniti tempora vero veritatis alias blanditiis similique dolorum?
     </p>
     
     <p className="text-page-content bg-nav-text p-5 border rounded-lg">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt dolores sed ullam necessitatibus accusamus officia aliquam unde nemo, repudiandae voluptas perspiciatis neque deleniti tempora vero veritatis alias blanditiis similique dolorum?
     </p>

     <span className="flex flex-rpw gap-10 justify-center align-center"><button className="bg-nav-bg text-nav-text border rounded-lg p-2 hover:bg-nav-accent duration-300 cursor-pointer hover:text-nav-bg">View My Projects</button> <button className="bg-nav-bg text-nav-text border rounded-lg p-2 hover:bg-nav-accent duration-300 cursor-pointer hover:text-nav-bg">Contact Me</button></span>
     </div>
    






    </div>
  )
}

export default AboutMe
