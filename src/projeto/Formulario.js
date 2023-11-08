import React, { useEffect, useState } from 'react';

const TransactionTable = () => {
  
  const [data, setData] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [saldoPeriodo, setSaldoPeriodo] = useState(0);
  const [errorMessage, setErrorMessage] = useState([]);


  
/*   const isValidDate = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(date);
  }; */

/*   const handleDataInicioChange = (event) => {
    const { value } = event.target;
    if (isValidDate(value) || value === '') {
      setDataInicio(value);
    }
  };
 */

  const handlePost = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchParams = new URLSearchParams();
    for (const pair of formData.entries()) {
      searchParams.append(pair[0], pair[1]);
    }
    
    const data_inicio = searchParams.toString().split("&")[0].split("=")[1].replace("/","-")
    const data_fim = searchParams.toString().split("&")[1].split("=")[1].replace("/","-")
    const operador = searchParams.toString().split("&")[2].split("=")[1]

    const request = {
      'dataInicial': `${data_inicio}`,
      'dataFinal': `${data_fim}`,
      'nomeOperador': `${operador}`
    }
    const url = "http://localhost:8080/"
    //const queryString = searchParams.toString();

    const response = await fetch(url, {
      method: 'POST', // Especifica o método POST
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo
      },
      body: JSON.stringify(request), // Converte o objeto JavaScript em uma string JSON
    });
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
            <label htmlFor="data_inicio" class='entrada_dados'>Data de Início</label>
            <input type="date" id="data_inicio" name="data_inicio" />
          </div>
          <div className="input-group">
            <label htmlFor="data_fim" class='entrada_dados'>Data Final </label>
            <input type="date" id="data_fim" name="data_fim"/>
          </div>
          <div className="input-group">
            <label htmlFor="operador" class='entrada_dados'>Operador</label>
            <input type="text" id="operador" name="operador" />
          </div>
        </div>
        <button type='submit'>Pesquisar</button>
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
