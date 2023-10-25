import { MarkerType } from "reactflow";


export const edgeOptions = {
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
  },
  type: 'smoothstep',
  style: {
    // stroke: skopeColor,
    strokeWidth: 2
  },
}

