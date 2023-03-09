import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addWatchedVideos, removeWatchedVideo } from "../Shared/HistorySlice";
import { Link } from "react-router-dom";
import { BsArrowRepeat } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";

function SearchedVideoCards({ video, videoType }) {
  console.log(video);
  console.log(videoType);
  const dispatch = useDispatch();
  const removeVideo = (item) => {
    dispatch(removeWatchedVideo(item));
  };
  var description =
    video.snippet?.description.length > 60
      ? video.snippet.description.substring(0, 70) + "...."
      : video.snippet.description;
  return (
    <div
      onClick={() =>
        videoType === "searched"
          ? dispatch(
              addWatchedVideos({
                id: video.id.videoId,
                snippet: video.snippet,
              })
            )
          : null
      }
      className={
        videoType === "watched"
          ? "w-[55rem]  h-40 p-4 m-3 shadow-2xl rounded-sm cursor-pointer"
          : "w-full h-48 p-4 m-3 shadow-2xl rounded-sm cursor-pointer"
      }
    >
      <div className="flex">
        <img
          className="rounded-md w-60 "
          alt="thumbnail"
          src={video.snippet.thumbnails.medium.url}
        />
        <div>
          <h1 className="p-1 mx-2 font-semibold text-lg">
            {video.snippet.title}
          </h1>
          <p className=" flex p-1 mx-2">
            <FaUserCircle className="m-1" /> {video.snippet.channelTitle}
          </p>
          <p className="p-1 mx-2">{description}</p>
        </div>
        {videoType === "watched" ? (
          <div className="flex">
            <CiCircleRemove
              size={20}
              onClick={() => removeVideo(video)}
              className=" hover:bg-red-300 rounded-full h-5 mx-1 w-5"
            />

            <Link to={"/watch?v=" + video.id} key={video.id}>
              <BsArrowRepeat className=" hover:bg-green-300 rounded-full h-5 w-5" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchedVideoCards;
