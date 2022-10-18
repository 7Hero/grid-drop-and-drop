import React, { CSSProperties, useState } from 'react';
import { motion } from 'framer-motion'
import { swap } from '../../utils/swap'
import { useDrag } from "@use-gesture/react";
import { useSprings } from "react-spring";

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const box: CSSProperties = {
  padding: '10px',
  backgroundColor: 'gray',
  cursor: 'pointer',
  margin: '10px',
  width: '50px',
}

const fn = ({ order, down, originalIndex, curIndex, x, y }: any) => (index: any) => (
        {
          x: x,
          y: y
        }
)

const FramerMotion = () => {
  const [grid, setGrid] = useState(list);
  const [springs, api] = useSprings(grid.length, fn)
  const bind = useDrag(({ down, event, movement: [mx, my] }) => {

  })
  const handleMouseDown = (e: any) => {

  }
  return (
          <>
            { grid.map((el: number) => (
              <motion.div
                dragConstraints={ { top: 0, left: 0, right: 0, bottom: 0 } }
                dragElastic={ 1 }
                key={ el }
                style={ box }
                drag
                layout
                onDrag={
                  (event, info) => {
                    console.log(event, info)
                  }
                }
              >
                { el }
              </motion.div>
            )) }
            <button onClick={ () => {
              const newOrder = swap(grid, 8, 5);
              setGrid(newOrder)
            } }></button>
          </>
  );
};

export default FramerMotion;