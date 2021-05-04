import {TypeColor} from '../server/Note';
import * as net from 'net';
import { UserNotes } from './UserNotes';

const server = net.createServer({allowHalfOpen: true}, (connection) => {
  console.log("Se ha conectado un cliente");
  connection.on('close', () => {
    console.log("Se ha desconectado un cliente");
  })

  let wholeData = "";
  connection.on('data', (chunks) => {
    wholeData += chunks;
  })

  connection.on('end', () => {
    const info = JSON.parse(wholeData);

    switch (info.type) {
      case 'add':
        let User: UserNotes = new UserNotes(info.user);
        let Color: TypeColor = colorGetter(info.color);
        if (User.addNewNote(info.tile, info.body, info.color)) {
          User.updateUser();
          connection.write(JSON.stringify({'type': 'add', 'content': 'Nueva nota añadida!', 'color': 'Green'}));
          connection.end();
        } else {
          connection.write(JSON.stringify({'type': 'add', 'content': 'La nota ya existe!', 'color': 'Red'}));
          connection.end();
        }
        break;
      case 'modify':

        break;
      case 'remove':

        break;
      case 'read':

        break;
       case 'list':

        break;
    }
    
  })
})


function colorGetter(color: string): TypeColor {
  let color_: TypeColor = "Blue"
  switch (color) {
    case "Blue":
      color_ = "Blue";
      break;
    case "Red":
      color_ = "Red";
      break;
    case "Tellow":
      color_ = "Yellow";
      break;
    case "Green":
      color_ = "Green";
      break;
    default:
      console.log("Color no valido, asigando azul como predeterminado");
      break;
  }
  return color_;
}