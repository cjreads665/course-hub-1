import React from "react";
import { useParams } from "react-router-dom";
import useStore from "../context/useStore";
import NavTabs from "./NavTabs";

const StudentsEnrolledInCourse = () => {
  const { user, theme } = useStore();
  const { id } = useParams();

  const mainDivStyles = `${
    theme ? "bg-slate-800 text-white" : "bg-white"
  } py-8 px-16`;
  return (
    <div className={`${mainDivStyles}`}>
      <NavTabs id={id} />
    </div>
  );
};

export default StudentsEnrolledInCourse;
