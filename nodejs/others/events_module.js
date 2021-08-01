const EventsEmitter = require('events');
const emitter = new EventsEmitter();

// Register a listener
emitter.on('messagedLoged', (arg) => {
        console.log('Listener called', arg);
})

// Raise a event
emitter.emit('messagedLoged', 'This is my first NodeJs event emitter example');
