import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from './Breadcrumbs.module.scss'

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((segment) => segment);

  if (location.pathname === "/") {
    return null;
  }
  return (
    <nav className={style.breadcrumbs}>
      <Link to="/">Home</Link>
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <span key={index}>
            {" > "}
            {isLast ? (
              <span>{decodeURIComponent(segment)}</span>
            ) : (
              <Link to={path}>{decodeURIComponent(segment)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
