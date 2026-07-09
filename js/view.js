const projectList =
  document.getElementById("projectList");

const search =
  document.getElementById("search");

let projects =
  JSON.parse(localStorage.getItem("projects")) || [];

function render(list) {

  projectList.innerHTML = "";

  list.forEach(project => {

    const card =
      document.createElement("div");

    card.className = "card";

    const currentUser =
      localStorage.getItem("userId");

    card.innerHTML = `
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <small>${project.createdAt}</small>
      ${
        project.owner === currentUser
          ? `<button onclick="editProject(${project.id})">
               編集
             </button>`
          : ""
      }
    `;

    projectList.appendChild(card);
  });
}

search.addEventListener("input", () => {

  const keyword =
    search.value.toLowerCase();

  const filtered =
    projects.filter(project =>
      project.title
        .toLowerCase()
        .includes(keyword)
    );

  render(filtered);
});

render(projects);
