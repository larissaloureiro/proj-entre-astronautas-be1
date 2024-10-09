const express = require('express')
const { v4: uuidv4 } = require ('uuid')

const app = express()
app.use(express.json())
const router = express.Router()
const porta = 3333

const listaDeAlunes = []

// Função para calcular a situação das alunes
function calculaSituacao(notas) {
  //Calcula a soma das notas
  let somaNotas = 0
  for (nota of notas) {
    somaNotas = somaNotas + nota
  }

  // Calcula a média da alune
  const media = somaNotas / notas.length

  //Verifica se a média é menor do que 5, caso positivo retorna 'Reprovade'
  if (media < 5) {
    return 'Reprovade'
  }

  // Caso não tenha entrado no if, vai retornar 'Aprovade'
  return 'Aprovade'
}

// POST /alunes - Cadastra alune
function adicionaAlune(request, response){
  // Cria um objeto com as informações da alune que foram passadas através do body da requisição
  const alune = {
    id: uuidv4(),
    nome: request.body.nome,
    notas: request.body.notas,
    situacao: calculaSituacao(request.body.notas)
  }
  listaDeAlunes.push(alune)
  response.json(alune)
}

// GET /alunes/aprovades - Lista alunes aprovades (apenas nomes)
function listaAlunesAprovades(request, response) {
  const aprovades = []
  for (alune of listaDeAlunes) {
    // Verifica se a situação da alune é 'Aprovade', caso positivo, adiciona à lista de alunes aprovades
    if (alune.situacao === 'Aprovade') {
      aprovades.push(alune.nome)
    }
  }
  response.json(aprovades)
}

// GET /alunes/reprovades - Lista alunes reprovades (apenas nomes)
function listaAlunesReprovades(request, response){
  const aprovades = []
  for (alune of listaDeAlunes){
    // Verifica se a situação da alune é 'Reprovade', caso positivo, adiciona à lista de alunes reprovades
    if (alune.situacao === 'Reprovade'){
      aprovades.push(alune.nome)
    }
  }
  response.json(aprovades)
}

// GET /alunes - Lista alunes (todes)
function listaAlunes(request, response){
  response.json(listaDeAlunes)
}

// PATCH /alunes/:id - Corrige um cadastro de alune
function corrigeAlune(request, response) {

  function encontraAlune(alune) {
    if (alune.id === request.params.id) {
      return alune
    }
  }

  const aluneEncontrada = listaDeAlunes.find(encontraAlune)
  if (request.body.nome) {
    aluneEncontrada.nome = request.body.nome
  }

  if (request.body.notas) {
    aluneEncontrada.notas = request.body.notas
  }

  response.json(listaDeAlunes)
 }

// DELETE /alunes/:id - Apaga um cadastro de alune
function deletaAlune(request, response) {
  function todesMenosElu(alune) {
    if (alune.id !== request.params.id) {
      return alune
    }
  }
  const alunesQueFicaram = listaDeAlunes.filter(todesMenosElu)
  response.json(alunesQueFicaram)
 }


function mostraPorta(){
  console.log('Aplicação rodando na porta ', porta)
}

app.listen (porta, mostraPorta)

app.use(router.post('/alunes', adicionaAlune)) // Configuração da rota para cadastrar alune
app.use(router.get('/alunes/aprovades', listaAlunesAprovades)) // Config. da rota para listar alunes aprovades (apenas nomes)

// Atividade em Grupo
app.use(router.get('/alunes/reprovades', listaAlunesReprovades)) // Config. da rota para listar alunes reprovades (apenas nomes)
app.use(router.get('/alunes', listaAlunes)) // Configuração da rota para listar alunes (todes)

// Configuração da rotas Extras
app.use(router.delete('/alunes/:id', deletaAlune)) // Configuração da rota para apagar um cadastro de alune
app.use(router.patch('/alunes/:id', corrigeAlune)) // Configuração da rota para corrigir um cadastro de alune

