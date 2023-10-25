import { MarkerType, Position } from 'reactflow';
export default [
    {
        id: '0',
        source: '0',
        target: '1',
        animated: true,
        type: 'smoothstep',
        // type: 'straight',
        // markerEnd: {
        //     type: MarkerType.ArrowClosed,
        // },
    },
    {
        id: '1',
        source: '1',
        target: '2',
        animated: true,
    },
    {
        id: '2',
        source: '2',
        target: '3',
        animated: true,
    },
]