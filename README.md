##### Sidenote
Did not create tests for socket since I was not able to figure out how to properly 
test functionality on each handler and event. Did not test /db folder as I did 
not see the need for it in scope of this project.

# Server
1. Sends received messages to all connected clients (no rooms).
2. If a client is silent for more than a certain (configurable) amount of time, it is
disconnected; a message about the event (e.g. "John was disconnected due to
inactivity") is sent to all connected clients.
3. If a client is disconnected, but not due to inactivity, a different message is sent (e.g.
"John left the chat, connection lost" instead.)
    - Inactivity time can be modified in server/socket/utils/users.js - this.inactivityTime variable
4. Doesn't allow multiple active users with the same nickname.
5. Validates data received over the network.
6. Terminates gracefully upon receiving SIGINT or SIGTERM signals.
7. Provide readable logging solution
    - By default will create .txt file. Remove this.writeStream in socket.js to write all entries
    in MongoDB.
