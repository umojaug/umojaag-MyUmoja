import React, { useState } from "react";
import { IoMdRefreshCircle } from "react-icons/io";
import { usePostData } from "../../hooks/dataApi";
import { useGlobalContext } from "../../hooks/context";
import DialogBody from "./DialogBody";
const Refresh = () => {
  let [isOpen, setIsOpen] = useState(false);
  const value = useGlobalContext();
  const { mutateAsync } = usePostData();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleRefreshClick = async () => {
    try {
      const result = await mutateAsync({
        path: "/auth/ReloadRole",
      });

      value.setModules(result.data.modules);
      value.setMenus(result.data.menus);
      value.setSubmenus(result.data.subMenus);

      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });

      caches.keys().then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            return caches.delete(key);
          })
        );
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <button
        className="text-red-700 flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow"
        onClick={() => {
          openModal();
        }}
      >
        <IoMdRefreshCircle size={30} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={handleRefreshClick}
        bodyText="Are you sure you want to reload application?"
      />
    </>
  );
};

export default Refresh;
