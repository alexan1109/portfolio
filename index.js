// Henter referanser til HTML-elementer
const form = document.getElementById("projectForm");
const ProjectWrapper = document.getElementById("grid-container");
const projects = []; // Intern liste med vaner

// Legger til en lytter som fanger opp sending av skjema
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Forhindrer standard oppførsel ved sending av skjema

  // Oppretter et nytt vane-objekt basert på brukerens input
  const newProject = {
    name: event.target.projects.name.value,
    company: event.target.projects.company.value,
    description: event.target.projects.description.value,
    url: event.target.projects.url.src,
    createdAt: new Date(),
  };

  projects.push(newProject); // Legger til den nye vanen i den interne listen
  updateProjectWrapper(); // Oppdaterer visningen av vaner på nettsiden

  // Forsøker å sende vanen til serveren
  try {
    const response = await fetch("http://localhost:3999/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    // Håndterer serverresponsen
    if (response.status === 201) {
      console.log("prosjekt lagret på serveren");
    } else {
      console.error("Feil ved lagring av projsekt på serveren");
    }
  } catch (error) {
    console.error("Feil ved sending av data til serveren:", error);
  }
});

// Funksjon for å oppdatere visningen av vaner på nettsiden
function updateProjectWrapper() {
    console.log(projects);
    ProjectWrapper.innerHTML = ""; // Tømmer listen før ny oppdatering
  
    // Legger til hver vane som et listeelement
    for (const projectData of projects) {
      const projectName = document.createElement("h2");
      const projectCompany = document.createElement("h4");
      const projectDescription = document.createElement("p");
      const projectUrl = document.createElement("img");
      projectName.textContent = `${projectData.name}`
      projectCompany.textContent = `${projectData.company}`
      projectDescription.textContent = `${projectData.description}`
      projectUrl.src = `${projectData.url} - ${new Date(
        project.createdAt
      ).toLocaleDateString()}`;
      ProjectWrapper.appendChild(projectName, projectCompany, projectDescription, projectUrl);
    }
}