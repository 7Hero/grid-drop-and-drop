import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { motion} from 'framer-motion'
import { swap } from "../../utils/swap";

const DraggableContext = React.createContext<any>([]);

const DraggableProvider = ({ children, ...props }: any) => {
  let positions: any = useRef([]).current;

  const [order, setOrder] = useState<any>(React.Children.map(children, (child, i) => {
    return { id: i, value: child }
  }))

  const moveItem = (index: number, rectData: any) => {
    function findIndex(index: number, rectData: any, positions: any) {
      const { left, right, top, bottom } = rectData;
      const [centerX, centerY] = [(left + right) / 2, (top + bottom) / 2]

      for(let idx = 0; idx < positions.length; idx++) {
        const { left, right, top, bottom } = positions[idx];
        if(centerX > left && centerX < right && centerY > top && centerY < bottom) {
          return idx;
        }
      }
      return index;
    }

    let currentIndex = findIndex(index, rectData, positions)
    if(currentIndex !== index) {
      setOrder(swap(order, index, currentIndex))
    }
  }

  const context = {
    positions,
    setPosition: (i: number, rectData: DOMRect) => {
      positions[i] = rectData;
    }
  }
  return (
    <DraggableContext.Provider value={ context }>
      <div { ...props } >
        { order.map((child: any, i: number) => {
          return <DraggableItem key={ child.id } index={ i } moveItem={ moveItem }>
            { child.value }
          </DraggableItem>
        }) }
      </div>
    </DraggableContext.Provider>
  );
};

const DraggableItem = ({ children, index, moveItem }: any) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const { setPosition, positions } = useContext(DraggableContext)

  useLayoutEffect(() => {
    setPosition(index, itemRef.current!.getBoundingClientRect())
  }, [positions])

  return (
    <motion.div
      layout
      drag
      ref={ itemRef }
      dragSnapToOrigin
      onDrag={ () => {
        moveItem(index, itemRef.current!.getBoundingClientRect());
      }}
      onDragStart={ () => {
        itemRef.current!.style.zIndex = "10";
      }}
      onDragEnd={ () => {
        itemRef.current!.style.zIndex = "1";
      }}
    >
      { children }
    </motion.div>
  )
}

export { DraggableProvider, DraggableItem }
