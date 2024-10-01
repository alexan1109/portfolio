export type ProjectType = {
    id: number,
    company: string,
    description: string,
    url: string,
    createdAt: string,
}

export type ID = ReturnType<typeof crypto.randomUUID>;

