import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from '../auth/options';
import img from '../../components/images/1.png'

export default function Header() {
  return (
    <header id="header">
      <Link className="title" to="/">
        <img src={img} width="150" height="50"/>
      </Link>
      <AuthOptions></AuthOptions>
    </header>
  );
}
