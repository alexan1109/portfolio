export type ID = ReturnType<typeof crypto.randomUUID>;

export type ProjectType = {
    id: string,
    title: string,
    company: string,
    description: string,
    url: string,
    categories: string[],
    website: string,
    userId: string,
    email: string,
    createdAt: Date,
}


