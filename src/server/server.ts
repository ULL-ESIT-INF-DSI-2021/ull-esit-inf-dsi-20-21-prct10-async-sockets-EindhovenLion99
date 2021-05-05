import {TypeColor} from '../server/Note';
import * as net from 'net';
import { UserNotes } from './UserNotes';
const chalk = require("chalk");

const server = net.createServer({allowHalfOpen: true}, (connection) => {
  console.log(chalk.green("Se ha conectado un cliente"));
  connection.on('close', () => {
    console.log(chalk.red("Se ha desconectado un cliente"));
  })

  let wholeData = "";
  connection.on('data', (chunks) => {
    wholeData += chunks;
  })

  connection.on('end', () => {
    const info = JSON.parse(wholeData);
    let User: UserNotes = new UserNotes(info.user);
    switch (info.type) {
      case 'add':
        let Color: TypeColor = colorGetter(info.color);
        if (User.addNewNote(info.title, info.body, Color)) {
          User.updateUser();
          connection.write(JSON.stringify({'type': 'add', 'content': 'Nueva nota añadida!', 'color': 'green'}));
          connection.end();
        } else {
          connection.write(JSON.stringify({'type': 'add', 'content': 'La nota ya existe!', 'color': 'red'}));
          connection.end();
        }
        break;
      case 'modify':
        if (User.modifyNote(info.body, info.title)) {
          User.updateUser();
          connection.write(JSON.stringify({'type': 'modify', 'content': 'Nota modificada!', 'color': 'green'}));
          connection.end();
        } else {
          connection.write(JSON.stringify({'type': 'add', 'content': 'La nota no existe!', 'color': 'red'}));
          connection.end();
        }
        break;
      case 'remove':
        if (User.removeNote(info.title)) {
          User.updateUser();
          connection.write(JSON.stringify({'type': 'remove', 'content': 'Nota eliminada!', 'color': 'green'}));
          connection.end();
        } else {
          connection.write(JSON.stringify({'type': 'remove', 'content': 'La nota no existe!', 'color': 'red'}));
          connection.end();
        }
        break;
      case 'read':
        if (User.getNote(info.title)[0]) {
          const nota = JSON.stringify(User.getNote(info.title)[1]);
          console.log(nota);
          connection.write(JSON.stringify({'type': 'read', 'content': nota}));
          connection.end();
        } else {
          connection.write(JSON.stringify({'type': 'read', 'content': 'No existe la nota', 'color': 'red'}));
        }
        break;
      case 'list':
        const notas = JSON.stringify(User.getNotes());
        connection.write(JSON.stringify({'type': 'list', 'content': notas}));
        connection.end();
        break;
    }
  })
}).listen(60300, () => {
  console.log('Esperando clientes...');
})


function colorGetter(color: string): TypeColor {
  let color_: TypeColor = "blue"
  switch (color) {
    case "blue":
      color_ = "blue";
      break;
    case "red":
      color_ = "red";
      break;
    case "yellow":
      color_ = "yellow";
      break;
    case "Green":
      color_ = "green";
      break;
    default:
      console.log("Color no valido, asigando azul como predeterminado");
      break;
  }
  return color_;
}