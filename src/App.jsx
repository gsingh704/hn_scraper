import './App.css'
import crawler from './utils/crawler'
import { useEffect, useState } from 'react'
import { filterWordCount, sortData } from './utils/helpers'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await crawler();
      setData(result);
    };
    fetchData();
  }, []);

  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <>
      <h1>Hacker News Scraper</h1>
      <div>
        <button onClick={() => {
          const filtered = filterWordCount(data, 5, 'more');
          setFilteredData(sortData(filtered, 'comments', 'desc'));
        }}>
          Filter by &gt;5 Words
        </button>
        <button onClick={() => {
          const filtered = filterWordCount(data, 6, 'less');
          setFilteredData(sortData(filtered, 'votes', 'desc'));
        }}>
          Filter by &le;5 Words
        </button>
        <button onClick={() => setFilteredData(data)}>Clear Filter</button>
      </div>
      {filteredData.length ? (
        <ul>
          {filteredData.map((item, index) => (
            <li key={index}>
              <span>{index + 1}. </span>
              <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
              <p>{item.votes} | {item.comments}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default App