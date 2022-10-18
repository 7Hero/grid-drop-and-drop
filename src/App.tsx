import React from 'react';
import Draggable from "./components/Draggable";
import './App.css'

const colors = [
  '#293462',
  '#F24C4C',
  '#EC9B3B',
  '#F7D716',
  '#764AF1',
  '#9772FB',
  '#F32424',
]

const items = new Array(20).fill(0);

const App = () => {
  return (
    <div className="App">
      <Draggable style={ { padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' } }>
        { items.map(el => {
          return <div key={ el } style={ {
            backgroundColor: `${ colors[(Math.random() * 7) | 0] }`,
            color: 'white',
            height: '80px',
            borderRadius: '6px',
            flex: '1 1 80px',
          } }></div>
        }) }
      </Draggable>
    </div>
  );
}

export default App;
