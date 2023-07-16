import React, { useEffect, useState } from 'react';

const TransactionTable = () => {
  
  const [data, setData] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [saldoPeriodo, setSaldoPeriodo] = useState(0);
  const [errorMessage, setErrorMessage] = useState([]);


  const handlePost = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchParams = new URLSearchParams();
    for (const pair of formData.entries()) {
      searchParams.append(pair[0], pair[1]);
    }
    const queryString = searchParams.toString();

    const response = await fetch(`http://localhost:8080/?${queryString}`);
    const responseData = await response.json();

    if (response.status !== 200) {
      setErrorMessage(responseData.errors);
    } else {
      setErrorMessage([]);
      setData(responseData.transactions);
      setSaldoTotal(responseData.saldoTotal);
      setSaldoPeriodo(responseData.saldoPeriodo);
    }
  };

  useEffect(() => {
    handlePost();
  }, []);


  return (
    <div>
       {errorMessage ? errorMessage.map((error) => (<p style={{ color: 'red' }}>{error}</p>)) : null}
      <form onSubmit={handlePost}>
        <div className="search-group">
          <div className="input-group">
            <label htmlFor="data_inicio">Data de Início:</label>
            <input type="text" id="data_inicio" name="data_inicio" />
          </div>
          <div className="input-group">
            <label htmlFor="data_fim">Data Final:</label>
            <input type="text" id="data_fim" name="data_fim" />
          </div>
          <div className="input-group">
            <label htmlFor="operador">Operador:</label>
            <input type="text" id="operador" name="operador" />
          </div>
          <button type='submit'>Pesquisar</button>
        </div>
        </form>
    <div>
      <table>
      <caption>
        Saldo Total: R${saldoTotal} &nbsp; Saldo do Período: R${saldoPeriodo} &nbsp;&nbsp;&nbsp;
        </caption>
        <thead>
        
          <tr>
            <th>Data &nbsp;</th>
            <th>Valor &nbsp;</th>
            <th>Tipo &nbsp;</th>
            <th>Operador &nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.dataTransferencia}</td>
              <td>R${transaction.valorTransferencia}</td>
              <td>{transaction.tipoTransferencia}</td>
              <td>{transaction.operador}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      </div>
  );
};

export default TransactionTable;
