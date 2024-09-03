// Henter referanser til HTML-elementer
const form = document.getElementById("projectForm");
const ProjectWrapper = document.getElementById("grid-container");
const projects = []; // Intern liste med vaner

// Legger til en lytter som fanger opp sending av skjema
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Forhindrer standard oppførsel ved sending av skjema

  // Oppretter et nytt vane-objekt basert på brukerens input
  const newProject = {
    name: event.target.elements.name.value,
    company: event.target.elements.company.value,
    description: event.target.elements.description.value,
    url: event.target.elements.url.src,
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