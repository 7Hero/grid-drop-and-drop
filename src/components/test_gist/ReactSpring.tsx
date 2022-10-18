import React from 'react';
import { useSpring, animated } from "react-spring";
import { useDrag } from '@use-gesture/react'


const ReactSpring = () => {
  const [spring, api] = useSpring(() => ({ x: 20, y: 20 }))
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
  })

  return (
          // @ts-ignore
          <animated.div { ...bind() } style={ { ...spring, padding: '10px', backgroundColor: 'gray' } }>
            Hello World!
          </animated.div>
  );
};

export default ReactSpring;