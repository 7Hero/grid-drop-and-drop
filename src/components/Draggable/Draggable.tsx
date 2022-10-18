import React, {  useRef, useState } from 'react';
import { swap } from "../../utils/swap";
import DraggableItem from "./Item";
import { DraggableContext } from "../../context/DraggableContext";
import { DraggableProps } from "./types";

const Draggable: React.FC<(DraggableProps | React.HTMLAttributes<any>)> = ({ children, ...props }) => {
  const positions = useRef<DOMRect[]>([]).current;

  const [order, setOrder] = useState<any>(React.Children.map(children, (child, i) => {
    return { id: i, value: child }
  }))

  const moveItem = (index: number, rectData: DOMRect) => {
    function findIndex(index: number, rect: DOMRect, positions: DOMRect[]) {
      const { left, right, top, bottom } = rect;
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
      //@ts-ignore
      setOrder(swap(order, index, currentIndex))
    }
  }

  const context = {
    positions,
    setPosition: (i: number, rect: DOMRect) => {
      positions[i] = rect;
    }
  }

  return (
    <DraggableContext.Provider value={ context }>
      <div { ...props } >
        { order.map((child: any, i: number) => {
          return <DraggableItem key={ child.id } index={ i } moveItem={ moveItem } props={child.value.props}>
            { child.value }
          </DraggableItem>
        }) }
      </div>
    </DraggableContext.Provider>
  );
};

export default Draggable