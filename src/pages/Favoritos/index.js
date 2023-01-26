import { useEffect, useState } from 'react';
import './favoritos.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Favoritos(){
    const [filmes, setFilmes] = useState([])


 useEffect(()=>{
    
    //peegando a lista de filmes salvos da localstorage
    const minhaLista = localStorage.getItem("@primeflix");
    //convertendo a lista de filmes em array
    setFilmes(JSON.parse(minhaLista) || [])


 },[])


 function excluirFilme(id){
   let filtroFilmes = filmes.filter((item) => {
        //devolverá todos os filmes menos o que foi clicado porque será excluido
        return(item.id !== id)
   })

   setFilmes(filtroFilmes);
   //passando a lista de filmes atualizada para o localstorage após a exclusão de um filme da lista
   localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
   toast.success("Filme removido com sucesso.")
}


    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}
            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                {/* excluindo um filme da lista pelo id */} 
                                <button onClick={() => excluirFilme(item.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;