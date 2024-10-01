import { useCallback, useEffect, useState } from "react";
import projectsApi from "../services/api";
import type { ProjectType, Id } from "@/src/types";

export function useProjects() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [projects, setProjects] = useState<ProjectType[]>([]);

    const isLoading = !!loading;
    const isError = !!error;

    const fetchData = useCallback(async () => {
        try {
          setLoading(true);
          const projectPromise = projectsApi.list();
          const [projects,] = await Promise.all([
            projectPromise,
          ]);
          setProjects(projects ?? []);
        } catch (error) {
          setError("Feilet ved henting av data");
        } finally {
          setLoading(false);
        }
      }, []);
    
      useEffect(() => {
        fetchData();
      }, [fetchData]);

      const add = async (data: Partial<ProjectType>) => {
        const { title = "", company = "", description = "", url = "" } = data;
    
        try {
          setLoading(true);
          await projectsApi.create({ title, company, description, url });
        } catch (error) {
          setError("Failed creating habit");
        } finally {
          setLoading(false);
          await fetchData();
        }
      };

      const remove = async (id?: Id) => {
        if (!id) return;
    
        try {
          setLoading(true);
          await projectsApi.remove(id);
        } catch (error) {
          setError("Failed removing item");
        } finally {
          setLoading(false);
          await fetchData();
        }
      };
    
      return {
        add,
        remove,
        get: fetchData,
        isLoading,
        isError,
        projects,
        error,
      };

}

export default useProjects;