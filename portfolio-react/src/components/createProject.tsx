import {useState, type FormEvent} from 'react'

function createProject ({list}: any) {

    const [addProjects, setAddProjects] = useState(list);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const form = event.target as HTMLFormElement | null;
      
        if (!form) return;
        const formData = new FormData(form);
      
        const name = formData.get('pname');
        const company = formData.get('pcompany');
        const description = formData.get('pdescription');
        const url = formData.get('pimage');

        if (!name || !company || !description || !url || typeof name !== 'string' || typeof company !== 'string' || typeof description !== 'string'
            || typeof url !== 'string'
        ) return;
        
        const updatedProjectsList = [...addProjects, { id: crypto.randomUUID(), name, company, description, url }];
setAddProjects(updatedProjectsList);

          form.reset();
    }

    return(
        <article id="form-style">
            <h3 id="form-title">Add new <br/> project</h3>
            <form id="projectForm" method="POST" action="/" onSubmit={handleFormSubmit}>
            <label>Name: <br/>
            <input type="text" id="pname" name="pname" /></label><br/><br/>
            <label>Company: <br/>
            <input type="text" id="pcompany" name="pcompany" /></label><br/><br/>
            <label>Description: <br/>
            <input type="text" id="pdescription" name="pdescription" /></label><br/><br/>
            <label>Image URL: <br/>
            <input type="text" id="pimage" /></label><br/><br/>
            <button type="submit" id="button-bgcolor add-new-project">Submit</button>
          </form>
        </article>

    )
}
export default createProject