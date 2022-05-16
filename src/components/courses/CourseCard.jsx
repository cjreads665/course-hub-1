import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import useStore from "../../context/useStore";
import author from "../../images/author.jpg";
import { Clock, ListUl, Heart, HeartFill } from "react-bootstrap-icons";
import { allCoursesQuery, getMyWishlistsQuery } from "../../graphql/Queries";
import {
  addCourseIntoWishlistMutation,
  romveCourseFromWishlistMutation,
} from "../../graphql/Mutations";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import noImagePlaceHolder from "../../images/noImagePlaceHolder.png";

const CourseCard = ({ id, course, enrolled, inwishlist }) => {
  const { user, myWishlist, setMyWishlist } = useStore();
  const [addCourseIntoWishlist] = useMutation(addCourseIntoWishlistMutation);
  const [romveCourseFromWishlist] = useMutation(
    romveCourseFromWishlistMutation
  );

  const token = localStorage.getItem("accessToken");
  const handleAddCourseIntoWishlist = async () => {
    try {
      addCourseIntoWishlist({
        variables: {
          courseId: course?.id,
        },
        context: {
          headers: {
            Authorization: token,
          },
        },
      })
        .then((res) => {
          console.log("res", res);
          toast.success("Course added into wishlist succesfully ! ");
          setTimeout(() => {
            location.reload();
          }, 3000);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error("Course addition into wishlist failed ! ");
        });
      setMyWishlist((val) => [...val, course?.id]);
    } catch (err) {
      console.log(err.message);
      toast.error("Error occurred in adding course to wishlist");
    }
  };
  const handleRomveCourseFromWishlist = async () => {
    try {
      romveCourseFromWishlist({
        variables: {
          courseId: course?.id,
        },
        context: {
          headers: {
            Authorization: token,
          },
        },
      })
        .then((res) => {
          console.log("res", res);
          toast.success("Course removed from wishlist succesfully ! ");
          setTimeout(() => {
            location.reload();
          }, 3000);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error("Course removal from wishlist failed ! ");
        });
      let newData = myWishlist.filter((a) => a !== course.id);
      setMyWishlist(newData);
    } catch (err) {
      console.log(err.message);
      toast.error("Error occurred in removing course from wishlist");
    }
  };

  // useEffect(() => console.log(myWishlist));
  console.log(course);
  return (
    <ErrorBoundary fallback={"error in course page"}>
      <div className="rounded-sm h-[70%] relative w-[21rem] shadow-md overflow-hidden cursor-pointer border-4 border-grey shadow-2xl">
        <Link
          to={
            user?.role == "teacher" && Boolean(enrolled)
              ? `/create-chapter/${course?.id}`
              : `coursedetails/${course?.id}`
          }
        >
          <div className="h-[12rem] rounded-t-sm overflow-hidden relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[rgba(255,118,118,0.09)]">
            <img
              src={
                course?.image == "IMG_20220321_121445.jpg" ||
                course?.image == undefined ||
                course?.image == "lukas-NLSXFjl_nhc-unsplash.jpg"
                  ? noImagePlaceHolder
                  : course?.image
              }
              alt="course-image"
              className="object-cover w-full h-full"
            />
          </div>
          {console.log(course?.image == "IMG_20220321_121445.jpg")}
        </Link>

        <div className="relative px-8 py-10 bg-white text-slate-900 flex flex-col items-start gap-4">
          <h1 className="text-2xl">{course?.name}</h1>
          <div className="flex w-[100%] justify-between">
            <div className="bg-orange-300 text-[14px] font-semibold rounded-sm text-white p-2 uppercase">
              {course?.category}
            </div>
            {!(enrolled === true) && (
              <div className="flex justify-center align-center bg-gray-300 p-3 rounded-[50%]">
                {inwishlist ? (
                  <HeartFill
                    className="text-red-600"
                    onClick={handleRomveCourseFromWishlist}
                  />
                ) : (
                  <Heart onClick={handleAddCourseIntoWishlist} />
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <Clock className="text-lg text-primary-color-light" />
              <span>35 Hours</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <ListUl className="text-xl text-primary-color-light" />
              <span>{course?.noOfSubscribers || 2000}</span>
            </div>
          </div>
          {/* <h3 className="leading-6 text-xl font-semibold h-12 text-slate-800"> */}
          {/*   {course?.tagline} */}
          {/* </h3> */}
          <span className="absolute top-[-1.1rem] right-[1rem] bg-[#fc2340] px-4 py-1 rounded-sm text-white text-xl">
            <strong>
              ₹
              {Math.round(
                `${
                  course?.price -
                  (course?.price *
                    (course?.discount === undefined ? 0 : course?.discount)) /
                    100
                }` * 100
              ) / 100}
            </strong>
            <small className="line-through mx-2 text-gray-600">
              ₹ {course?.price}
            </small>
            <small className="text-gray-600">
              ({course?.discount === null ? 0 : course?.discount}%)
            </small>
          </span>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CourseCard;
