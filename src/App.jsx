import './App.css'
import crawler from './utils/crawler'
import { useEffect, useState } from 'react'
import { filterWordCount, sortData } from './utils/helpers'
import { logUserAction, getUserLogs } from './utils/logger'

function App() {
  const [data, setData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [showLogDialog, setShowLogDialog] = useState(false);

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

  const showLogs = () => {
    const logs = getUserLogs();
    setLogs(logs);
    setShowLogDialog(true);

  }
  const clearUserLogs = () => {
    localStorage.removeItem('userLogs');
    setLogs([]);
  }

  return (
    <>
      <h1>Hacker News Scraper</h1>

      <div className="buttons">
        <button className='filter-button_more' onClick={() => {
          logUserAction('Filter by >5 Words');
          const filtered = filterWordCount(data, 5, 'more');
          setFilteredData(sortData(filtered, 'comments', 'desc'));
        }}>
          Filter by &gt; 5 Words
        </button>
        <button className='filter-button_less' onClick={() => {
          logUserAction('Filter by ≤5 Words');
          const filtered = filterWordCount(data, 6, 'less');
          setFilteredData(sortData(filtered, 'votes', 'desc'));
        }}>
          Filter by &le; 5 Words
        </button>
        <button className='clear-button' onClick={() => {
          logUserAction('Cleared Filter');
          setFilteredData(data);
        }}>Clear Filter</button>
        <button className='show-logs-button' onClick={() => showLogs()}>
          Show Logs
        </button>
      </div>
      <main>
        {filteredData.length ? (
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => logUserAction(`Clicked URL: ${item.url}`)}>
                  {index + 1}.   {item.title}</a>
                <p> {item.votes} points | {item.comments} comments </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='loading'>Loading...</p>
        )}
      </main>
      {showLogDialog && (
        <div className="log-dialog">
          <div className="log-dialog-content">
            <h2>User Action Logs</h2>

            {logs.length ? (
              <div className="log-table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log, index) => (
                      <tr key={index}>
                        <td>
                          {log.action.startsWith('Clicked URL: ') ? (
                            <a href={log.action.replace('Clicked URL: ', '')} target="_blank" rel="noopener noreferrer">
                              {log.action}
                            </a>
                          ) : (
                            log.action
                          )}
                        </td>
                        <td>{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No logs available.</p>
            )}
            <div className="log-dialog-footer">
              <button className='clear-logs-button' onClick={() => clearUserLogs()}>Clear Logs</button>
              <button className='close-button' onClick={() => setShowLogDialog(false)}>Close</button>
            </div>
          </div>
        </div>

      )}<footer>
        <a href="https://gurjant.fyi" target="_blank" rel="noopener noreferrer">Made by Gurjant Singh</a>
      </footer>
    </>
  )
}

export default App