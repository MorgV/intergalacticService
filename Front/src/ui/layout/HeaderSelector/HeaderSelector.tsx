import { Link, useLocation } from "react-router-dom";
import { type FC } from "react";
import style from "./Header.module.css"

export const HeaderSelector: FC = () => {
  const location = useLocation();

  const routes = [
    { path: '/', label: 'CSV Аналитик', href: "/images/install.svg" },
    { path: '/generation', label: 'CSV Генератор', href: "/images/circle.svg" },
    { path: '/history', label: 'История', href: "/images/time.png" },
  ]
  // Так быть не должно routes
  return (
    <ul className={style.wrapper}>
      {routes.map(({ path, label, href }) =>
        label ? (
          <Selector key={path} path={path} href={href} label={label} isActive={location.pathname === path}
          />
        ) : null
      )}
    </ul>
  );
};


type SelectorProps = {
  path: string;
  href: string;
  label: string;
  isActive: boolean;
};

export const Selector: FC<SelectorProps> = ({ path, href, label, isActive }) => {
  return (
    <Link to={path ?? "/"} className={`${style.selector} ${isActive ? style.active : ''}`} key={path}>
      <img width="25px" height="25px" src={href} alt="img" />
      {label}
    </Link>

  )
}
