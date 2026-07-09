const form = document.getElementById("projectForm");

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const projects =
    JSON.parse(localStorage.getItem("projects")) || [];

  const project = {
    id: Date.now(),
    owner: localStorage.getItem("userId"),
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    createdAt: new Date().toLocaleDateString()
  };

  projects.push(project);

  localStorage.setItem(
    "projects",
    JSON.stringify(projects)
  );

  alert("投稿完了");

  location.href = "view.html";
});
