import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { swap } from "../../utils/swap";

const Item = ({ color, setPosition, moveItem, i }: any) => {
  const [isDragging, setDragging] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    setPosition(i, ref.current!.getBoundingClientRect());
  });

  return (
    <motion.li
      ref={ref}
      initial={false}
      animate={isDragging ? onTop : flat}
      style={{ background: color, height: heights[color] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      drag
      layout
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      // Allow full movememnt outside constraints
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={() => moveItem(i, ref.current!.getBoundingClientRect())}
    />
  );
};

export const Example = () => {
  const [colors, setColors] = useState(initialColors);

  const positions = useRef<any>([]).current;
  const setPosition = (i: number, rectData: DOMRect) => (positions[i] = rectData);

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
      setColors(swap(colors, index, currentIndex))
    }
  }


  return (
    <ul>
      {colors.map((color, i) => (
        <Item
          key={color}
          i={i}
          color={color}
          setPosition={setPosition}
          moveItem={moveItem}
        />
      ))}
    </ul>
  );
};

// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
};

const initialColors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"];
const heights: any = {
  "#FF008C": 60,
  "#D309E1": 80,
  "#9C1AFF": 40,
  "#7700FF": 100
};
export default Example
