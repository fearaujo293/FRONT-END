function renderStudentList() {
  studentTableBody.innerHTML = ''; // Limpa a tabela existente

  const fragment = document.createDocumentFragment(); // Fragmento para manipulação otimizada do DOM

  students.forEach(student => {
    const row = document.createElement('tr'); // Criação da linha

    // Célula de nome com botão e imagem
    const nameCell = createImageButtonCell(
      '/src/img/jorge.PNG', 
      'Foto de perfil', 
      'profile-pic', 
      () => openStudentDetails(student)
    );

    // Outras células de dados
    const idCell = createCell(student.id);
    const emailCell = createCell(student.email);
    const phoneCell = createCell(student.phone);
    const rmCell = createCell(student.rm);
    const guardianCell = createCell(student.guardian);

    // Célula de ações com botões de editar e excluir
    const actionsCell = createActionsCell(student);

    // Adiciona todas as células à linha
    row.append(nameCell, idCell, emailCell, phoneCell, rmCell, guardianCell, actionsCell);

    // Adiciona a linha ao fragmento
    fragment.appendChild(row);
  });

  // Adiciona o fragmento à tabela de forma otimizada
  studentTableBody.appendChild(fragment);
}

/**
 * Função auxiliar para criar uma célula com texto.
 */
function createCell(content) {
  const cell = document.createElement('td');
  cell.textContent = content;
  return cell;
}

/**
 * Função auxiliar para criar uma célula com um botão contendo uma imagem.
 */
function createImageButtonCell(imgSrc, imgAlt, imgClass, onClick) {
  const cell = document.createElement('td');

  const button = document.createElement('button');
  button.classList.add('image-button'); // Classe genérica para estilização

  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = imgAlt;
  img.classList.add(imgClass);

  button.appendChild(img);
  button.onclick = onClick;

  cell.appendChild(button);
  return cell;
}

/**
 * Função auxiliar para criar uma célula de ações com botões de editar e excluir.
 */
function createActionsCell(student) {
  const cell = document.createElement('td');

  const editBtn = createActionButton(
    'src/img/alterar (1).PNG',
    'Editar',
    'Editar',
    () => showStudentForm(student)
  );

  const deleteBtn = createActionButton(
    'src/img/excluir.PNG',
    'Excluir',
    'Excluir',
    () => deleteStudent(student)
  );

  cell.append(editBtn, deleteBtn);
  return cell;
}

/**
 * Função auxiliar para criar um botão de ação com uma imagem.
 */
function createActionButton(imgSrc, imgAlt, imgTitle, onClick) {
  const btn = document.createElement('img');
  btn.src = imgSrc;
  btn.alt = imgAlt;
  btn.title = imgTitle;
  btn.onclick = onClick;
  return btn;
}