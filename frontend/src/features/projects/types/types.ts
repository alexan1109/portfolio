
export type ProjectProps = {
    id: string,
    title: string,
    company: string,
    description: string,
    url: string,
    categories: string[],
    website: string,
    userId: string,
    email: string,
    createdAt: string,
   
}


export type Id = ReturnType<typeof crypto.randomUUID>;





