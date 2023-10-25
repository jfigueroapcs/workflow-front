export default [
    {
        id: 'uuid-1',
        source: 'init',
        target: 'condition-1',
        animated: true,
    },
    {
        id: 'uuid-2',
        source: 'condition-1',
        target: 'action-1',
        animated: true,
    },
    {
        id: 'uuid-2',
        source: 'action-1',
        target: 'end',
        animated: true,
    },
]