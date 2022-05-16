import React, { Children, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import CourseCard from "../courses/CourseCard";
import { getMyCourses } from "../../graphql/Queries";
import { useQuery } from "@apollo/client";
import useStore from "../../context/useStore";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import "./mycourses.css";

function MyCourses() {
  const { user, theme, setMyCourses } = useStore();

  const token = localStorage.getItem("accessToken");
  const { data, error, loading, refetch } = useQuery(getMyCourses, {
    context: {
      headers: {
        Authorization: token,
      },
    },
  });

  useEffect(() => {
    setMyCourses(data?.getMyCourses);
    refetch();
  }, [data]);

  const mainContainerStyles = `px-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-16`;
  const btnSectionStyles = `px-2 h-[3rem] flex items-center ${
    theme ? "bg-slate-800" : null
  }`;
  const cardContainerStyles = `flex h-full flex-wrap gap-6 justify-around ${
    theme ? "bg-slate-800" : null
  }`;

  return (
    <>
      <ErrorBoundary fallback={"Error"}>
        {user.role === "teacher" && (
          <nav className={btnSectionStyles}>
            <Link
              className="bg-red-700 text-white px-4 py-2 rounded-sm"
              to="/create-course"
            >
              create course
            </Link>
          </nav>
        )}
        <div className={cardContainerStyles}>
          {Children.toArray(
            data?.getMyCourses.map((a) => {
              console.log(a);
              return (
                <CourseCard
                  id={a?.id}
                  enrolled={true}
                  course={a}
                  image={a?.image}
                  category={a?.category}
                  price={a?.price}
                  name={a?.name}
                  tagline={a?.tagline}
                />
              );
            })
          )}
        </div>
      </ErrorBoundary>
    </>
  );
}

export default MyCourses;
