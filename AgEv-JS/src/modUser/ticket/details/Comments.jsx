import React, { useEffect, useRef, useState } from "react";
import { IoMdPaperPlane } from "react-icons/io";
import toast from "react-hot-toast";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData, usePostData } from "../../../hooks/dataApi";
import { format } from "date-fns";

const Comments = ({ comments, action, id }) => {
  const [comment, setComment] = useState("");
  const commentsEndRef = useRef(null);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const { mutateAsync } = usePostData();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("userInfo", `/user/userinfo`);
  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

  const user = list?.data
    ? {
        id: list.data.listId,
        name: list.data.listName,
        profilePic: "/images/user.png",
      }
    : { id: null, name: "Guest", profilePic: "/images/user.png" };

  const handleAddComment = async () => {
    if (!comment) return;
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("ticketId", id);
      formDataToSend.append("note", comment);

      const { status } = await mutateAsync({
        path: "/TicketNote/Create",
        formData: formDataToSend,
      });

      if (status === 201) {
        // toast.success("Comment added successfully!");
      }
    } catch (error) {
      toast.error("Error adding comment!");
    } finally {
      action();
      setComment("");
    }
  };

  return (
    <div className="flex-1 h-96 flex flex-col bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <div className="comments-list overflow-y-auto min-h-[200px] mb-4">
        {comments.map((comment, index) => (
          <div
            key={index}
            className={`flex ${
              comment.userId === user.id ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`flex items-center space-x-2 max-w-xs px-4 py-2 rounded-lg ${
                comment.userId === user.id ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <img
                src={
                  comment.userId === user.id
                    ? user.profilePic
                    : "/images/user.png"
                }
                alt="User Profile"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">
                  {comment.userId === user.id ? user.name : comment.fullName}
                </p>
                <p className="text-sm">{comment.note}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(comment.entryDate), "dd/MMM/yyyy")}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={commentsEndRef} />
      </div>

      <div className="comment-input flex items-center space-x-2">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
          className="form-control w-full h-14 px-4 py-2 rounded-md border-2 border-gray-300 resize-none"
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white h-14 px-4 py-2 rounded-md"
        >
          <IoMdPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default Comments;
