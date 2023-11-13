import React, { useEffect, useState } from 'react';

const CadastroConta = () => {
  
  const [data, setData] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [saldoPeriodo, setSaldoPeriodo] = useState(0);
  const [errorMessage, setErrorMessage] = useState([]);
  const [numeroConta, setNumeroConta] = useState([]);
  const [valorTransacao, setValorTransacao] = useState([]);




  const handlePost = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchParams = new URLSearchParams();
    for (const pair of formData.entries()) {
      searchParams.append(pair[0], pair[1]);
    }
    
    const numeroConta = searchParams.toString().split("&")[0].split("=")[1].replace("/","-")
    const valorTransacao = searchParams.toString().split("&")[1].split("=")[1].replace("/","-")


    const request = {
      'numeroConta': `${numeroConta}`,
      'valorTransacao': `${valorTransacao}`,

    }
    const url = "http://localhost:8080/transacao"
    //const queryString = searchParams.toString();
    console.log(request)
    const response = await fetch(url, {
      method: 'POST', // Especifica o método POST
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo
      },
      body: JSON.stringify(request), // Converte o objeto JavaScript em uma string JSON
    });
    const responseData = await response.json();
    console.log(response)
    if (response.status !== 200) {
      setErrorMessage(responseData.errors);
    } else {
      console.log("FUNFO")
      alert("usuario cadastrado")
      setNumeroConta("");
      setValorTransacao("");
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
    <div class='formulario'>
             {errorMessage ? errorMessage.map((error) => (<p style={{ color: 'red' }}>{error}</p>)) : null}
      <form onSubmit={handlePost}>
        <div className="search-group">
          <div className="input-group">
            <label htmlFor="data_inicio" class='entrada_dados' required>Número da conta</label>
            <input type="text"
             id="numeroConta"
              name="numeroConta" 
              value={numeroConta}
              onChange={e => setNumeroConta(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="data_fim" class='entrada_dados' required>Valor da transação</label>
            <input type="text" 
            id="valorTransacao" 
            name="valorTransacao"
            value={valorTransacao}
            onChange={e => setValorTransacao(e.target.value)}/>
          </div>
        </div>
        <button type='submit'>Cadastrar</button>
        </form>
    <div>
    <p className='paragrafo'></p>
    <br></br>
    <a href="/" className="cadastro">Voltar ao histórico</a>
      </div>
      
      </div>
  );
};

export default CadastroConta;
