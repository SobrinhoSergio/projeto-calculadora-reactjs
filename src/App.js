import logo from './logo.svg';
import './App.css';
import { useState } from "react";

export default function App() {
  const [valorTela, setValorTela] = useState("");
  const [resultado, setResultado] = useState(0);
  const [acumulador, setAcumulador] = useState(0);
  const [operado, setOperado] = useState(false);

  //Components

  const Tela = (valor, res) => {
    return (
      <header>
        <span className="operacao">{valor}</span>
        <span className="resultado">{res}</span>
      </header>
    );
  };

  const Btn = (label, onClick) => {
    return <button onClick={onClick}>{label}</button>;
  };

  //Funções

  const addDigito = (d) => {
    if ((d == "+" || d == "-" || d == "*" || d == "/") && operado) {
      setOperado(false);
      setValorTela(resultado + d);
      return;
    } else if (operado) {
      setValorTela(d);
      setOperado(false);
      return;
    }
    const valorDigitadoTela = valorTela + d;
    setValorTela(valorDigitadoTela);
  };

  const limparMemoria = () => {
    setOperado(false);
    setValorTela("");
    setResultado(0);
    setAcumulador(0);
    return;
  };

  const Operacao = (oper) => {
    if (oper == "bs") {
      let vtela = valorTela;
      vtela = vtela.substring(0, vtela.length - 1);
      setValorTela(vtela);
      setOperado(false);
      return;
    }
    try {
      const r = eval(valorTela); //Cálculo
      setAcumulador(r);
      setResultado(r);
      setOperado(true);
    } catch {
      setResultado("ERRO");
    }
  };

  return (
    <div className="container">
      <h5>Calculadora Simples matemática</h5>
      {Tela(valorTela, resultado)}
      <main className="botoes">
        {Btn("AC", () => limparMemoria("AC"))}
        {Btn("(", () => addDigito("("))}
        {Btn(")", () => addDigito(")"))}
        {Btn("/", () => addDigito("/"))}
        {Btn("7", () => addDigito("7"))}
        {Btn("8", () => addDigito("8"))}
        {Btn("9", () => addDigito("9"))}
        {Btn("*", () => addDigito("*"))}
        {Btn("4", () => addDigito("4"))}
        {Btn("5", () => addDigito("5"))}
        {Btn("6", () => addDigito("6"))}
        {Btn("-", () => addDigito("-"))}
        {Btn("1", () => addDigito("1"))}
        {Btn("2", () => addDigito("2"))}
        {Btn("3", () => addDigito("3"))}
        {Btn("+", () => addDigito("+"))}
        {Btn("0", () => addDigito("0"))}
        {Btn(".", () => addDigito("."))}
        {Btn("<-", () => Operacao("bs"))}
        {Btn("=", () => Operacao("="))}
      </main>
    </div>
  );
}

