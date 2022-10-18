import { createContext } from "react";

export interface DraggableContextProps {
  positions: DOMRect[]
  setPosition: (index: number, rect: DOMRect) => void
}
export const DraggableContext = createContext<DraggableContextProps>({} as DraggableContextProps);

