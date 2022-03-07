import { useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import api from "./services/api";
import './style.css'


function App() {

    const [input, setInput] = useState('');
    const [cep, setCep] = useState({});


    async function procurarCep() {

     

        if(input === ''){
            alert('Digite alguma coisa.')
            return;
        }
        try {
            const response = await api.get(input +'/json/')
            setCep(response.data)
            setInput('')

            if(response.data.status === 400){
                alert('CEP informado é inválido. Digite Novamente...')
            }
          
        } catch{
            alert('Erro ao buscar. Revise o número do seu Cep.');
            setInput('')
        }
    }

    
    return ( 

    <div className="home">
        <div className="header">
            <h1>Buski Cep</h1>
        </div>
    
        <div className="cep">            
                <h1 className="titleH">Digite o Cep</h1>
                    <div className="inputH">
                        <input className="input" placeholder="Digite seu Cep" value={input} onChange={(e) => setInput(e.target.value)}></input>
                        <button onClick={procurarCep}><AiOutlineFileSearch size={25}/></button>  
                    </div>
                    {Object.keys(cep).length > 0 && (
                        <main className="info">
                            <div className="infoC">    
                                <span>{cep.localidade} - {cep.uf}</span>           
                                <h1 className="city">{cep.cep}</h1>
                                <span>Rua: {cep.logradouro}</span>
                                <span>Bairo: {cep.bairro}</span>
                                <span>Código Ibge: {cep.ibge}</span>
                            </div>
                        </main>
                    )}
            </div>
    </div>
        
    );
}

export default App;