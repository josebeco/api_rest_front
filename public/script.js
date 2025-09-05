const apiUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  carregarAlunos();

  document.getElementById("alunoForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const matricula = document.getElementById("matricula").value;
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    await fetch(`${apiUrl}/add?matricula=${matricula}&nome=${nome}&cpf=${cpf}&telefone=${telefone}&email=${email}`, {
      method: "POST"
    });

    e.target.reset();
    carregarAlunos();
  });
});

async function carregarAlunos() {
  const res = await fetch(`${apiUrl}/get`);
  const alunos = await res.json();

  const tbody = document.getElementById("alunosTable");
  tbody.innerHTML = "";

  alunos.forEach(aluno => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${aluno.matricula}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.cpf || ""}</td>
      <td>${aluno.telefone || ""}</td>
      <td>${aluno.email || ""}</td>
      <td>
        <button onclick="editarAluno('${aluno.matricula}', '${aluno.nome}', '${aluno.cpf || ""}', '${aluno.telefone || ""}', '${aluno.email || ""}')">Editar</button>
        <button data-action="delete" onclick="deletarAluno('${aluno.matricula}')">Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

async function deletarAluno(matricula) {
  await fetch(`${apiUrl}/del${matricula}`, {
    method: "DELETE"
  });
  carregarAlunos();
}

async function editarAluno(matricula, nome, cpf, telefone, email) {
  // formulário rápido de edição
  const novoNome = prompt("Novo nome:", nome);
  const novoCpf = prompt("Novo CPF:", cpf);
  const novoTelefone = prompt("Novo telefone:", telefone);
  const novoEmail = prompt("Novo email:", email);

  // se o usuário cancelar todos, não faz nada
  if (novoNome === null && novoCpf === null && novoTelefone === null && novoEmail === null) return;

  const updates = {
    nome: novoNome || nome,
    cpf: novoCpf || cpf,
    telefone: novoTelefone || telefone,
    email: novoEmail || email
  };

  await fetch(`${apiUrl}/edit${matricula}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });

  carregarAlunos();
}
