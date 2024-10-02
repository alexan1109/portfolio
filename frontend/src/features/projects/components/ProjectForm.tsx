import useProjectForm from "../hooks/useProjectForm.tsx";

type ProjectFormProps = {
    addProject: (title: string, company: string, description: string, url: string, website: string) => void;
  };

  export default function ProjectForm(props: Readonly<ProjectFormProps>) {
    const { addProject } = props;

    const { handleSubmit, getFieldProps, isFieldInvalid } = useProjectReducerForm({
        initialFields: { title: "", company: "", descirption: "", url: "", website: "",},
        onSubmit: (data: { title: string; company: string; description: string; url: string; website: string; }) => addProject(data.title, data.company, data.description, data.url, data.website),
        validate: {
          title: (_: any, value: string | any[]) => value.length > 2,
          company: (_: any, value: string | any[]) => value.length > 2,
          description: (_: any, value: string | any[]) => value.length > 2,
          url: (_: any, value: string | any[]) => value.length > 2,
          adress: (_: any, value: string | any[]) => value.length > 2,
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
                <input type="text" id="pcompany" name="pcompany" required {!isFieldInvalid ? "success" : ""}   {...getFieldProps("title")} />
                {isFieldInvalid("company") ? (
              <p>
                Title must be at least three letters long
              </p>
            ) : null}</label><br/><br/>
                <label>Description: <br/>
                <input type="text" id="pdescription" name="pdescription" required {!isFieldInvalid ? "success" : ""}   {...getFieldProps("title")}/>
                {isFieldInvalid("description") ? (
              <p >
                Title must be at least three letters long
              </p>
            ) : null}</label><br/><br/>
                <label>Image URL: <br/>
                <input type="text" id="pimage" name="pimage" required {!isFieldInvalid ? "success" : ""}   {...getFieldProps("title")}/>
                {isFieldInvalid("url") ? (
              <p>
                Title must be at least three letters long
              </p>
            ) : null}</label><br/><br/>
            <label>Website-adress:<br/>
            <input type="text" id="pimage" name="pimage" required {!isFieldInvalid ? "success" : ""}   {...getFieldProps("title")}/>
                {isFieldInvalid("adress") ? (
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