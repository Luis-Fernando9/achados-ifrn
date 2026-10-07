import { Link } from "react-router-dom";

function ItemCard(props) {
  const item = props.item;

  return (
    <Link to={"/item/" + item.id} className="item-card">
      <div className="item-card-topo">
        <h3>{item.nome}</h3>
        <span className={"status-badge status-" + item.status}>{item.status}</span>
      </div>
      <p className="item-card-info">
        {item.categoria} · {item.local}
      </p>
    </Link>
  );
}

export default ItemCard;
