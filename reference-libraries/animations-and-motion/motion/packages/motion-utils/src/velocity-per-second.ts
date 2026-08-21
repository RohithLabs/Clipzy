/*
  Convert velocity into velocity per second
*/
/*#__NO_SIDE_EFFECTS__*/
export const velocityPerSecond = (velocity: number, frameDuration: number) =>
    frameDuration ? velocity * (1000 / frameDuration) : 0
