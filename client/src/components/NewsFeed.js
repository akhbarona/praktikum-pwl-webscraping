import React, {useState, useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeUrl, fetchNews} from '../redux/Actions'
import '../css/App.css';
const NewsFeed = () => {
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false) 
    const [q, setQ] = useState('')
    const dispatch = useDispatch();
    const url = useSelector(data=>data.url)
    const article = useSelector(data=>data.articles)
    const fetchData = useCallback(params => {dispatch(fetchNews(params))},[dispatch])
    
    useEffect(()=>{
        const fetchNews = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/${url}`)
                const result = await response.json()
                fetchData(result)
            }catch(error){
                setError(true)
            }
            setLoading(false)
        }
        fetchNews();
    },[url,fetchData]);
    
    function search(rows){
        return rows.filter(row => row.title.toLowerCase().indexOf(q) > -1 )
    }
    return (
        <div className="mainMenu">
            {
                isLoading ? (<p> mohon tunggu... </p>) : ((isError) ? (<p>Mohon maaf ada gangguan, silahkan refresh halaman...</p>) : 
                (<>
               <label htmlFor='url'>NewsFeed From : </label>
                <select onChange={(e) => dispatch(changeUrl(e.target.value))} defaultValue={url}>
                <option value='goal.com/id'>Goalcom</option>
                <option value='panditfootball.com'>PanditFootball</option>
                <option value='sport.detik.com'>SportDetikcom</option>
                <option value='bola.com'>Bolacom</option>
                </select>
                        <input className="search"  type='text' placeholder='Ketik judul berita...' onChange={(e) => setQ(e.target.value)} value={q} />
              
                <pre>{JSON.stringify(search(article), null,4)}</pre></>
                ))
            }
            
        </div>
    )
}
export default NewsFeed;