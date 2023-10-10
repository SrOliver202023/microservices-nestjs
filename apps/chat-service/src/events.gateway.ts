import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }, namespace: 'chat', transports: ['websocket']
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;


  async handleDisconnect (@ConnectedSocket() client: Socket) {
    console.log('client')
  }
  async handleConnection (@ConnectedSocket() client: Socket, ...args: any[]) {
    console.log('client')
  }

  @SubscribeMessage('chat')
  findAll (@MessageBody() data: any): Observable<WsResponse<number>> | any {
    this.server.emit('chat', data)
  }
}