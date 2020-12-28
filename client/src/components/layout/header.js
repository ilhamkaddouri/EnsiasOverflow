import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from '../auth/options';


export default function Header() {
  return (
    <header id="header">
      <Link className="title" to="/">
        Home Page
      </Link>
      <AuthOptions></AuthOptions>
    </header>
  );
}
