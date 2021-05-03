
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

export class main {};

import * as yargs from 'yargs';
import {TypeColor} from './Note';
import {UserNotes} from './UserNotes';

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
      let User: UserNotes = new UserNotes(argv.user);
      let Color: TypeColor = colorGetter(argv.color);
      if(User.addNewNote(argv.title, argv.body, Color))
        User.updateUser();
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
      let User: UserNotes = new UserNotes(argv.user);
      if(User.removeNote(argv.title))
        User.updateUser();
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
      let User: UserNotes = new UserNotes(argv.user);
      if(User.modifyNote(argv.body, argv.title))
        User.updateUser();
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
      let User: UserNotes = new UserNotes(argv.user);
      User.readNote(argv.title);
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
      let User: UserNotes = new UserNotes(argv.user);
      User.listTitles();
    }
  },
});

yargs.parse();


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
