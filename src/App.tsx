import './App.css'
import Roulette from './Roulette'

function App() {
  const items = [
    { color: "red", rating: 10 },
    { color: "yellow", rating: 2 },
    { color: "green", rating: 3 },
    { color: "purple", rating: 1 },
  ];
  return (
    <div className='App'>
       <Roulette time={3000} items={items}  />
    </div>
  )
}

export default App
