import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colors = {
  2: "#e3f2fd",
  4: "#bbdefb",
  8: "#90caf9",
  16: "#64b5f6",
  32: "#42a5f5",
  64: "#2196f3",
  128: "#1e88e5",
  256: "#1976d2",
  512: "#1565c0",
  1024: "#0d47a1",
};

function App() {
  const [array, setArray] = useState([]);

  const [from, setFrom] = useState();

  useEffect(() => {
    const newArray = [];
    for (let i = 0; i < 6; i++) {
      newArray[i] = [];
      for (let j = 0; j < 5; j++) {
        newArray[i][j] = Math.pow(2, randomInteger(1, 5));
      }
    }

    setArray(newArray);
  }, []);

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    setFrom(ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();

    const to = ev.target.id;

    const [toRowIndex, toColumnIndex] = to.split("-");

    const [fromRowIndex, fromColumnIndex] = from.split("-");

    if (
      toRowIndex + toColumnIndex !== fromRowIndex + fromColumnIndex &&
      Math.abs(toRowIndex - fromRowIndex) <= 1 &&
      Math.abs(toColumnIndex - fromColumnIndex) <= 1 &&
      array[fromRowIndex][fromColumnIndex] === array[toRowIndex][toColumnIndex]
    ) {
      array[toRowIndex][toColumnIndex] = array[toRowIndex][toColumnIndex] * 2;
      array[fromRowIndex][fromColumnIndex] = null;

      for (let index = array.length - 1; index > 0; index--) {
        if (!array[index][fromColumnIndex]) {
          array[index][fromColumnIndex] = array[index - 1][fromColumnIndex];
          array[index - 1][fromColumnIndex] = null;
        }
      }

      array[0][fromColumnIndex] = Math.pow(2, randomInteger(1, 5));

      setArray([...array]);
    }
  }

  return (
    <div className="box">
      {array.map((row, rowIndex) => {
        return (
          <div className="row" key={rowIndex}>
            {row.map((column, columnIndex) => {
              return (
                <div
                  id={`${rowIndex}-${columnIndex}`}
                  className="column"
                  draggable={true}
                  onDragStart={drag}
                  onDrop={drop}
                  onDragOver={allowDrop}
                  style={{ backgroundColor: colors[column] }}
                >
                  {column}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
