import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import Home from "../../pages/Home/Home.jsx";
import About from "../../pages/About/About.jsx";
import MaleATeam from "../../pages/Teams/MaleATeam.jsx/MaleATeam.jsx";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/maleateam" element={<MaleATeam />} />
        </Route>
      </Routes>
    </>
  );
}
