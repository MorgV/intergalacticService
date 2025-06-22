import { NavLink } from "react-router-dom";
import { type FC } from "react";
import style from "./Header.module.css";

const routes = [
  { path: '/', label: 'CSV Аналитик', icon: "/images/install.svg" },
  { path: '/generation', label: 'CSV Генератор', icon: "/images/circle.svg" },
  { path: '/history', label: 'История', icon: "/images/time.png" },
];

export const HeaderSelector: FC = () => {
  return (
    <ul className={style.wrapper}>
      {routes.map(({ path, label, icon }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? `${style.selector} ${style.active}` : style.selector
            }
          >
            <img width="25" height="25" src={icon} alt={`${label} icon`} />
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
