import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ClipboardListIcon,
  HomeIcon,
  MenuIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/outline';

import '../../index.css';

export const HighResNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const classNameLi =
    'font-semibold text-md lg:text-3xl text-primary-5 hover:text-primary-4 absolute';
  const classNameNavLinks =
    'inline-flex justify-center items-center method p-1';
  const classNameIcon = 'w-7 h-7 mr-2';

  return (
    <nav
      className={`${useLocation().pathname === '/home' ? 'flex' : 'invisible'}`}
    >
      <button
        onClick={() => {
          if (isMenuOpen) {
            setTimeout(() => {
              setIsMenuOpen(false);
            }, 300);
            setIsAnimationActive(true);
          } else {
            setIsAnimationActive(false);
            setIsMenuOpen(true);
          }
        }}
        className="absolute left-16 top-1/2 -translate-y-1/2 rounded-full p-2 text-primary-5 bg-primary-1 hover:text-primary-4 transition duration-400 transform hover:scale-110"
        type="button"
        title="Menu"
      >
        <MenuIcon className="w-10 h-10" />
      </button>

      {isMenuOpen ? (
        <ul>
          <li
            className={`${classNameLi} left-16 top-2/10 transition duration-400 transform -translate-y-2/10 hover:scale-110`}
          >
            <NavLink
              to="/home"
              className={`${classNameNavLinks} ${
                isMenuOpen && `animate-fadeInTop`
              } ${isAnimationActive && 'animate-fadeOutTop'}`}
              title="Home"
            >
              <HomeIcon className={classNameIcon} />
              Home
              <span></span>
            </NavLink>
          </li>
          <li
            className={`${classNameLi} left-48 top-4/10 transition duration-400 transform -translate-y-4/10 hover:scale-110`}
          >
            <NavLink
              to="/home"
              className={`${classNameNavLinks} ${
                isMenuOpen && `animate-fadeInRight`
              } ${isAnimationActive && 'animate-fadeOutRight'}`}
              title="Projects"
            >
              <ClipboardListIcon className={classNameIcon} />
              Projects
              <span></span>
            </NavLink>
          </li>
          <li
            className={`${classNameLi} left-48 top-6/10 transition duration-400 transform -translate-y-6/10 hover:scale-110`}
          >
            <NavLink
              to="/home"
              className={`${classNameNavLinks} ${
                isMenuOpen && `animate-fadeInRight`
              } ${isAnimationActive && 'animate-fadeOutRight'}`}
              title="About Me"
            >
              <UserIcon className={classNameIcon} />
              About me
              <span></span>
            </NavLink>
          </li>
          <li
            className={`${classNameLi} left-16 top-8/10 transition duration-400 transform -translate-y-8/10 hover:scale-110`}
          >
            <NavLink
              to="/home"
              className={`${classNameNavLinks} ${
                isMenuOpen && `animate-fadeInBottom`
              }  ${isAnimationActive && 'animate-fadeOutBottom '}`}
              title="Contacts"
            >
              <StarIcon className={classNameIcon} />
              Contacts
              <span></span>
            </NavLink>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default HighResNav;
