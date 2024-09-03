// Henter referanser til HTML-elementer
const form = document.getElementById("projectForm");
const ProjectWrapper = document.getElementById("grid-container");
const projects = []; // Intern liste med prosjekter

// Legger til en lytter som fanger opp sending av skjema
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Forhindrer standard oppførsel ved sending av skjema

  // Oppretter et nytt prosjekt-objekt basert på brukerens input
  const newProject = {
    name: event.target.elements.pname.value,
    company: event.target.elements.pcompany.value,
    description: event.target.elements.pdescription.value,
    url: event.target.elements.pimage.src,
  };

  projects.push(newProject); // Legger til det nye prosjektet i den interne listen
  updateProjectWrapper(); // Oppdaterer visningen av prosjekter på nettsiden

  // Forsøker å sende prosketet til serveren
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


function updateProjectWrapper() {
  console.log(projects);
  ProjectWrapper.innerHTML = ""; // Tømmer listen før ny oppdatering

  // Legger til hver vane som et listeelement
  for (const project of projects) {
    const projectName = document.createElement("h2");
    const projectCompany = document.createElement("h4");
    const projectDescription = document.createElement("p");
    const projectImage = document.createElement("img");
    projectName.textContent = `${project.name}`;
    projectCompany.textContent = `${project.company}`;
    projectDescription.textContent = `${project.description}`;
    projectImage.src = `${project.url}`;

    ProjectWrapper.appendChild(projectName);
    ProjectWrapper.appendChild(projectCompany);
    ProjectWrapper.appendChild(projectDescription);
    ProjectWrapper.appendChild(projectImage);

  }
}
