function loadJSON() {

  fetch("/data.json")
.then((response) => {
      return response.json();
  })
.then((data) => {


      // Hent referanse til project-wrapper
      const projectContainer = document.getElementById('grid-container');
  
      // Nulle ut innholdet som er i project-wrapper fra før
      projectContainer.innerHTML = '';
  
      // Iterere gjennom listen med for...of og bruke template literals
      for (const project of data) {
          const articleHTML = `
              <article class="articles">
                  <h2>${project.name}</h2>
                  <h4>${project.company}</h4>
                  <p>${project.description}</p>
                  <img src=${project.url}/>
              </article>
              `
          ;
  
          // Legge til den nye article-en direkte i project-wrapper
          projectContainer.insertAdjacentHTML('beforeend', articleHTML);
      }
  


  })

  
}

loadJSON();