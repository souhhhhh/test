import { FC, useEffect, useRef, useState } from "react";
import "./Roulette.scss";




interface SpinningReference {
  interval: NodeJS.Timeout | null;
  endTime: number | null;
}

interface Items { 
  color: string
  rating: number 
}
const Roulette: FC<{time: number, items: Items[]}> = ({time, items}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinningRef = useRef<SpinningReference>({ interval: null, endTime: null })

  const spinRoulette = (duration: number) => {
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
      if (Date.now() >= spinningRef.current.endTime!) {
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






































// const Roulette: FC<{ time: number; items: Items[] }> = ({ time, items }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const spinningRef = useRef<SpinningReference>({
//     startTime: null,
//     duration: null,
//     animationFrameId: null
//   });

//   const easeOutSine = (t: number) => {
//     return Math.sin((t * Math.PI) / 2); 
//   };

//   const spinRoulette = (duration: number) => {
//     setIsSpinning(true);
//     const startTime = Date.now();
//     const spinningDuration = duration;

//     // Генерация случайного количества оборотов в диапазоне от 15 до 30
//     const totalRotations = Math.floor(duration);

//     // Генерация случайного смещения в пределах одного блока (например, 10%)
//     const randomOffset = Math.random() * 1; // смещение в диапазоне 10% - 90% от блока

//     const spin = () => {
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - startTime;

//       const progress = Math.min(elapsedTime / spinningDuration, 1); // Прогресс от 0 до 1

//       const easing = easeOutSine(progress); // Плавное замедление      

//       // Рассчитываем угол вращения в зависимости от количества оборотов

//       const angle = totalRotations * easing * items.length + randomOffset; // Вращение с учётом случайного смещения
      
//       let newIndex

//       if(angle > 0) { 
//         newIndex = Math.floor(angle) % items.length;
//       } else { 
//         setIsSpinning(false);
//       }

//       let newIndexItem = Math.floor(Math.random() * items.length );

//       const highestRatedIndex = items.reduce((maxIdx, item, idx) => {
//         return item.rating > items[maxIdx].rating ? idx : maxIdx;
//       }, 0);
      
      
//       if (Math.random() < 0.1) {
//         newIndexItem = highestRatedIndex;
//       }
      


//       setActiveIndex(newIndexItem);
      
//       console.log(activeIndex)
//       if (progress < 1) {
//         spinningRef.current.animationFrameId = requestAnimationFrame(spin); 
//       } else {
//         setIsSpinning(false);
//       }
//     };

//     spinningRef.current = { startTime, duration: spinningDuration, animationFrameId: requestAnimationFrame(spin) };
//   };

//   useEffect(() => {
//     return () => {
//       if (spinningRef.current.animationFrameId) {
//         cancelAnimationFrame(spinningRef.current.animationFrameId);
//       }
//     };
//   }, []);
  
//   return (
//     <>
//       <div className="shadow"></div>
//       <div className="random">
//         <div className="result"></div>
//         <div className="cards">
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className={`card ${isSpinning ? "spin" : ""}`}
//               style={{
//                 transform: isSpinning ? `translateX(${(index - activeIndex) * 25}px)` : `translateX(${(index - activeIndex) * 25}px)` ,
//                 background: item.color,
//               }}
//             ></div>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={() => spinRoulette(time)}
//         disabled={isSpinning}
//         className="button"
//       >
//         Крутить
//       </button>
//     </>
//   );
// };

// export default Roulette;