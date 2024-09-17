function createProject() {
    return(
        <>
            <form>
                <input name="projectName" id="projectName" type="text" placeholder="Project name"></input>
                <input name="companyName" id="companyName" type="text" placeholder="Company name"></input>
                <input name="description" id="description" type="text" placeholder="Project description"></input>
                <input name="url" id="url" type="text" placeholder="image url"></input>     
            </form>
        </>

    )
}
export default createProject