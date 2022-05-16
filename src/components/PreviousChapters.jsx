import React, { useState, useEffect } from "react";
import useStore from "../context/useStore";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { getChaptersQuery } from "../graphql/Queries";
import BoxLoading from "../UI/BoxLoading";
import { Search, Trash, PencilSquare } from "react-bootstrap-icons";
import NavTabs from "./NavTabs";

const PreviousChapter = () => {
  const { user, theme } = useStore();
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [inputField, setInputField] = useState("");

  const token = localStorage.getItem("accessToken");
  const getChapters = useQuery(getChaptersQuery, {
    variables: {
      courseId: id,
    },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });

  useEffect(() => {
    if (getChapters.loading) return;
    // console.log(getChapters?.data?.chapters);
    setChapters(getChapters?.data?.chapters);
  }, [getChapters.data]);

  const handleUpdateChapter = (e) => {
    console.log(e.target.id + "chapter updated");
  };

  const handleDeleteChapter = (e) => {
    console.log(e.target.id + "chapter deleted");
  };

  const mainDivStyles = `${
    theme ? "bg-slate-800 text-white" : "bg-white"
  } py-8 px-16`;

  if (getChapters.loading) return <BoxLoading />;
  return (
    <>
      <div className={mainDivStyles}>
        <NavTabs id={id} />

        <div className="bg-white w-full px-8 py-4">
          <div className="flex flex-col mt-4 border">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div
                  className="border-b px-4 py-4 bg-primary-color-dark
            text-white flex justify-between items-center"
                >
                  <h1 className="text-xl uppercase p-4 font-bold  ">
                    Previous Chapters
                  </h1>
                  <div className="flex items-center bg-white px-4 text-gray-400 h-[50px] rounded-lg">
                    <Search className="text-2xl" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="px-2   bg-transparent outline-none"
                      onChange={(e) => setInputField(e.target.value)}
                    />
                  </div>
                </div>
                <div className="overflow-scroll  max-h-[470px]">
                  <table className="min-w-full relative">
                    <thead className="bg-white border-b sticky top-0">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          S No.
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          About
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Project
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Update
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {chapters
                        ?.filter((chapter) => {
                          if (inputField === "") return chapter;
                          else if (
                            chapter.name
                              .toLowerCase()
                              .startsWith(inputField.toLowerCase()) === true ||
                            chapter.name
                              .toLowerCase()
                              .includes(inputField.toLowerCase()) === true
                          )
                            return chapter;
                        })
                        ?.map((chapter, idx) => {
                          return (
                            <tr
                              className={`${
                                idx % 2 == 0 ? "bg-gray-100" : "bg-white"
                              } border-b`}
                              key={user.id}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {idx + 1}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {chapter.name}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {chapter.about}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {chapter.project}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <button
                                  id={chapter.id}
                                  onClick={handleUpdateChapter}
                                  className="bg-blue-500 flex justify-evenly
                            items-center p-2 font-bold
                            rounded-sm"
                                >
                                  <PencilSquare className="mr-3" />
                                  Update Chapter
                                </button>
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                                <button
                                  id={chapter.id}
                                  onClick={handleDeleteChapter}
                                  className="bg-red-500 flex justify-evenly
                            items-center p-2 font-bold
                            rounded-sm"
                                >
                                  <Trash className="mr-2" />
                                  Delete Chapter
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviousChapter;
