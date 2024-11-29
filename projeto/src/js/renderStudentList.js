function renderStudentList() {
  studentTableBody.innerHTML = ''; 

  students.forEach(student => {
      const row = document.createElement('tr');

      // Célula do nome
      const nameCell = document.createElement('td');

      // Criação do botão com imagem
      const imgButton = document.createElement('button');
      imgButton.classList.add('src/img/jorge.PNG'); // Adiciona classe para estilização

      const imgElement = document.createElement('img');
      imgElement.src = '/src/img/jorge.PNG'; // Caminho da imagem
      imgElement.alt = 'Foto de perfil';
      imgElement.classList.add('profile-pic');

      // Adiciona a imagem ao botão
      imgButton.appendChild(imgElement);

      // Adiciona evento de clique para abrir detalhes do aluno
      imgButton.onclick = () => openStudentDetails(student);

      // Adiciona o botão à célula
      nameCell.appendChild(imgButton);

      // Células de dados
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

      // Célula de ações
      const actionsCell = document.createElement('td');

      const editBtn = document.createElement('img');
      editBtn.src = 'src/img/alterar (1).PNG'; // Caminho da imagem de editar
      editBtn.alt = 'Editar';
      editBtn.title = 'Editar';
      editBtn.onclick = () => showStudentForm(student);

      const deleteBtn = document.createElement('img');
      deleteBtn.src = 'src/img/excluir.PNG'; // Caminho da imagem de excluir
      deleteBtn.alt = 'Excluir';
      deleteBtn.title = 'Excluir';
      deleteBtn.onclick = () => deleteStudent(student);

      // Adiciona os botões de editar e excluir à célula de ações
      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(deleteBtn);

      // Adiciona todas as células à linha
      row.appendChild(nameCell);
      row.appendChild(idCell);
      row.appendChild(emailCell);
      row.appendChild(phoneCell);
      row.appendChild(rmCell);
      row.appendChild(guardianCell);
      row.appendChild(actionsCell);

      // Adiciona a linha à tabela
      studentTableBody.appendChild(row);
  });
}
