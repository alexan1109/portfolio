import { useCallback, useEffect, useState } from "react";
import projectsApi from "../services/api";
import type { ProjectType } from "../../types/types";

type Status = "idle" | "loading" | "error" | "success" | "fetching";

export function useProjects() {

  const [status, setStatus] = useState<Status>("idle");

  const [data, setData] = useState<{
    projects: ProjectType[];
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
      setData({ projects });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Feilet ved henting av data");
    } finally {
      resetToIdle();
    }
  }, [resetToIdle]);

    
      useEffect(() => {
        fetchData();
      }, [fetchData]);

      const add = async (data: Partial<ProjectType>) => {
        const { title = "", company = "", description = "", url = "" } = data;
    
        try {
          setStatus("loading");
          await projectsApi.create({ title, company, description, url });
          await fetchData();
          setStatus("success");
        } catch (error) {
          setStatus("error");
          setError("Failed creating habit");
        } finally {
          resetToIdle();
        }
      };
      
      const remove = async (id?: number) => {
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