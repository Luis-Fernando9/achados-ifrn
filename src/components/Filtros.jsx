import CampoSelecao from "./CampoSelecao";

function Filtros(props) {
  return (
    <div className="filtros">
      <input
        className="campo-busca"
        type="text"
        placeholder="Buscar por nome ou descrição..."
        value={props.busca}
        onChange={function (e) {
          props.aoAlterarBusca(e.target.value);
        }}
      />
      <CampoSelecao
        rotulo="Status"
        rotuloVazio="Todos"
        valor={props.status}
        opcoes={["aguardando", "devolvido"]}
        aoAlterar={props.aoAlterarStatus}
      />
      <CampoSelecao
        rotulo="Categoria"
        rotuloVazio="Todas"
        valor={props.categoria}
        opcoes={props.categorias}
        aoAlterar={props.aoAlterarCategoria}
      />
      <CampoSelecao
        rotulo="Local"
        rotuloVazio="Todos"
        valor={props.local}
        opcoes={props.locais}
        aoAlterar={props.aoAlterarLocal}
      />
    </div>
  );
}

export default Filtros;
