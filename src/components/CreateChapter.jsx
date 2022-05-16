import React, { useState, useEffect } from "react";
import FormControl from "../UI/FormControl";
import Button from "../UI/Button";
import useStore from "../context/useStore";
import { newCreateChapterMutation } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import NavTabs from "./NavTabs";

const CreateChapter = () => {
  const { user, theme } = useStore();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [createChapter] = useMutation(newCreateChapterMutation);
  const [file, setFile] = useState(null);

  const s3Url = true
    ? "https://xcite-file-server-s3.herokuapp.com"
    : "http://localhost:8000";
  const token = localStorage.getItem("accessToken");
  console.log(token);
  const mainDivStyles = `${
    theme ? "bg-slate-800 text-white" : "bg-white"
  } py-8 px-16`;

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData((val) => ({ ...val, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createChapter({
      variables: {
        ...formData,
        teacherId: user.id,
        courseId: id,
      },
    })
      .then((res) => {
        setFormData({});
        console.log("res", res);
        toast.success("Chapter created succesfully ! ");
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Chapter creation failed ! ");
      });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (res) => {
      setFile({
        data: res.target.result,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    };
  };

  const handleUpload = async () => {
    const { data } = await axios.post(
      `${s3Url}/s3/set/upload`,
      {
        courseId: id,
        file,
      },
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    setFormData({ ...formData, video: data });
  };

  return (
    <>
      <div className={mainDivStyles}>

        <NavTabs id={id} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormControl
            onChange={handleChange}
            type="text"
            label="name"
            icon="BOOK"
          />
          <div>
            <input
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={handleFile}
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpload}
            >
              Upload Video
            </button>
          </div>
          <FormControl
            type="text"
            onChange={handleChange}
            label="about"
            icon="ABOUT"
          />
          <FormControl
            type="text"
            onChange={handleChange}
            label="project"
            icon="PROJECT"
          />

          <Button type="submit" isWidthFull={true} isPrimary={true}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateChapter;
