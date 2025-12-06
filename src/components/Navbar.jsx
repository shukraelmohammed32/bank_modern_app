import { useState, useEffect } from "react";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scrolling to add background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex py-4 px-6 justify-between items-center fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />

      {/* Desktop Navigation */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            onClick={() => setActive(nav.title)}
            className={`font-poppins font-medium cursor-pointer text-[16px] transition-colors ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />

        {/* Mobile Dropdown */}
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-[#0a0a0a]/95 backdrop-blur-xl absolute top-20 right-4 min-w-[160px] rounded-xl shadow-xl transition-all`}
        >
          <ul className="list-none flex flex-col justify-start items-start w-full">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                onClick={() => {
                  setActive(nav.title);
                  setToggle(false);
                }}
                className={`font-poppins font-medium cursor-pointer text-[16px] py-2 transition-colors ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index !== navLinks.length - 1 ? "mb-2" : "mb-0"}`}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
