
import fs from 'fs';
import path from 'path';

const FILE_PATH = path.resolve('./dados/dados.json');

function loadDados() {
  try {
      const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
      return JSON.parse(fileData);
  } catch (error) {
      return []; // Se o arquivo não existir ou estiver vazio
  }
}

var dados = loadDados()
//const localString = "DB"


function saveDados(dados) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(dados, null, 2), 'utf-8');
}

export const getDados = async (req, res) => {
    res.json(dados)
}



export const addDados = (req, res ) => {
    const matricula = req.query.matricula;
    const nome = req.query.nome;
    const cpf = req.query.cpf;
    const telefone = req.query.telefone;
    const email = req.query.email;

    if (!matricula || !nome) {
        return res.status(400).json({ error: 'Matricula and nome are required fields.' });
    }
    
    
    const aluno = {
        matricula: matricula,
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email
    };
      
    dados.push(aluno)

    //ocalStorage.setItem(localString, JSON.stringify(dados));
    saveDados(dados)
    res.status(201).json(aluno);
}

export const delDados = (req, res) => {
    const matriculaProcurada = req.params.matricula;
    dados = dados.filter(aluno => aluno.matricula !== matriculaProcurada);

   // localStorage.setItem(localString, JSON.stringify(dados));
   saveDados(dados)
    res.send("Sucessuful execution")
}

export const editDados = (req, res) => {
    const { matricula } = req.params;
    const updates = req.body; 

    const studentIndex = dados.findIndex(student => student.matricula === matricula);
  
    // If the student is not found, return an error
    if (studentIndex === -1) {
      return res.status(404).json({ error: 'Student not found.' });
    }
  
   
    let studentToUpdate = dados[studentIndex];
  
   
    Object.keys(updates).forEach(key => {
    
      if (studentToUpdate[key] !== undefined) {
        studentToUpdate[key] = updates[key];
      }
    });
  
   
    dados[studentIndex] = studentToUpdate;
    //localStorage.setItem(localString, JSON.stringify(dados));
    saveDados(dados)
    res.status(200).json(studentToUpdate);
}