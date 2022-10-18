import React from "react";

export interface DraggableProps {
  children?: React.ReactNode
}

export interface Order {
  id: number
  value: React.ReactNode | undefined
}

export interface DraggableItemProps {
  children?: React.ReactNode
  index: number
  moveItem: (index: number, rect: DOMRect) => void
  [key:string]: any
}