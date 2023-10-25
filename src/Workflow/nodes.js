

export default [
    {
        id: '0',
        type: 'init',
        data: { name: 'Init' },
        position: { x: 250, y: 25 },
    },

    {
        id: '1',
        position: { x: 10, y: 200 },
        type: 'condition',
        data: { name: 'Condition 1' },
        // dragHandle: '.custom-drag-handle',
    },
    {
        id: '2',
        data: { name: 'Action 1' },
        position: { x: 250, y: 400 },
        type: 'action'
    },
    {
        id: '3',
        type: 'end',
        data: { name: 'End' },
        position: { x: 250, y: 600 },
    },
    
];