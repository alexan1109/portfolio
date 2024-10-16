
export type Project = {
    id: string;
    title: string;
    company: string;
    description: string;
    url: string;
    website: string;
    userId: string;
    email: string;
    createdAt: Date;
}

export type DbProject = {
    id: string;
    title: string;
    company: string;
    description: string;
    url: string;
    website: string;
    userId: string;
    email: string;
    createdAt: string;
  };

  export type CreateProjectDto = Pick<
  Project,
  "title" | "company" | "description" | "url" | "website" | "userId" | "email"
>;

export type UpdateProjectDto = Partial<
  Pick<
    Project,
    | "title"
    | "company"
    | "description"
    | "url"
    | "website"
    | "email"
  >
>;
export const projectFields: (keyof Project)[] = [
    "id",
    "title",
    "company",
    "description",
    "url",
    "website",
    "userId",
    "email",
    "createdAt",
  ];
  
  export type ProjectKeys = keyof Project;