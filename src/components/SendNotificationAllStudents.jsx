import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import { Person, Tag, CardText } from "react-bootstrap-icons";
import { useMutation } from "@apollo/client";
import {
  sendStudentNotificationsMutation,
  sendTeacherNotificationsMutation,
} from "../graphql/Mutations";
import toast, { Toaster } from "react-hot-toast";
import NavTabs from "./NavTabs";
import useStore from "../context/useStore";

const SendNotificationAllStudents = () => {
  const { id } = useParams();
  const { user, theme } = useStore();
  const [sendStudentNotificationsFunction] = useMutation(
    sendStudentNotificationsMutation
  );

  const [notificationData, setNotificationData] = useState({
    title: "",
    about: "",
  });
  const getNotificationdata = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    const newData = { ...notificationData };
    newData[name] = value;
    setNotificationData(newData);
  };

  const submitNotifications = (e) => {
    e.preventDefault();
    console.log(notificationData);

    if (
      (notificationData && !notificationData.title) ||
      (notificationData.title && notificationData.title.length == 0)
    ) {
      console.log("Invalid title");
      toast.error("Invalid title");
      return;
    }
    if (
      (notificationData && !notificationData.about) ||
      (notificationData.about && notificationData.about.length == 0)
    ) {
      console.log("Invalid description");
      toast.error("Invalid description");
      return;
    }
    if (
      notificationData &&
      notificationData.title &&
      notificationData.title.length > 1 &&
      notificationData.about &&
      notificationData.about.length > 1
    ) {
      console.log(notificationData);
      const token = localStorage.getItem("accessToken");

      sendStudentNotificationsFunction({
        context: {
          headers: {
            Authorization: token,
          },
        },
        variables: notificationData,
      })
        .then((res) => {
          console.log("res", res);
          toast.success("Notification send successfully");
          setNotificationData({
            title: "",
            about: "",
          });
          // setTimeout(() => {
          //   location.reload();
          // }, 3000);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error("Sending notification failed ! ");
        });
    }
  };

  const mainDivStyles = `${
    theme ? "bg-slate-800 text-white" : "bg-white"
  } py-8 px-16`;
  return (
    <div className={`${mainDivStyles}`}>
      <NavTabs id={id} />
      <div className="flex items-center justify-center min-h-full  py-8">
        <div className="border border-slate-300 relative bg-white w-[20rem] mx-2 p-8 flex items-center justify-center rounded-xl sm:w-[25rem]">
          <form className="w-full h-full" onSubmit={submitNotifications}>
            <p className="text-3xl font-semibold mb-12 text-center">
              Send notifications
            </p>
            <div className="flex flex-col items-start gap-6 mb-12">
              <div className="relative top-0 left-0 w-full">
                <div className="absolute top-[50%] translate-y-[-50%] left-[2px] w-[3rem] h-[calc(100%-2px)] flex items-center justify-center rounded-tl-md rounded-bl-md border-r-[1px]">
                  <Tag className="TAGS" />
                </div>
                <input
                  type="text"
                  className="form-input border border-slate-300 w-full py-3 pr-2 pl-14 rounded-md bg-transparent hover:border-primary-color-dark focus:outline-none"
                  id="title"
                  autoComplete="off"
                  placeholder=" "
                  name="title"
                  onChange={getNotificationdata}
                  value={notificationData.title}
                  required
                />
                <label
                  htmlFor="title"
                  className="form-label text-slate-700 absolute left-[3.2rem] top-[0.7rem] transition-all duration-300 px-2 cursor-text bg-white"
                >
                  {`${"title".slice(0, 1).toUpperCase()}${"title".slice(
                    1,
                    "title".length
                  )}`}
                </label>
              </div>
              <div className="relative top-0 left-0 w-full">
                <div className="absolute top-[50%] translate-y-[-50%] left-[2px] w-[3rem] h-[calc(100%-2px)] flex items-center justify-center rounded-tl-md rounded-bl-md border-r-[1px]">
                  <CardText className="DESCRIPTION" />
                </div>
                <input
                  type="text"
                  className="form-input border border-slate-300 w-full py-3 pr-2 pl-14 rounded-md bg-transparent hover:border-primary-color-dark focus:outline-none"
                  id="about"
                  autoComplete="off"
                  placeholder=" "
                  name="about"
                  onChange={getNotificationdata}
                  value={notificationData.about}
                  required
                />
                <label
                  htmlFor="about"
                  className="form-label text-slate-700 absolute left-[3.2rem] top-[0.7rem] transition-all duration-300 px-2 cursor-text bg-white"
                >
                  {`${"about".slice(0, 1).toUpperCase()}${"about".slice(
                    1,
                    "about".length
                  )}`}
                </label>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button isPrimary={true} isWidthFull={true} type="submit">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SendNotificationAllStudents;
