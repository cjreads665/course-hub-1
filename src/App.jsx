import { useState, useEffect, lazy, Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import useStore from "./context/useStore";

import {
  CreateAssignment,
  CreateCourse,
  CreateQuiz,
  CreateChapter,
  Footer,
  Courses,
  PrivateRoute,
  UpdateDiscount,
  PreviousChapter,

  StudentsEnrolledInCourse,
  SendNotificationAllStudents,
} from "./components";

import {
  Profile,
  Dashboard,
  MyCourses,
  MyWishlist,
  Assignments,
  Notifications,
  Settings,
} from "./components/profile";

import {
  StudentInfo,
  TeacherInfo,
  AdminLogin,
  CourseInfo,
  AdminDashboard,
  Admin,
  SendNotifications,
  NotificationInfo,
} from "./components/admin";

import Community from "./components/Community/Community";
import { Home, CourseDetails, NotFound } from "./pages";
import {
  Login,
  Signup,
  VerifyEmail,
  NewPassword,
  CheckOTP,
} from "./components/Auth";
import Chapters from "./components/Chapters/Chapters";
import StudentsEnrolled from "./components/Chapters/StudentsEnrolled";
import CurrentProject from "./components/Chapters/CurrentProject";
import AllProjects from "./components/Chapters/AllProjects";
import Navbar from "./components/header/Navbar";
import Loading from "./UI/BoxLoading";
import Contact from "./components/ContactUs/ContactUs";
import About from "./components/AboutUs/AboutUs";
import AllCourses from "./components/courses/AllCourses";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);
  let stylesForProfile = "bg-red-800";
  useEffect(() => {
    setLoading(false);
  }, []);

  //18 Mar 2022 - added Global Context from ThemeContext
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Toaster />
          <Navbar />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/check-otp" element={<CheckOTP />} />
              <Route exact path="/new-password" element={<NewPassword />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contactus" element={<Contact />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/all-courses" element={<AllCourses />} />

              <Route
                path="/my-profile"
                element={
                  <PrivateRoute className="text-7xl ">
                    <Profile />
                  </PrivateRoute>
                }
              >
                <Route path="/my-profile/dashboard" element={<Dashboard />} />
                <Route path="/my-profile/courses" element={<MyCourses />} />
                <Route path="/my-profile/wishlist" element={<MyWishlist />} />
                <Route
                  path="/my-profile/assignments"
                  element={<Assignments />}
                />
                <Route
                  path="/my-profile/notifications"
                  element={<Notifications />}
                />
                <Route path="/my-profile/settings" element={<Settings />} />
              </Route>
              {/* <Route path="/my-courses" element={<MyCourses />} /> */}

              <Route path="/community" element={<Community />} />
              <Route path="/create-course" element={<CreateCourse />} />
              <Route path="/create-chapter/:id" element={<CreateChapter />} />

              <Route path="/benefits/:id" element={<Benefits/>} />
              <Route
                path="/previous-chapter/:id"
                element={<PreviousChapter />}
              />
              <Route path="/update-discount/:id" element={<UpdateDiscount />} />
              <Route
                path="/students-enrolled-course/:id"
                element={<StudentsEnrolledInCourse />}
              />
              <Route
                path="/send-notification-students/:id"
                element={<SendNotificationAllStudents />}
              />

              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/create-assignment" element={<CreateAssignment />} />

              <Route path="/*" element={<NotFound />} />

              <Route
                path="all-courses/coursedetails/:id"
                element={<CourseDetails />}
              />
              <Route
                path="my-profile/courses/coursedetails/:id"
                element={<CourseDetails />}
              />
              <Route
                path="/chapters/chapterdetails/:id"
                element={<Chapters />}
              />
              <Route
                path="/students-enrolled/:chapterId"
                element={<StudentsEnrolled />}
              >
                <Route
                  path="/students-enrolled/:chapterId/current-chapter"
                  element={<CurrentProject />}
                />
                <Route
                  path="/students-enrolled/:chapterId/all-chapters"
                  element={<AllProjects />}
                />
              </Route>

              {/* admin area */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin/access" element={<Admin />}>
                <Route path="/admin/access/courses" element={<CourseInfo />} />
                <Route
                  path="/admin/access/students"
                  element={<StudentInfo />}
                />
                <Route
                  path="/admin/access/dashboard"
                  element={<AdminDashboard />}
                />

                <Route
                  path="/admin/access/teachers"
                  element={<TeacherInfo />}
                />
                <Route
                  path="/admin/access/send-notifications"
                  element={<SendNotifications />}
                />
                <Route
                  path="/admin/access/notifications"
                  element={<NotificationInfo />}
                />
              </Route>
            </Routes>
            <Footer />
          </Suspense>
        </div>
      )}
    </>
  );
}

export default App;
