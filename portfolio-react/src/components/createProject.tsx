function createProject() {


    return(
            <form id="projectForm" method="POST" action="/">
            <label>Name: </label>
            <input type="text" id="pname" name="pname" />
            <label>Company: </label>
            <input type="text" id="pcompany" name="pcompany" />
            <label>Description: </label>
            <input type="text" id="pdescription" name="pdescription" />
            <label>Image URL: </label>
            <input type="text" id="pimage" />
            <button type="submit" id="button-bgcolor add-new-project">Submit</button>
          </form>
        

    )
}
export default createProject