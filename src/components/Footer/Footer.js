import React from "react";

const Footer = () => {
    const date = new Date().getFullYear();
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-8">
      <div>
        <p>Copyright &copy; {date} - All right reserved by CarPartsBD</p>
      </div>
    </footer>
  );
};

export default Footer;
