const studentTableBody = document.getElementById('studentTableBody');
const newStudentModal = document.getElementById('newStudentModal');
const emailErrorDiv = document.getElementById('emailError');
const emailInput = document.getElementById('studentEmail');

let students = [];

function renderStudentList() {
  studentTableBody.innerHTML = '';
  students.forEach(student => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const imgElement = document.createElement('img');
    imgElement.src = 'img/jorge.PNG';
    imgElement.alt = 'Foto de perfil';
    imgElement.classList.add('profile-pic');
    const nameLink = document.createElement('a');
    nameLink.href = '#';
    nameLink.textContent = student.name;
    nameLink.onclick = () => openStudentDetails(student);
    nameCell.appendChild(imgElement);
    nameCell.appendChild(nameLink);
    const idCell = document.createElement('td');
    idCell.textContent = student.id;
    const emailCell = document.createElement('td');
    emailCell.textContent = student.email;
    const phoneCell = document.createElement('td');
    phoneCell.textContent = student.phone;
    const rmCell = document.createElement('td');
    rmCell.textContent = student.rm;
    const guardianCell = document.createElement('td');
    guardianCell.textContent = student.guardian;
    const actionsCell = document.createElement('td');
    const editBtn = document.createElement('img');
    editBtn.src = 'img/alterar (1).PNG';
    editBtn.alt = 'Editar';
    editBtn.title = 'Editar';
    editBtn.onclick = () => showStudentForm(student);
    const deleteBtn = document.createElement('img');
    deleteBtn.src = 'img/excluir.PNG';
    deleteBtn.alt = 'Excluir';
    deleteBtn.title = 'Excluir';
    deleteBtn.onclick = () => deleteStudent(student);
    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);
    row.appendChild(nameCell);
    row.appendChild(idCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(rmCell);
    row.appendChild(guardianCell);
    row.appendChild(actionsCell);
    studentTableBody.appendChild(row);
  });
}

function deleteStudent(student) {
  // Remover o aluno da lista
  students = students.filter(s => s.id !== student.id);

  // Atualizar a tabela
  renderStudentList();
}

function showStudentForm(student = null) {
  if (student) {
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentPhone').value = student.phone;
    document.getElementById('studentRM').value = student.rm;
    document.getElementById('studentEmail').value = student.email;
    document.getElementById('studentGuardian').value = student.guardian;
    // Adicione a lógica para exibir a foto do aluno, se houver
  } else {
    document.getElementById('studentName').value = '';
    document.getElementById('studentPhone').value = '';
    document.getElementById('studentRM').value = '';
    document.getElementById('studentEmail').value = '';
    document.getElementById('studentGuardian').value = '';
    // Limpe a foto do aluno
  }
  newStudentModal.style.display = 'flex';
}

function closeFormModal() {
  newStudentModal.style.display = 'none';
}

function openStudentDetails(student) {
  document.getElementById('detailName').textContent = student.name;
  document.getElementById('detailID').textContent = student.id;
  document.getElementById('detailEmail').textContent = student.email;
  document.getElementById('detailPhone').textContent = student.phone;
  document.getElementById('detailRM').textContent = student.rm;
  document.getElementById('detailGuardian').textContent = student.guardian;
  document.getElementById('studentDetails').style.display = 'block';
}

function closeStudentDetails() {
  document.getElementById('studentDetails').style.display = 'none';
}

emailInput.addEventListener('input', () => {
  const email = emailInput.value;
  if (students.some(s => s.email === email)) {
    emailErrorDiv.style.display = 'block';
  } else {
    emailErrorDiv.style.display = 'none';
  }
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
    // Adicione a lógica para obter a foto do aluno, se houver
  };
  students.push(student);
  renderStudentList();
  closeFormModal();
});

renderStudentList();

function previewImage() {
  const fileInput = document.getElementById('foto');
  const previewImage = document.getElementById('preview-image');

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result;
      previewImage.style.display = 'block';
    }
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    previewImage.src = '#';
    previewImage.style.display = 'none';
  }
}

function salvarInformacoes() {
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const rm = document.getElementById('rm').value;
  const email = document.getElementById('email').value;
  const responsavel = document.getElementById('responsavel').value;
  const fotoInput = document.getElementById('foto');
  let fotoUrl = '';

  if (fotoInput.files && fotoInput.files[0]) {
    fotoUrl = URL.createObjectURL(fotoInput.files[0]);
  }

  console.log('Nome:', nome);
  console.log('Telefone:', telefone);
  console.log('RM:', rm);
  console.log('E-mail:', email);
  console.log('Responsável:', responsavel);
  console.log('Foto:', fotoUrl);
}

function exportStudentsToCSV() {
  const csvRows = [['Nome', 'ID', 'Email', 'Telefone', 'RM', 'Responsável']];
  students.forEach(student => {
    csvRows.push([
      student.name,
      student.id,
      student.email,
      student.phone,
      student.rm,
      student.guardian
    ]);
  });
  const csvContent = csvRows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'alunos.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.querySelector('.export-button').addEventListener('click', exportStudentsToCSV);