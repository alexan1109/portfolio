import useProjectForm from "../hooks/useProjectForm.tsx";

type ProjectFormProps = {
    addProject: (title: string, company: string, description: string, url: string, website: string, createdAt: string) => void;
  };

  export default function ProjectForm(props: Readonly<ProjectFormProps>) {
    const { addProject } = props;

    const { handleSubmit, getFieldProps, isFieldInvalid } = useProjectForm({
        initialFields: { title: "", company: "", description: "", url: "", website: "", createdAt: "",},
        onSubmit: (data: { title: string; company: string; description: string; url: string; website: string; createdAt: string }) => addProject(data.title, data.company, data.description, data.url, data.website, data.createdAt),
        validate: {
          title: (_: any, value: string | any[]) => value.length > 2,
          company: (_: any, value: string | any[]) => value.length > 2,
          description: (_: any, value: string | any[]) => value.length > 2,
          url: (_: any, value: string | any[]) => value.length > 2,
          website: (_: any, value: string | any[]) => value.length > 2,
          createdAt: (_: any, value: string | any[]) => value.length > 2,
        },
      });

    return(
        <article id="form-style">
            <h3 id="form-title">Add new <br/> project</h3>
            <form id="projectForm" method="POST" action="/" onSubmit={handleSubmit}>
                <label>Name: <br/>
                <input type="text" id="pname" name="pname" required {!isFieldInvalid ? "success" : ""}   {...getFieldProps("title")}/>
                {isFieldInvalid("title") ? (
              <p>
                Title must be at least three letters long
              </p>
            ) : null}</label><br/><br/>
                <label>Company: <br/>
                <input type="text" id="pcompany" name="pcompany" required {!isFieldInvalid ? "success" : ""}   {...getFieldProps("company")} />
                {isFieldInvalid("company") ? (
              <p>
                Title must be at least three letters long
              </p>
            ) : null}</label><br/><br/>
                <label>Description: <br/>
                <input type="text" id="pdescription" name="pdescription" required {!isFieldInvalid ? "success" : ""}   {...getFieldProps("description")}/>
                {isFieldInvalid("description") ? (
              <p >
                Title must be at least three letters long
              </p>
            ) : null}</label><br/><br/>
                <label>Image URL: <br/>
                <input type="text" id="pimage" name="pimage" required {!isFieldInvalid ? "success" : ""}   {...getFieldProps("url")}/>
                {isFieldInvalid("url") ? (
              <p>
                Title must be at least three letters long
              </p>
            ) : null}</label><br/><br/>
            <label>Website-adress:<br/>
            <input type="text" id="pimage" name="pimage" required {!isFieldInvalid ? "success" : ""}   {...getFieldProps("website")}/>
                {isFieldInvalid("website") ? (
              <p>
                Title must be at least three letters long
              </p>
            ) : null}
            </label><br/><br/>
                <button type="submit" id="button-bgcolor add-new-project">Submit</button>
            </form>
        </article>

    )
  }