function MensagemErro(props) {
  if (!props.mensagem) {
    return null;
  }
  return <div className="mensagem-erro">{props.mensagem}</div>;
}

export default MensagemErro;
