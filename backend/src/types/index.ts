export type ID = ReturnType<typeof crypto.randomUUID>;
export type ProjectType = {
    id: string,
    title: string,
    company: string,
    description: string,
    url: string,
    categories: string[],
    website: string,
    files: FileList | null,
    createdAt: Date,
    updatedAt: Date,
}
