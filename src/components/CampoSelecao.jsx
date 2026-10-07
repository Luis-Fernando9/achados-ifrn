function CampoSelecao(props) {
  function aoSelecionar(evento) {
    props.aoAlterar(evento.target.value);
  }

  return (
    <div className="campo">
      <label>{props.rotulo}</label>
      <select value={props.valor} onChange={aoSelecionar}>
        <option value="">{props.rotuloVazio || "Todos"}</option>
        {props.opcoes.map(function (opcao) {
          return (
            <option key={opcao} value={opcao}>
              {opcao}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CampoSelecao;
