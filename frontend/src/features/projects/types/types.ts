export type ProjectType = {
    id: number,
    title: string,
    company: string,
    description: string,
    url: string,
    website: string,
    createdAt: Date,
}

export type Id = ReturnType<typeof crypto.randomUUID>;

export const actions = {
    add: "add",
    remove: "remove",
  };

  export type Action = (typeof actions)[keyof typeof actions];
