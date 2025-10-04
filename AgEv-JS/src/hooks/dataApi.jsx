import { request } from "../helper/axios-utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "./context";

export const usePostData = () => {
  const value = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ path, formData }) =>
      request({
        method: "POST",
        url: path,
        data: formData,
        headers: {
          Authorization: "Bearer " + value.user,
        },
      }),
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const usePutData = () => {
  const value = useGlobalContext();

  return useMutation({
    mutationFn: ({ path, formData }) =>
      request({
        method: "PUT",
        url: path,
        data: formData,
        headers: {
          Authorization: "Bearer " + value.user,
        },
      }),
  });
};

export const useGetData = (key, path) => {
  const value = useGlobalContext();

  return useQuery({
    queryKey: [key, { path }],
    queryFn: ({ queryKey, signal }) => {
      const { path } = queryKey[1];
      return request({
        method: "GET",
        url: path,
        headers: {
          Authorization: "Bearer " + value.user,
        },
        signal,
      });
    },
    select: (data) => data, // Optional, depending on how you want to manipulate the data
  });
};

export const useDeleteData = () => {
  const value = useGlobalContext();

  return useMutation({
    mutationFn: ({ path }) =>
      request({
        method: "DELETE",
        url: path,
        headers: {
          Authorization: "Bearer " + value.user,
        },
      }),
  });
};
