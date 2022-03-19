import { useState, useEffect } from "react";
import { postPrint } from "../bluePrint/bpContextPrint";
// import { getAllCoursesOfUser, allInstructorCourses } from "../service/fetch/courseApi";
// import {
//   getAssignmentsOfUser,
//   getAllAssignmentsOfInstructor,
// } from "../service/fetch/assignmentApi";
import { useQuery } from "@apollo/client";
import { allCoursesQuery } from "../graphql/Queries";

const Store = () => {
  /* Define All States */
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [allCoursesData, setAllCoursesData] = useState([]);
  const [allCoursesLoading, setAllCoursesLoading] = useState(true);
  const [posts, setPosts] = useState(postPrint);
  const [myCourses, setMyCourses] = useState([]);
  const [assignments, setAssignments] = useState({});

  /* Define GraphQL Hooks */
  const getAllCourses = useQuery(allCoursesQuery);

  /* Get All Courses Data */
  useEffect(() => {
    if (getAllCourses?.data?.courses) {
      setAllCoursesData(getAllCourses?.data?.courses);
      setAllCoursesLoading(false);
    }
    if (getAllCourses?.error?.message) {
      console.log(getAllCourses.error.message);
      setAllCoursesLoading(false);
    }
  }, [getAllCourses?.data]);

 
  //returning for global access
  return {
    user,
    setUser,

    userLoading,
    setUserLoading,

    allCoursesData,
    allCoursesLoading,

    posts,
    setPosts,

    myCourses,
    setMyCourses,

    assignments,
    setAssignments,
  };
};

export default Store;
