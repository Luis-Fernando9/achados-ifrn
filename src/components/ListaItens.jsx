import ItemCard from "./ItemCard";

function ListaItens(props) {
  if (props.itens.length === 0) {
    return <p className="mensagem-vazia">Nenhum item encontrado.</p>;
  }

  return (
    <div className="lista-itens">
      {props.itens.map(function (item) {
        return <ItemCard key={item.id} item={item} />;
      })}
    </div>
  );
}

export default ListaItens;
