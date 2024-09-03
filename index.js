const el = document.getElementById("add-new-project")
if(el) { el.addEventListener("click", () => {
    const projectInput1 = document.getElementById("pname");

    const projectInputValue = projectInput1.value;

    const projectInput2 = document.getElementById("pcompany");

    const projectInputValue2 = projectInput2.value;

    const projectInput3 = document.getElementById("pdescription");

    const projectInputValue3 = projectInput3.value;

    const projectInput4 = document.getElementById("pimage");

    const projectInputValue4 = projectInput4.value;

    if(!projectInputValue || !projectInputValue2 || !projectInput3 || !projectInputValue4) return;

    const projectContainer = document.createElement("article");
    projectContainer.setAttribute("id", "article");
    projectContainer.setAttribute("class", "articles");


    const newProjectInput1 = document.createElement("h2");
    newProjectInput1.textContent =`${projectInputValue}`;

    const newProjectInput2 = document.createElement("h4");
    newProjectInput2.textContent =`${projectInputValue2}`
    
    const newProjectInput3 = document.createElement("p");
    newProjectInput3.textContent =`${projectInputValue3}`;

    const newProjectInput4 = document.createElement("img");
    newProjectInput4.textContent =`${projectInputValue4}`;

    projectContainer.appendChild(newProjectInput1, newProjectInput2, newProjectInput3, newProjectInput4);

    projectInput1.value = "";
    projectInput2.value = "";
    projectInput3.value = "";
    projectInput4.value = "";

} );

}

function saveProjects() {

    const projects = [];
    const projectElements = document.querySelector("#article h2");
    const projectElements2 = document.querySelector("#article h4");
    const projectElements3 = document.querySelector("#article p");
    const projectElements4 = document.querySelector("#article img");
    
    projects.push(projectElements.textContent);

    projects.push(projectElements2.textContent);

    projects.push(projectElements3.textContent);
    projects.push(projectElements4.textContent);
    
    localStorage.setItem("project", JSON.stringify(projects));
}

function loadProjects () {

    const loadProject = JSON.parse(window.localStorage.getItem("project")) || [];
    console.log(loadProject);

    for (const project of loadProject) {
        const newProjectName = document.createElement("h2");
        const newProjecCompany = document.createElement("h4");
        const newProjectDescription = document.createElement("p");
        const newProjectImage = document.createElement("img");

        newProjectName.textContent = project;
        newProjecCompany.textContent = project;
        newProjectDescription.textContent = project;
        newProjectImage.src = project;

        document.getElementById("article").appendChild(newProjectName, newProjecCompany, newProjectDescription, newProjectImage);

        document
  .getElementById("add-new-project")
  .addEventListener("click", saveProjects);

// Legger til ekstra lytter for å oppdatere localStorage
document.getElementById("article").addEventListener("click", saveProjects);
    }
}

loadProjects();