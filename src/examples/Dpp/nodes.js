export default [
    {
        id: 'init',
        type: 'input',
        data: { label: 'Init' },
        position: { x: 250, y: 25 },
        style: { color: 'green', borderColor: 'green', borderRadius: 50, width: 60, height: 60}
    },

    {
        id: 'condition-1',
        data: { label: 'Condition 1' },
        position: { x: 100, y: 125 },
        style: { color: 'blue', borderColor: 'blue' }
    },
    {
        id: 'action-1',
        data: { label: 'Action 1' },
        position: { x: 100, y: 225 },
        style: { color: 'orange', borderColor: 'orange' }
    },
    {
        id: 'end',
        type: 'output',
        data: { label: 'End' },
        position: { x: 250, y: 350 },
        style: { color: 'red', borderColor: 'red' }
    },
];