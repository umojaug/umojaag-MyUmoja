import { request } from "../helper/axios-utils";
import { useGlobalContext } from "./context";

export const useDownloadFile = () => {
  const value = useGlobalContext();

  const downloadPdf = async (path, filename, method = "GET", data) => {
    await request({
      url: path,
      method: method,
      data: data,
      responseType: "blob",
      headers: {
        Authorization: "Bearer " + value.user,
        Accept: "application/octet-stream",
      },
    })
      .then((response) => {
        const data = response.data;

        if (!(data instanceof Blob)) return;

        const blob = new Blob([data], { type: "application/pdf" });

        // Create a link element and simulate a click to trigger the download
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        //konsole.log("error: ", error);
      });
  };

  return downloadPdf;
};
