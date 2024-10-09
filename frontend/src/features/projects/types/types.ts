export type ProjectProps = {
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


export type Id = ReturnType<typeof crypto.randomUUID>;





