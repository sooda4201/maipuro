const users = [{ username: 'admin', password: '1234' }];
const projects = [];
let searchKeyword = '';

const projectList = document.getElementById('project-list');
const historyList = document.getElementById('history-list');
const userInfo = document.getElementById('user-info');

document.getElementById('login-btn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', username);
    showUser();
  } else {
    alert('ユーザー名またはパスワードが違います');
  }
});

function showUser() {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    userInfo.innerHTML = `<p>ログイン中: ${currentUser}</p><button id="logout-btn">ログアウト</button>`;
    document.getElementById('logout-btn').onclick = logout;
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  userInfo.innerHTML = '';
}

document.getElementById('search-box').addEventListener('input', e => {
  searchKeyword = e.target.value.toLowerCase();
  renderProjects();
});

document.getElementById('add-btn').addEventListener('click', () => {
  const currentUser = localStorage.getItem('currentUser');

  projects.push({
    name: currentUser,
    projectName: document.getElementById('project-name').value,
    content: document.getElementById('content').value
  });

  renderProjects();
});

function renderProjects() {
  projectList.innerHTML = '';
  projects
    .filter(p => p.projectName.toLowerCase().includes(searchKeyword))
    .forEach(project => {
      const div = document.createElement('div');
      div.className = 'project';
      div.innerHTML = `<h3>${project.projectName}</h3><p>${project.name}</p>`;

      div.onclick = () => {
        alert(project.content);

        const history = JSON.parse(localStorage.getItem('history') || '[]');
        history.unshift({
          project: project.projectName,
          date: new Date().toLocaleString()
        });

        localStorage.setItem('history', JSON.stringify(history));
        renderHistory();
      };

      projectList.appendChild(div);
    });
}

function renderHistory() {
  historyList.innerHTML = '';
  const history = JSON.parse(localStorage.getItem('history') || '[]');

  history.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.project} (${item.date})`;
    historyList.appendChild(div);
  });
}

showUser();
renderHistory();