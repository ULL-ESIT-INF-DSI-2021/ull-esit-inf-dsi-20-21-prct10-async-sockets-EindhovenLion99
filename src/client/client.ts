
/**
 * # Fichero main
 * 
 * Se encarga de la ejecucion del programa en si, para esto
 * usaremos la libreria yargs, que se encarga de manejar los argumentos 
 * a la hora de ejecutar el programa.
 * 
 * Ejemplo -> node dist/main.js add --user="Juan" --title="Nota 1" --body="Nota" --color="Green" 
 * 
 * Para el comando add es necesario las opciones user, title, body y color, ya que se a añadir una nueva nota
 * Cuando se llama a este comando, creamos un objeto UserNotes, que comprueba si existe el usuario, sus notas, o si no existe 
 * se crea nuevo. Creamos un objeto typecolor para crear la nota con el color correcto. Si la nota se añade, actualizar la base de datos.
 * 
 * Para el comando add es necesario las opciones user, title, body y color, ya que se a añadir una nueva nota
 * Cuando se llama a este comando, creamos un objeto UserNotes, que comprueba si existe el usuario, sus notas, o si no existe 
 * se crea nuevo. Creamos un objeto typecolor para crear la nota con el color correcto. Si la nota se añade, actualizar la base de datos.
 * 
 * Opcion add con yargs:
 * 
 * ```ts
 * yargs.command({
 * command: 'add',
 * describe: 'Añade una nueva nota',
 * builder: {
 * user: {
 *       describe: 'Usuario',
 *       demandOption: true,
 *       type: 'string',
 *     },
 *     title: {
 *       describe: 'Titulo de la nota',
 *       demandOption: true,
 *       type: 'string',
 *     },
 *     body: {
 *       describe: 'Body de la nota',
 *       demandOption: true,
 *       type: 'string',
 *     },
 *     color: {
 *       describe: 'Color de la nota',
 *       demandOption: true,
 *       type: 'string',
 *     },
 *   },
 *   handler(argv) {
 *     if (typeof argv.title === 'string' && typeof argv.body === 'string' 
 *         && typeof argv.color === 'string' && typeof argv.user === 'string') {
 *       let User: UserNotes = new UserNotes(argv.user);
 *       let Color: TypeColor = colorGetter(argv.color);
 *       if(User.addNewNote(argv.title, argv.body, Color))
 *         User.updateUser();
 *     }
 *   },
 * });
 * ```
 * 
 * Esto ocurre con el resto de comandos, que requieren una serie de opciones, si ese comando se ejcuta, ya sea modificar, o elimianar, se
 * actualiza la base de datos. Por otro los comandos list y read requieren de esas opciones pero no hace falta ninguna comprobacion, solo se llama
 * a la funcion list o read y ejecuta la accion.
 * 
 * @function colorGetter() Se encarga de transformar el color recibido por argumentos de tipo string a tipo TypeColor, necesaria para el obejeto Note
 */

export class client_ {};

import * as yargs from 'yargs';
const chalk = require("chalk");
import {connect} from 'net';
import EventEmitter from 'node:events';

/*
export class Client extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();

    // Datos que recibe el cliente del servidor
    let wholeData = '';
    connection.on('data', (chunks) => {
      wholeData += chunks;
    })

    // Lo que recive el cliente del servidor cuando este acaba la conexion
    connection.on('end', () => {
      const info_from_server = JSON.parse(wholeData);

      switch (info_from_server.type) {
        case 'add':
          console.log(chalk.keyword(info_from_server.color)(info_from_server.content));
          break;
        case 'modify':
          console.log(chalk.keyword(info_from_server.color)(info_from_server.content));
          break;
        case 'remove':
          console.log(chalk.keyword(info_from_server.color)(info_from_server.content));
          break;
        case 'list':
          const notas = JSON.parse(info_from_server.content);
          notas.forEach((nota: any) => {
            console.log("Titulo: " + chalk.keyword(nota.Color)(nota.Title));
          });
          break;
        case 'read':
          const nota = JSON.parse(info_from_server.content);
          console.log(nota);
          console.log("Titulo: " + chalk.keyword(nota.Color)(nota.Title));
          console.log("Body: " + chalk.keyword(nota.Color)(nota.Body));
          break;
      }
    });
  }
}

const cliente = new Client(connect({port: 60300}));
*/


export const client = connect({port: 60300});


yargs.command({
  command: 'add',
  describe: 'Añade una nueva nota',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Body de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.body === 'string' 
        && typeof argv.color === 'string' && typeof argv.user === 'string') {
      client.write((JSON.stringify({'type': 'add', 'user': argv.user, 'title': argv.title, 'body': argv.body, 'color': argv.color}) + '\n'), (error) => {
        if (error) console.error(error);
      });
    }
  },
});


yargs.command({
  command: 'remove',
  describe: 'Elimina una nota',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      client.write((JSON.stringify({'type': 'remove', 'user': argv.user, 'title': argv.title}) + '\n'), (error) => {
        if (error) console.error(error);
      });
    }
  },
});

yargs.command({
  command: 'modify',
  describe: 'Modifica una nota',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string' && typeof argv.body === 'string') {
      client.write((JSON.stringify({'type': 'modify', 'user': argv.user, 'title': argv.title, 'body': argv.body}) + '\n'), (error) => {
        if (error) console.error(error);
      });
    }
  },
});


yargs.command({
  command: 'read',
  describe: 'Lee una nota',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      client.write((JSON.stringify({'type': 'read', 'user': argv.user, 'title': argv.title}) + '\n'), (error) => {
        if (error) console.error(error);
      });
    }
  },
});

yargs.command({
  command: 'list',
  describe: 'Lista las notas',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      client.write((JSON.stringify({'type': 'list', 'user': argv.user}) + '\n'), (error) => {
        if (error) console.error(error);
      });
    }
  },
});

yargs.parse();

// Datos que recibe el cliente del servidor
let wholeData = '';
client.on('data', (chunks) => {
  wholeData += chunks;
})

// Lo que recive el cliente del servidor cuando este acaba la conexion
client.on('end', () => {
  console.log(wholeData);
  const info_from_server = JSON.parse(wholeData);

  switch (info_from_server.type) {
    case 'add':
      console.log(chalk.keyword(info_from_server.color)(info_from_server.content));
      break;
    case 'modify':
      console.log(chalk.keyword(info_from_server.color)(info_from_server.content));
      break;
    case 'remove':
      console.log(chalk.keyword(info_from_server.color)(info_from_server.content));
      break;
    case 'list':
      const notas = JSON.parse(info_from_server.content);
      notas.forEach((nota: any) => {
        console.log("Titulo: " + chalk.keyword(nota.Color)(nota.Title));
      });
      break;
    case 'read':
      const nota = JSON.parse(info_from_server.content);
      console.log(nota);
      console.log("Titulo: " + chalk.keyword(nota.Color)(nota.Title));
      console.log("Body: " + chalk.keyword(nota.Color)(nota.Body));
      break;
  }
});