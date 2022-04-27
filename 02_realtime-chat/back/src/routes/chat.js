import { randomUUID } from 'crypto'
import { format } from 'date-fns'

/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 */

/** @type { Message[] } */
const messages = []

/**
 * @param {string} pseudo
 * @param {string} body
 */
function handleNewMessage(pseudo, body) {
  const message = {
    id: randomUUID(),
    pseudo,
    body,
    date: format(new Date(), 'Pp') 
  }
  messages.push(message)
  return message
}

/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function chatRoutes(app) {
  /**
   * @param {{ type: string, payload: object }} data
   */
  function broadcast(data) {
    app.websocketServer.clients.forEach((client) => {
      client.send(JSON.stringify(data))
    })
  }

  // /chat/
  app.get('/', { websocket: true }, (connection, reply) => {
    connection.socket.on('message', (message) => {
      const data = JSON.parse(message.toString('utf-8'))

      
      //caractère trop  Long

      if (data.pseudo.length > 15) {
        connection.socket.send(
          JSON.stringify({ type: 'ERROR', 
          payload: 'Message trop long' }),
        )
        return
      }

      if (data.body.length > 150) {
        connection.socket.send(
          JSON.stringify({ type: 'ERROR', 
          payload: 'Message trop long' }),
        )
        return
      }

      broadcast({
        type: 'NEW_MESSAGE',
        payload: handleNewMessage(data.pseudo, data.body,),
      })
    })
  })
  // history sur la session actuel du serv (reset au reboot serv)
  app.get('/history', (request, reply) => {
    reply.send(messages.slice(-30))
  })
}
