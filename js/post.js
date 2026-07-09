const form = document.getElementById("projectForm");
const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const submitButton = form.querySelector("button[type='submit']");
const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

function getProjects() {
  return JSON.parse(localStorage.getItem("projects")) || [];
}

function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

if (editId) {
  const projects = getProjects();
  const project = projects.find(item => String(item.id) === editId);

  if (project) {
    nameInput.value = project.name || "";
    titleInput.value = project.title;
    descriptionInput.value = project.description;
    submitButton.textContent = "更新";
    form.dataset.editingId = project.id;
  }
}

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const projects = getProjects();
  const editingId = form.dataset.editingId;

  if (editingId) {
    const project = projects.find(item => String(item.id) === String(editingId));

    if (project) {
      project.name = nameInput.value;
      project.title = titleInput.value;
      project.description = descriptionInput.value;
      saveProjects(projects);
      alert("更新完了");
    }
  } else {
    const project = {
      id: Date.now(),
      owner: localStorage.getItem("userId"),
      name: nameInput.value,
      title: titleInput.value,
      description: descriptionInput.value,
      createdAt: new Date().toLocaleDateString()
    };

    projects.push(project);
    saveProjects(projects);
    alert("投稿完了");
  }

  location.href = "view.html";
});
