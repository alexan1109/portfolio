import { string } from "zod";
import useProjectForm from "../hooks/useProjectForm.tsx";
import useProjectReducerForm from "../hooks/useProjectReducerForm.tsx";

type ProjectFormProps = {
    addProject: (title: string, company: string, description: string, url: string, categories: string[], website: string, createdAt: string, updatedAt: Date) => void;
  };

  export default function ProjectForm(props: Readonly<ProjectFormProps>) {
    const { addProject } = props;

    const { handleSubmit, getFieldProps, isFieldInvalid } = useProjectReducerForm({
        initialFields: { title: "", company: "", description: "", url: "", categories: "", website: "", createdAt: "", updatedAt: Date(),},
        onSubmit: (data: { title: string; company: string; description: string; url: string; categories: string[]; website: string; createdAt: string; updatedAt: Date}) => addProject(data.title, data.company, data.description, data.url, data.categories, data.website, data.createdAt, data.updatedAt),
        validate: {
          title: (_, value) => value.length > 2,
          company: (_, value) => value.length > 2,
          description: (_, value) => value.length > 2,
        },
      });

    return(
        <article id="form-style">
            <h3 id="form-title">Add new <br/> project</h3>
            <form id="projectForm" method="POST" action="/" onSubmit={handleSubmit}>
                <label htmlFor="pname">Name: <br/>
                <input type="text" id="pname" name="pname" required className={!isFieldInvalid ? "success" : ""}   {...getFieldProps("title")}/>
                {isFieldInvalid("title") ? (
              <p>
                Title must be at least three letters long
              </p>
            ) : null}</label><br/><br/>
                <label htmlFor="pcompany">Company: <br/>
                <input type="text" id="pcompany" name="pcompany" required className={!isFieldInvalid ? "success" : ""}   {...getFieldProps("company")} />
                {isFieldInvalid("company") ? (
              <p>
                Company must be at least three letters long
              </p>
            ) : null}</label><br/><br/>
                <label htmlFor="pdescription">Description: <br/>
                <input type="text" id="pdescription" name="pdescription" required className={!isFieldInvalid ? "success" : ""}   {...getFieldProps("description")}/>
                {isFieldInvalid("description") ? (
              <p >
                Description must be at least three letters long
              </p>
            ) : null}</label><br/><br/>
                <label htmlFor="pimage">Image URL: <br/>
                <input type="text" id="pimage" name="pimage" required {...getFieldProps("url")}/></label><br/><br/>
            <label htmlFor="phtml">HTML<input type="checkbox" id="phtml" name="phtml" value="HTML" required/></label>
            <br/>
            <label htmlFor="pcss">CSS<input type="checkbox" id="pcss" name="pcss" value="CSS" required/></label>
            <br/>
            <label htmlFor="pjavascript">JavaScript<input type="checkbox" id="pjavascript" name="pjavascript" value="JavaScript" required/></label>
            <br/>
            <label htmlFor="preact">React<input type="checkbox" id="preact" name="preact" value="React" required/></label>
            <br/>
            <label htmlFor="pnode">NodeJS<input type="checkbox" id="pnode" name="pnode" value="NodeJS" required/></label>
            <br/>
            <label htmlFor="pnext">NextJS<input type="checkbox" id="pnext" name="pnext" value="NextJS" required/></label>
            <br/>
            <label htmlFor="padress">Website-adress:<br/>
            <input type="text" id="padress" name="padress" required {...getFieldProps("website")}/>
            </label><br/><br/>
            <label htmlFor="pdate">Created at:<br/>
            <input type="date" id="pdate" name="pdate" required {...getFieldProps("createdAt")}/>
            </label>
                <button type="submit" id="button-bgcolor add-new-project">Submit</button>
            </form>
        </article>

    )
  }