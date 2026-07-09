const form = document.getElementById("projectForm");
const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const passwordInput = document.getElementById("password");
const submitButton = form.querySelector("button[type='submit']");
const deleteButton = document.getElementById("deleteButton");
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
    deleteButton.hidden = false;
    form.dataset.editingId = project.id;
  }
}

deleteButton.addEventListener("click", () => {
  const editingId = form.dataset.editingId;

  if (!editingId) {
    return;
  }

  const confirmed = window.confirm("この投稿を削除しますか？");

  if (!confirmed) {
    return;
  }

  const projects = getProjects();
  const updatedProjects = projects.filter(item => String(item.id) !== String(editingId));
  saveProjects(updatedProjects);
  alert("削除しました");
  location.href = "view.html";
});

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const projects = getProjects();
  const editingId = form.dataset.editingId;

  if (editingId) {
    const project = projects.find(item => String(item.id) === String(editingId));

    if (!project) {
      alert("投稿が見つかりません");
      return;
    }

    if (project.password !== passwordInput.value) {
      alert("パスワードが違います");
      return;
    }

    project.name = nameInput.value;
    project.title = titleInput.value;
    project.description = descriptionInput.value;
    saveProjects(projects);
    alert("更新完了");
  } else {
    const project = {
      id: Date.now(),
      owner: localStorage.getItem("userId"),
      name: nameInput.value,
      title: titleInput.value,
      description: descriptionInput.value,
      password: passwordInput.value,
      createdAt: new Date().toLocaleDateString()
    };

    projects.push(project);
    saveProjects(projects);
    alert("投稿完了");
  }

  location.href = "view.html";
});
