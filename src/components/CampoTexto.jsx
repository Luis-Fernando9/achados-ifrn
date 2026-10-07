function CampoTexto(props) {
  function aoDigitar(evento) {
    props.aoAlterar(evento.target.value);
  }

  return (
    <div className="campo">
      <label>{props.rotulo}</label>
      {props.multilinha ? (
        <textarea value={props.valor} onChange={aoDigitar} rows={3} />
      ) : (
        <input type={props.tipo || "text"} value={props.valor} onChange={aoDigitar} />
      )}
    </div>
  );
}

export default CampoTexto;
