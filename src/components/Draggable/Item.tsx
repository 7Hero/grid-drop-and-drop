import React, { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DraggableContext } from "../../context/DraggableContext";
import { DraggableItemProps } from "./types";

const DraggableItem: React.FC<DraggableItemProps> = ({ children, index, moveItem, props }) => {
  const itemRef = useRef<HTMLDivElement>(null)

  const { setPosition } = useContext(DraggableContext)

  useEffect(() => {
    setPosition(index, itemRef.current!.getBoundingClientRect())
  }, [])

  return (
    <motion.div
      { ...props }
      onDragStart={ () => {
        itemRef.current!.style.zIndex = '1'
      } }
      onDragEnd={ () => {
        setTimeout( () => {
          itemRef.current!.style.zIndex = '0'
        },400)
      } }
      drag
      ref={ itemRef }
      dragSnapToOrigin
      layout
      onDrag={ () => {
        moveItem(index, itemRef.current!.getBoundingClientRect());
      } }
    >
      { children }

    </motion.div>
  )
}

export default DraggableItem