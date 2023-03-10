import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom'
import './home.css'

//URL DA API: movie/now_playing?api_key=13cf77ea66560f26fbbbff9302a0b1a8&language=pt-br

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true) //tela de carregamento on

    useEffect(()=>{ //quando o nosso app abre o useEffect é chamado

        async function loadFilmes(){
            //await para esperar um pouco na requisição
            const response = await api.get("movie/now_playing",{
                params:{
                  api_key: "13cf77ea66560f26fbbbff9302a0b1a8",
                  language: "pt-BR",
                  page: 1,
                }
            })    

            //console.log(response.data.results.slice(0,10));
            
            
            setFilmes(response.data.results.slice(0,10))
            setLoading(false)//se os resultados dos filmes vierem a tela de carregamento some
        }

        loadFilmes();

    },[]);


    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme)=>{ //percorrendo array de filmes
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;