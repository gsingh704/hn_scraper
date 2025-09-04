import './App.css'
import crawler from './utils/crawler'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await crawler();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Hacker News Scraper</h1>
      <ul>
        {data.map(item => (
          <li key={item.url}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
            <p>{item.votes} | {item.comments}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
