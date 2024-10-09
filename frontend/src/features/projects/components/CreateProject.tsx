import { ofetch } from 'ofetch';
import {useRef, useState, type FormEvent} from 'react'
interface CreateProjectProps {
    setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>;
    initializeData: () => Promise<void>
 }
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

function CreateProject ({ setProjects, initializeData }: CreateProjectProps) {

const formRef = useRef<HTMLFormElement | null>(null);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("pressed button")
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);

        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        });

        const create = async (data: any) => {
            try {
              const createdProject = await ofetch(`http://localhost:3000/projects`, {
                method: "POST",
                body: data,
              });
                console.log("Test initialize")
                initializeData();

              
            } catch (error) {
              console.error(error);
            }
          };

        create(data)

    }


    return(
        <article id="form-style">
            <h3 id="form-title">Add new <br/> project</h3>
            <form id="projectForm" method="POST" action="/" ref={formRef} onSubmit={handleFormSubmit}>
                <label>Name: <br/>
                <input type="text" id="pname" name="title" autoComplete='on' /></label><br/><br/>
                <label>Company: <br/>
                <input type="text" id="pcompany" name="company" autoComplete='on'/></label><br/><br/>
                <label>Description: <br/>
                <input type="text" id="pdescription" name="description" autoComplete='on'/></label><br/><br/>
                <label>Image URL: <br/>
                <input type="text" id="pimage" name="url" autoComplete='on'/></label><br/><br/>
                <label htmlFor="phtml">HTML<input type="checkbox" id="phtml" name="categories" value="HTML" /></label>
                <br/>
                <label htmlFor="pcss">CSS<input type="checkbox" id="pcss" name="categories" value="CSS" /></label>
                <br/>
                <label htmlFor="pjavascript">JavaScript<input type="checkbox" id="pjavascript" name="categories" value="JavaScript"/></label>
                <br/>
                <label htmlFor="preact">React<input type="checkbox" id="preact" name="categories" value="React"/></label>
                <br/>
                <label htmlFor="pnode">NodeJS<input type="checkbox" id="pnode" name="categories" value="NodeJS"/></label>
                <br/>
                <label htmlFor="pnext">NextJS<input type="checkbox" id="pnext" name="categories" value="NextJS" /></label>
                <br/>
                <label htmlFor="padress">Website-adress:<br/>
                <input type="text" id="padress" name="website" autoComplete='on' />
                </label><br/><br/>
                <label htmlFor="pfiles">Project-files: '(accept: .tsx, .ts, .js, .html, .json):<br/>
                <input type="file" id="pfiles" name="files" accept='.tsx,.ts,.js,.html,.json' />
                </label><br/><br/>
                <label htmlFor="pdate">Created at:<br/>
                <input type="date" id="pdate" name="createdAt" />
                </label><br/>
                <button type="submit" id="button-bgcolor add-new-project">Submit</button>
            </form>
        </article>

    )
}

export default CreateProject