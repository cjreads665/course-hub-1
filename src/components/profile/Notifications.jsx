import { userNotifications } from "../../graphql/Queries";
import React from 'react';
import author from '../../images/author.jpg';
import useStore from '../../context/useStore'
import { useQuery } from "@apollo/client";

const Notification = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-2 shadow-sm sm:flex-row sm:shadow-none">
      <div className="w-full sm:flex-[0.1]">
        <div
          className="h-20 w-20 rounded-full outline-offset-2 outline outline-slate-400 bg-cover bg-center"
          style={{ backgroundImage: `url(${author})` }}
        ></div>
      </div>
      <div className="text-slate-900 flex flex-col items-start gap-2 flex-[0.9]">
        <p className="font-semibold text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          quisquam sunt minima iste. Iusto, sapiente. Doloribus, facilis
          dignissimos.
        </p>
        <span>2 days ago</span>
      </div>
    </div>
  );
};

function Notifications() {
	const {theme} = useStore()
  const token = localStorage.getItem("accessToken");
  const {data,loading,error} = useQuery(userNotifications,{
    context:{
      headers:{
        Authorization: token
      }
    }
  })

  if(loading) return <h1>Loading Please wait...</h1>
  if(error) return <h1>Something wrong happend! Please contact support </h1>

  let list = data?.usersNotifications.map(obj=>{
    console.log(obj)
  })

	const mainContainerStyles = `p-8 bg-${theme? 'slate-800' : 'white'} h-full`
	return (
		<div className={mainContainerStyles} >
			<h2 className="text-xl font-semibold lg:text-3xl">Notifications</h2>
			<div className="h-60vh shadow-md mt-12 bg-white py-4 px-6 flex flex-col gap-4 ">
				<Notification />
				<Notification />
				<Notification />
			</div>
		</div>
	);

}

export default Notifications;
