import { userNotifications } from "../../graphql/Queries";
import React, { Children } from "react";
import noImagePlaceHolder from "../../images/noImagePlaceHolder.png";
import useStore from "../../context/useStore";
import { useQuery } from "@apollo/client";

const Notification = ({ title, about, image }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-2 shadow-sm sm:flex-row sm:shadow-none">
      <div className="w-full sm:flex-[0.1]">
        <div
          className="h-20 w-20 rounded-full outline-offset-2 outline outline-slate-400 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image ? image : noImagePlaceHolder})`,
          }}
        ></div>
      </div>
      <div className="text-slate-900 flex flex-col items-start gap-2 flex-[0.9]">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="font-semibold text-md">{about}</p>
        <span>2 days ago</span>
      </div>
    </div>
  );
};

function Notifications() {
  const { theme } = useStore();
  const token = localStorage.getItem("accessToken");
  const { data, loading, error } = useQuery(userNotifications, {
    context: {
      headers: {
        Authorization: token,
      },
    },
  });

  if (loading) return <h1>Loading Please wait...</h1>;
  if (error) return <h1>Something wrong happend! Please contact support </h1>;

  let list = Children.toArray(
    data?.usersNotifications.map((obj) => {
      console.log(obj);
      return (
        <Notification title={obj.title} about={obj.about} image={obj.image} />
      );
    })
  );

  const mainContainerStyles = `p-8 bg-${theme ? "slate-800" : "white"} h-full`;
  return (
    <div className={mainContainerStyles}>
      <h2 className="text-xl font-semibold lg:text-3xl">Notifications</h2>
      <div className="h-60vh shadow-md mt-12 bg-white py-4 px-6 flex flex-col gap-4 ">
        {list}
      </div>
    </div>
  );
}

export default Notifications;
