import '../src/Roulette/Roulette.scss'
import Roulette from './Roulette/Roulette'

function App() {
  const items = [
    { color: "red", rating: 10 },
    { color: "yellow", rating: 2 },
    { color: "green", rating: 3 },
    { color: "purple", rating: 1 },
    
    { color: "grey", rating: 3 },
    { color: "blue", rating: 1 },
    { color: "orange", rating: 3 },
    { color: "blue", rating: 1 },
    { color: "orange", rating: 3 },
    { color: "blue", rating: 1 },
    { color: "orange", rating: 3 },
    { color: "blue", rating: 1 },
    { color: "grey", rating: 3 },
    { color: "blue", rating: 1 },
    { color: "grey", rating: 3 },
    { color: "blue", rating: 1 },
    { color: "grey", rating: 3 },
    { color: "blue", rating: 1 },
    { color: "grey", rating: 3 },
    { color: "blue", rating: 1 },
    
  ];
  return (
    <div >
       <Roulette time={1000} items={items}  />
    </div>
  )
}

export default App
