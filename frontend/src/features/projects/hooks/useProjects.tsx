import { useCallback, useEffect, useState } from "react";
import projectsApi from "../services/api";
import type { ProjectProps } from "../types/types";
import { formatCreated, formatUpdated } from "../helpers/format";
import { formatDate } from "date-fns";

type Status = "idle" | "loading" | "error" | "success" | "fetching";

export function useProjects() {

  const [status, setStatus] = useState<Status>("idle");

  const [data, setData] = useState<{
    projects: ProjectProps[];
  }>({ projects: []});
  const [error, setError] = useState<string | null>(null);

  const isFetching = status === "fetching";
  const isLoading = status === "loading" || isFetching;
  const isError = status === "error" || !!error;
  const isIdle = status === "idle";
  const isSuccess = status === "success";

  const resetToIdle = useCallback(
    (timeout = 2000) =>
      setTimeout(() => {
        setStatus("idle");
      }, timeout),
    []
  );

    const fetchData = useCallback(async () => {
    try {
      setStatus("loading");
      const projectPromise = projectsApi.list();
      const [projects = []] = await Promise.all([
        projectPromise,
      ]);
         // Format the projects after fetching
    const formattedProjects = projects.map((datas: { id: string, title: string, company: string, description: string, url: string, categories: string[], website: string, files: FileList[] | null, createdAt: string | number | Date; updatedAt: string | number | Date }) => ({
      ...datas,
      createdAt: new Date(datas.createdAt),  // Ensure this is a Date object
      updatedAt: new Date(datas.updatedAt),  // Ensure this is a Date object
      createdAtFormatted: formatCreated(new Date(datas.createdAt)),
      updatedAtFormatted: formatUpdated(new Date(datas.updatedAt)),
    }));
      setData({ projects: formattedProjects });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Error getting the data");
    } finally {
      resetToIdle();
    }
  }, [resetToIdle]);

    
      useEffect(() => {
        fetchData();
      }, [fetchData]);

      const add = async (data: Partial<ProjectProps>) => {
        const { title = "", company = "", description = "", url = "",  categories = [""], website = "", files = null, createdAt = new Date(), updatedAt = new Date() } = data;
    
        try {
          setStatus("loading");
          await projectsApi.create({ title, company, description, url, categories, website, files, createdAt, updatedAt });
          await fetchData();
          setStatus("success");
        } catch (error) {
          setStatus("error");
          setError("Failed creating project");
        } finally {
          resetToIdle();
        }
      };
      
      const remove = async (id?: string) => {
        if (!id) return;
    
        try {
          setStatus("loading");
          await projectsApi.remove(id);
          await fetchData();
          setStatus("success");
        } catch (error) {
          setStatus("error");
          setError("Failed removing item");
        } finally {
          resetToIdle();
        }
      };

      return {
        add,
        remove,
        get: fetchData,
        data,
        error,
        status: {
          idle: isIdle,
          loading: isLoading,
          success: isSuccess,
          error: isError,
          fetching: isFetching,
        },
      };

}

export default useProjects;