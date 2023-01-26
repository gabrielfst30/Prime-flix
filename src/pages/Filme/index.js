import { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom' 
import './filme.css'
import { toast } from 'react-toastify';


import api from '../../services/api'

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();// propriedade usada para navegação de paginas

    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "13cf77ea66560f26fbbbff9302a0b1a8",
                    language: "pt-BR",
                }
            })

            //response passa todos os detalhes do filme (json)
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            //caso o filme não exista ele cai no catch
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO")
                navigate("/", {replace: true}) //ele vai redirecionar para a pagina home com o "replace"
                return; //para a execução do código
            })
        }

        loadFilme();
        
    },[navigate, id])//passando dependencias para que nosso sistema funcione da melhor forma

    function salvarFilme(){
        //criando um local storage para salvar os filmes
        const minhaLista = localStorage.getItem("@primeflix");
       

        let filmesSalvos = JSON.parse(minhaLista) || []; //se não tiver filme salvo, inicia como uma array vazia
    
        //verificando se o filme ja esta dentro do storage para não salvar filmes duplicados
        const hasFilme = filmesSalvos.some((filmesSalvo) => (filmesSalvo.id) === filme.id)
    
        //SE JÁ TIVER SIDO SALVO
        if(hasFilme){
            toast.warn("Esse filme já está na sua lista!");
            return;
        
        //SE O FILME NÃO TIVER SIDO SALVO
        }else{
            //colocando o filme dentro da variável filmes salvos
            filmesSalvos.push(filme)
            //colocando no localstorage convertido em json
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))//
            toast.success("Filme salvo com sucesso!")
        }
    }
    

        if(loading){
            return(
                <div>
                    <h1>
                        Carregando detalhes...
                    </h1>
                </div>
            )
        }


    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />   
       
                <h3>Sinopse</h3>
                <span>{filme.overview}</span>

                <strong>Avaliação: {filme.vote_average} / 10</strong>

                <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title}`}>
                        Trailer
                    </a>
                </button>
                </div>
        </div>
    )
}

export default Filme;