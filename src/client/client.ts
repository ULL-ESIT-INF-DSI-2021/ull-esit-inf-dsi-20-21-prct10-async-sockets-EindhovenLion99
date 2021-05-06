
/**
 * # Fichero client
 * 
 * Se encarga de hacer las peticiones al servidor, ya sea añadir una notas, modificar, eliminar...
 * 
 * Ejemplo -> node dist/main.js add --user="Juan" --title="Nota 1" --body="Nota" --color="green" 
 * 
 * Para las diferentes opciones haremos uso de yargs, como en la practica 8. La unica diferencia, al menos en 
 * el cliente, es cuando entra en el handler, al servidor le envia los datos necesarios, para que este opere con las notas.
 * 
 * Para que el cliente se conecte al servidor tenemos que usar el metodo ```connect()``` de la libreria ```net``` con el puerto 60300:
 * 
 * ```ts
 * const client = connect({port: 60300});
 * ```
 * 
 * Una vez entra en el handler del yargs, con la funcion ```client.write()``` le envia los parametros al servidor, para que este de la respuesta que 
 * busca el cliente.
 * 
 * ```ts
 * client.write((JSON.stringify({'type': 'add', 'user': argv.user, 'title': argv.title, 'body': argv.body, 'color': argv.color}) + '\n'), (error) => {
        if (error) console.error(error);
      });
 * ```
 *
 * En algun momento el servidor nos respondera, asi que necesitamos algo que recoja esa ingormacion, en este caso el ```client.on('data')```:
 * 
 * ```ts
 * let wholeData = '';
 * client.on('data', (chunks) => {
 *   wholeData += chunks;
 * })
 * ```
 * 
 * Una vez se recoja la respuesta del servidor la mostramos en el cliente una vez se cierre la coneccion:
 * 
 * ```ts
 * client.on('end', () => {
 *  console.log(wholeData);
 *  const info_from_server = JSON.parse(wholeData);
 *
  * switch (info_from_server.type) {
  *  case 'add':
  *     console.log(chalk.keyword(info_from_server.color)(info_from_server.content));
  *     break;
  *  case 'modify':
  *     console.log(chalk.keyword(info_from_server.color)(info_from_server.content));
 *      break;
 *   case 'remove':
 *      console.log(chalk.keyword(info_from_server.color)(info_from_server.content));
 *      break;
 *   case 'list':
 *      const notas = JSON.parse(info_from_server.content);
 *      notas.forEach((nota: any) => {
 *       console.log("Titulo: " + chalk.keyword(nota.Color)(nota.Title));
 *      });
 *      break;
 *   case 'read':
 *     const nota = JSON.parse(info_from_server.content);
 *     console.log(nota);
 *     console.log("Titulo: " + chalk.keyword(nota.Color)(nota.Title));
 *     console.log("Body: " + chalk.keyword(nota.Color)(nota.Body));
 *     break;
 * }
 * });
 * ```
 * 
 */

export class client_ {};

import * as yargs from 'yargs';
const chalk = require("chalk");
import {connect} from 'net';

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