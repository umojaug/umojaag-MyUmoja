import React, { useState } from "react";
import { usePostData } from "../../hooks/dataApi";
import DialogBody from "./DialogBody";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../hooks/context";
import { FaUserSecret } from "react-icons/fa";

const ImpersonationButton = ({ id }) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const value = useGlobalContext();

  const onSubmit = async () => {
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/impersonation",
        formData: { id: id },
      });

      if (status === 200 && data.isSuccess === true) {
        value.signOut();
        value.setUser(data.accessToken);
        value.setRole(data.role);
        value.setModules(data.modules);
        value.setMenus(data.menus);
        value.setSubmenus(data.subMenus);

        navigate(data.role === "Grapes Admin" ? "/grapes" : "/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      closeModal();
    }
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className="btn w-12 h-10 bg-red-600" onClick={() => openModal()}>
        <FaUserSecret size={24} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to impersonate this staff member?"
      />
    </>
  );
};

export default ImpersonationButton;
