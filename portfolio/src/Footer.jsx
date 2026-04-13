import React from 'react'

const Footer = () => {
  const date = new Date();

  return (
    <div className="p-2 text-center bg-footer-bg text-nav-text">

      <p>Copyright &copy; {date.getFullYear()}</p>
    </div>
  )
}

export default Footer
