import {TypeColor} from '../server/Note';
import * as net from 'net';
import { UserNotes } from './UserNotes';
const chalk = require("chalk");

/**
 * Fichero server
 * 
 * Se encarga de recibir las peticiones del cliente, añadir, modificar, remover o mostrar las notas.
 * Para poder establecer una conexion, usamos la funcion ```createServer() ```, cuando se establece dicha conexion se imprime por pantalla que se ha conectado el cliente
 * asi como se imprime si se ha desconectado, gracias a la funcion ```connection.on('close');```
 * 
 * ```ts
 * const id: number = Math.floor(Math.random() * 1000);
 * console.log(chalk.green("Se ha conectado un cliente con id: " + id));
 * connection.on('close', () => {
 *   console.log(chalk.red("Se ha desconectado el cliente " + id));
 * })
 * ```
 * 
 * Una vez se conecta el cliente, guardamos la peticion que nos hace en la variable ```wholeData```:
 * 
 * ```ts
 * let wholeData = "";
 * connection.on('data', (chunks) => {
 *   wholeData += chunks;
 *   if (wholeData.indexOf('\n') !== -1) {
 *     connection.emit('event', wholeData)
 *   }
 *   console.log(wholeData);
 * })
 * ```
 * 
 * Lo que recibe se lo emitimos al ```event```, este manejara los datos.
 * 
 * ```ts
 * connection.on('event', (Data) => {
 *   const info = JSON.parse(Data);
 *   let User: UserNotes = new UserNotes(info.user);
 *   switch (info.type) {
 *     case 'add':
 *       let Color: TypeColor = colorGetter(info.color);
 *       if (User.addNewNote(info.title, info.body, Color)) {
 *         User.updateUser();
 *         connection.write((JSON.stringify({'type': 'add', 'content': 'Nueva nota añadida!', 'color': 'green'})), (error) => {
 *           if (error) {
 *             console.error(error);
 *           } else {
 *             connection.end();
 *           }
 *         });
 *       } else {
 *         connection.write((JSON.stringify({'type': 'add', 'content': 'La nota ya existe!', 'color': 'red'})), (error) => {
 *           if (error) {
 *             console.error(error);
 *           } else {
 *             connection.end();
 *           }
 *         });
 *       }
 *       break;
 * ```
 * 
 * Si al servidor le llega una peticion de tipo add primero comprueba que se añade la nota y no se producen errores, en caso contrario, avisa al cliente de que la nota ya existe. Luego acaba la conexion.
 * 
 *  @function colorGetter() Se encarga de transformar el color recibido por argumentos de tipo string a tipo TypeColor, necesaria para el obejeto Note
 */

export class server_ {}

export const server = net.createServer(connection => {
  // Conexion y desconexion del cliente
  const id: number = Math.floor(Math.random() * 1000);
  console.log(chalk.green("Se ha conectado un cliente con id: " + id));
  connection.on('close', () => {
    console.log(chalk.red("Se ha desconectado el cliente " + id));
  })

  // Datos recividos del cliente, add, remove, etc
  let wholeData = "";
  connection.on('data', (chunks) => {
    wholeData += chunks;
    if (wholeData.indexOf('\n') !== -1) {
      connection.emit('event', wholeData)
    }
    console.log(wholeData);
  })

  // Manejo de los datos que recive el servidor una vez el cliente acaba de mandarlos
  connection.on('event', (Data) => {
    const info = JSON.parse(Data);
    let User: UserNotes = new UserNotes(info.user);
    switch (info.type) {
      case 'add':
        let Color: TypeColor = colorGetter(info.color);
        if (User.addNewNote(info.title, info.body, Color)) {
          User.updateUser();
          connection.write((JSON.stringify({'type': 'add', 'content': 'Nueva nota añadida!', 'color': 'green'})), (error) => {
            if (error) {
              console.error(error);
            } else {
              connection.end();
            }
          });
        } else {
          connection.write((JSON.stringify({'type': 'add', 'content': 'La nota ya existe!', 'color': 'red'})), (error) => {
            if (error) {
              console.error(error);
            } else {
              connection.end();
            }
          });
        }
        break;
      case 'modify':
        if (User.modifyNote(info.body, info.title)) {
          User.updateUser();
          connection.write((JSON.stringify({'type': 'modify', 'content': 'Nota modificada!', 'color': 'green'})), (error) => {
            if (error) {
              console.error(error);
            } else {
              connection.end();
            }
          });
        } else {
          connection.write((JSON.stringify({'type': 'add', 'content': 'La nota no existe!', 'color': 'red'})), (error) => {
            if (error) {
              console.error(error);
            } else {
              connection.end();
            }
          });
        }
        break;
      case 'remove':
        if (User.removeNote(info.title)) {
          User.updateUser();
          connection.write(JSON.stringify(({'type': 'remove', 'content': 'Nota eliminada!', 'color': 'green'})), (error) => {
            if (error) {
              console.error(error);
            } else {
              connection.end();
            }
          });
        } else {
          connection.write(JSON.stringify(({'type': 'remove', 'content': 'La nota no existe!', 'color': 'red'})), (error) => {
            if (error) {
              console.error(error);
            } else {
              connection.end();
            }
          });
          connection.end();
        }
        break;
      case 'read':
        if (User.getNote(info.title)[0]) {
          const nota = JSON.stringify(User.getNote(info.title)[1]);
          console.log(nota);
          connection.write(JSON.stringify(({'type': 'read', 'content': nota})), (error) => {
            if (error) {
              console.error(error);
            } else {
              connection.end();
            }
          });
        } else {
          connection.write(JSON.stringify(({'type': 'read', 'content': 'No existe la nota', 'color': 'red'})), (error) => {
            if (error) {
              console.error(error);
            } else {
              connection.end();
            }
          });
        }
        break;
      case 'list':
        const notas = JSON.stringify(User.getNotes());
        console.log(notas);
        connection.write(JSON.stringify(({'type': 'list', 'content': notas})), (error) => {
          if (error) {
            console.error(error);
          } else {
            connection.end();
          }
        });
        break;
    }
  })
}).listen(60300, () => {
  console.log('Esperando clientes...');
})


export function colorGetter(color: string): TypeColor {
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