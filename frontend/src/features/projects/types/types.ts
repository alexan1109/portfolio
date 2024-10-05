export type ProjectType = {
    id: number,
    title: string,
    company: string,
    description: string,
    url: string,
    categories: string[],
    website: string,
    createdAt: string,
    updatedAt: Date,
}

export type Id = ReturnType<typeof crypto.randomUUID>;

export const actions = {
    add: "add",
    remove: "remove",
  } as const;

  export type Action = (typeof actions)[keyof typeof actions];

  export type HandleMutationProps =
  | {
      action: typeof actions.remove;
      id: number;
    }
  | {
      action: typeof actions.add;
      project: Partial<ProjectType>;
    };

export type HandleMutation = (props: HandleMutationProps) => void;