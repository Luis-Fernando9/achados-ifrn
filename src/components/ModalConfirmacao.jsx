function ModalConfirmacao(props) {
  if (!props.aberto) {
    return null;
  }

  return (
    <div className="modal-fundo">
      <div className="modal-caixa">
        <p>{props.mensagem}</p>
        <div className="modal-acoes">
          <button className="botao-perigo" onClick={props.aoConfirmar}>
            Excluir
          </button>
          <button className="botao-secundario" onClick={props.aoCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacao;
