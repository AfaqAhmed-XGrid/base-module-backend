import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const AnimatedNumber = ({ n, color }: { n: number, color: string }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <animated.div className='dashboard-card-main-title' style={{ color: `${color}` }}>{ number.to((n: number) => n.toFixed(0)) }</animated.div>
  );
};

export default AnimatedNumber;
