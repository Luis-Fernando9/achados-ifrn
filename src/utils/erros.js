export function obterMensagemErro(erro) {
  if (erro.response) {
    if (erro.response.data && erro.response.data.detail) {
      return erro.response.data.detail;
    }
    if (erro.response.status === 401) {
      return "Chave de acesso ausente ou inválida.";
    }
    if (erro.response.status === 404) {
      return "Item não encontrado.";
    }
  }
  return "Não foi possível completar a operação. Verifique sua conexão ou sua chave.";
}
