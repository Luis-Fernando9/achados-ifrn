import { Link } from "react-router-dom";

function Cabecalho(props) {
  return (
    <header className="cabecalho">
      <Link to="/" className="cabecalho-logo">
        Achados IFRN
      </Link>
      {props.usuario && (
        <span className="cabecalho-usuario">Olá, {props.usuario.nome}</span>
      )}
    </header>
  );
}

export default Cabecalho;
