import { useCallback, useEffect, useState } from "react";
import projectsApi from "../services/api";
import type { ProjectProps } from "../types/types";
import { formatCreated } from "../helpers/format";


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
    const formattedProjects = projects.map((datas: { id: string, title: string, company: string, description: string, url: string, categories: string[], website: string, userId: string, email: string, createdAt: string}) => ({
      ...datas,
      createdAt: new Date(datas.createdAt),
      createdAtFormatted: formatCreated(new Date(datas.createdAt)),
    }));
      setData({ projects: formattedProjects });
      setStatus("success");
    } 
    catch (error) {
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
        const { title = "", company = "", description = "", url = "",  categories = [""], website = "", userId = "", email = "", createdAt =  new Date() } = data;
    
        try {
          setStatus("loading");
          await projectsApi.create({ title, company, description, url, categories, website, userId, email, createdAt });
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