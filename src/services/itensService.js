import api from "./api";

// Dados do dono da chave (nome, matrícula, turma, total de itens)
export async function buscarUsuario() {
  const resposta = await api.get("/eu");
  return resposta.data;
}

// Lista os itens, aceitando filtros opcionais: status, categoria, local, busca
export async function listarItens(filtros) {
  const resposta = await api.get("/itens", { params: filtros });
  return resposta.data;
}

// Detalhe de um item
export async function buscarItem(id) {
  const resposta = await api.get("/itens/" + id);
  return resposta.data;
}

// Cadastra um item novo
export async function criarItem(item) {
  const resposta = await api.post("/itens", item);
  return resposta.data;
}

// Edita um item existente (mesmo corpo do cadastro)
export async function editarItem(id, item) {
  const resposta = await api.put("/itens/" + id, item);
  return resposta.data;
}

// Marca um item como devolvido
export async function devolverItem(id, devolvidoPara) {
  const resposta = await api.patch("/itens/" + id + "/devolver", {
    devolvido_para: devolvidoPara,
  });
  return resposta.data;
}

// Exclui um item
export async function excluirItem(id) {
  await api.delete("/itens/" + id);
}

// Lista de categorias para preencher o campo de seleção
export async function listarCategorias() {
  const resposta = await api.get("/categorias");
  return resposta.data;
}

// Lista de locais para preencher o campo de seleção
export async function listarLocais() {
  const resposta = await api.get("/locais");
  return resposta.data;
}
