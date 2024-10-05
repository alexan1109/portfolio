export type ID = ReturnType<typeof crypto.randomUUID>;
export type ProjectType = {
    id: number,
    title: string,
    company: string,
    description: string,
    url: string,
    categories: string[],
    website: string,
    createdAt: Date,
    updatedAt: Date,
}
