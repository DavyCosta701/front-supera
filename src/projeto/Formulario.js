import React, { useEffect, useState } from 'react';

const TransactionTable = () => {
  
  const [data, setData] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [saldoPeriodo, setSaldoPeriodo] = useState(0);


  const handlePost = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchParams = new URLSearchParams();
    for (const pair of formData.entries()) {
      searchParams.append(pair[0], pair[1]);
    }
    const queryString = searchParams.toString();

    try {
      const response = await fetch(`http://localhost:8080/?${queryString}`);
      if (response.status !== 200) {
        throw new Error('Bad Server Response');
      }
      const responseData = await response.json();
      setData(responseData.transactions);
      setSaldoTotal(responseData.saldoTotal);
      setSaldoPeriodo(responseData.saldoPeriodo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlePost();
  }, []);


  return (
    <div>
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
        <thead>
          <tr>
            <th>Data</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Operador</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.dataTransferencia}</td>
              <td>{transaction.valorTransferencia}</td>
              <td>{transaction.tipoTransferencia}</td>
              <td>{transaction.operador}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
        <p>Saldo Total: {saldoTotal}</p>
        <p>Saldo do Período: {saldoPeriodo}</p>
      </div>
      </div>
  );
};

export default TransactionTable;
