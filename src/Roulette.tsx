import { FC, useEffect, useRef, useState } from "react";
import "./App.css";




interface Items { 
  color: string
  rating: number 
}
const Roulette: FC<{time: number, items: Items[]}> = ({time, items}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinningRef = useRef(null);

  const spinRoulette = (duration) => {
    setIsSpinning(true);
    
    const startTime = Date.now();
    const endTime = startTime + duration;
    const spinningInterval = setInterval(() => {
      let newIndex = Math.floor(Math.random() * items.length);
      
      
      const highestRatedIndex = items.reduce((maxIdx, item, idx) => {
        return item.rating > items[maxIdx].rating ? idx : maxIdx;
      }, 0);

      
      if (Math.random() < 0.1) {
        newIndex = highestRatedIndex;
      }

      setActiveIndex(newIndex);
    }, 100);
  
    spinningRef.current = { interval: spinningInterval, endTime };
  };

  useEffect(() => {
    const checkDuration = () => {
      if (!isSpinning || !spinningRef.current) return;
      if (Date.now() >= spinningRef.current.endTime) {
        clearInterval(spinningRef.current.interval);
        setIsSpinning(false);
      }
    };

    const intervalId = setInterval(checkDuration, 100);

    return () => clearInterval(intervalId);
  }, [isSpinning]);

  return (
    <>
      <div className="shadow"></div>
      <div className="random">
        <div className="result">
        </div>
        <div className="cards">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`card ${isSpinning ? "spin" : ""}`} 
              style={{
                transform: `translateX(${(index - activeIndex) * 50}%)`,
                background: item.color,
              }}>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => spinRoulette(time)}
        disabled={isSpinning}
        className="button"
      >
        Крутить
      </button>
    </>
  );
};

export default Roulette;