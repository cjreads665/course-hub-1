import { useState, useRef, useEffect, Children } from "react";
import videos from "../../bluePrint/courseVideoPrint";
import NextChapterChip from "./nextChapterChip";
import Modal from "./modal";
import VideoPlayer from "./videoPlayer";
import axios from "axios";

const CourseVideo = ({ closeModal, chapters, courseName, courseId }) => {
  const [nextVideos, setNextVideos] = useState(videos);
  const [current, setCurrent] = useState({
    vidPoster:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=700",
    title: "Wellcome, Tap the chapters to begin",
  });
  if (
    current &&
    current.title &&
    current.title === "Wellcome, Tap the chapters to begin" &&
    chapters &&
    chapters.length > 1
  ) {
    setCurrent({
      src: chapters[0].video,
      title: chapters[0].name,
      description: chapters[0].about,
      assignment: chapters[0].project,
    });
  }
  const getFileStream = async (key) => {
    const s3Url = false
      ? "https://xcite-file-server-s3.herokuapp.com"
      : "http://localhost:8000";
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    console.log("url", `${s3Url}/files/${key}`);
    //get files from s3
    // const response = await axios.get(`${s3Url}/files/${key}`, {
    //  headers: {
    //  Authorization: `Bearer ${token}`,
    //  },
    //  responseType: "blob",

    const { data } = await axios.get(
      `${s3Url}/getVideo/${key}`,
      // `${s3Url}/s3/get/video/${key}/${courseId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      }
    );
    console.log(data);
    return data;
  };
  console.log("chapters", chapters);
  return (
    <>
      <Modal close={closeModal} title={courseName}>
        <div className="w-full flex flex-wrap p-1 py-2">
          <div className="w-full md:w-8/12">
            <VideoPlayer
              vidSrc={getFileStream(current.src)}
              title={current.title}
              vidPoster={current.vidPoster}
              description={current.description}
              assignment={current.assignment}
            />
          </div>
          <div className="overflow-auto h-[40vh] pb-[8rem] w-full md:h-[98vh] md:px-3 md:w-4/12">
            {Children.toArray(
              chapters?.map((vid) => {
                return (
                  <NextChapterChip
                    setter={setCurrent}
                    src={vid.video}
                    title={vid.name}
                    description={vid.about}
                    assignment={vid.project}
                  />
                );
              })
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CourseVideo;
