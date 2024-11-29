// Referências aos elementos da DOM
const studentTableBody = document.getElementById('studentTableBody');
const newStudentModal = document.getElementById('newStudentModal');
const emailErrorDiv = document.getElementById('emailError');
const emailInput = document.getElementById('studentEmail');

let students = [];

// Renderiza a lista de alunos na tabela
function renderStudentList() {
  studentTableBody.innerHTML = ''; // Limpa a tabela existente

  students.forEach(student => {
    const row = document.createElement('tr');

    // Célula do nome com imagem e link
    function createNameCell(student) {
        const nameCell = document.createElement('td');
        const imgElement = document.createElement('img');
        imgElement.src = student.photo || 'img/default-profile.jpg'; // Usa a foto do aluno ou uma padrão
        imgElement.alt = 'Foto de perfil';
        imgElement.classList.add('profile-pic');

    const nameLink = document.createElement('a');
    nameLink.href = '#';
    nameLink.textContent = student.name;
    nameLink.onclick = () => openStudentDetails(student);

  nameCell.append(imgElement, nameLink);
  return nameCell;
    }
    // Cria células de dados
    const idCell = createTextCell(student.id);
    const emailCell = createTextCell(student.email);
    const phoneCell = createTextCell(student.phone);
    const rmCell = createTextCell(student.rm);
    const guardianCell = createTextCell(student.guardian);

    // Célula de ações
    const actionsCell = createActionsCell(student);

    // Adiciona células à linha
    row.append(nameCell, idCell, emailCell, phoneCell, rmCell, guardianCell, actionsCell);

    // Adiciona a linha à tabela
    studentTableBody.appendChild(row);
  });
}

// Cria uma célula com nome e imagem
function createNameCell(student) {
  const nameCell = document.createElement('td');
  const imgElement = document.createElement('img');
  imgElement.src = 'pic.profile';
  imgElement.alt = 'Foto de perfil';
  imgElement.classList.add('profile-pic');

  const nameLink = document.createElement('a');
  nameLink.href = '#';
  nameLink.textContent = student.name;
  nameLink.onclick = () => openStudentDetails(student);

  nameCell.append(imgElement, nameLink);
  return nameCell;
}

// Cria uma célula de texto
function createTextCell(content) {
  const cell = document.createElement('td');
  cell.textContent = content;
  return cell;
}

// Cria a célula com botões de ação
function createActionsCell(student) {
  const actionsCell = document.createElement('td');

  // Botão Editar
  const editBtn = createButton(
    'img/alterar (1).PNG',
    'Editar',
    'Editar aluno',
    () => showStudentForm(student)
  );

  // Botão Excluir
  const deleteBtn = createButton(
    'img/excluir.PNG',
    'Excluir',
    'Excluir aluno',
    () => deleteStudent(student)
  );

  actionsCell.append(editBtn, deleteBtn);
  return actionsCell;
}

// Função genérica para criar botões com imagens
function createButton(src, alt, title, onClickHandler) {
  const btn = document.createElement('img');
  btn.src = src;
  btn.alt = alt;
  btn.title = title;
  btn.classList.add('action-btn');
  btn.onclick = onClickHandler;
  return btn;
}

// Remove um aluno da lista
function deleteStudent(student) {
  students = students.filter(s => s.id !== student.id);
  renderStudentList();
}

// Abre o formulário para adicionar ou editar um aluno
function showStudentForm(student = null) {
  // Preenche os campos se for edição
  document.getElementById('studentName').value = student ? student.name : '';
  document.getElementById('studentPhone').value = student ? student.phone : '';
  document.getElementById('studentRM').value = student ? student.rm : '';
  document.getElementById('studentEmail').value = student ? student.email : '';
  document.getElementById('studentGuardian').value = student ? student.guardian : '';

  newStudentModal.style.display = 'flex';
}

// Fecha o modal do formulário
function closeFormModal() {
  newStudentModal.style.display = 'none';
}

// Exibe detalhes do aluno
function openStudentDetails(student) {
  document.getElementById('detailName').textContent = student.name;
  document.getElementById('detailID').textContent = student.id;
  document.getElementById('detailEmail').textContent = student.email;
  document.getElementById('detailPhone').textContent = student.phone;
  document.getElementById('detailRM').textContent = student.rm;
  document.getElementById('detailGuardian').textContent = student.guardian;
  document.getElementById('studentDetails').style.display = 'block';
}

// Fecha a janela de detalhes do aluno
function closeStudentDetails() {
  document.getElementById('studentDetails').style.display = 'none';
}

// Valida e adiciona um novo aluno
emailInput.addEventListener('input', () => {
  const email = emailInput.value;
  emailErrorDiv.style.display = students.some(s => s.email === email) ? 'block' : 'none';
});

document.querySelector('.new-button').addEventListener('click', () => showStudentForm());
document.querySelector('.close-modal-form').addEventListener('click', closeFormModal);

document.querySelector('.form-submit').addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('studentEmail').value;
  if (students.some(s => s.email === email)) {
    emailErrorDiv.style.display = 'block';
    return;
  }

  const student = {
    name: document.getElementById('studentName').value,
    id: Math.floor(Math.random() * 100000),
    phone: document.getElementById('studentPhone').value,
    rm: document.getElementById('studentRM').value,
    email: email,
    guardian: document.getElementById('studentGuardian').value,
  };

  students.push(student);
  renderStudentList();
  closeFormModal();
});

// Renderiza a lista inicial de alunos
renderStudentList();
