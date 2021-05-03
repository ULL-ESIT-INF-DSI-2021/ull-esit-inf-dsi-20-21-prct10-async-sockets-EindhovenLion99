import {Note, TypeColor} from './Note'
import {DBHandler} from './dbHandler'
const chalk = require('chalk');


/**
 * # Clase UserNotes
 * Esta clase se encarga de la creacion, eliminacion y modificacion de las notas de cada usuario.
 * 
 * El constructor se compone por un ```Username```, que sera el nombre de usuario, un conjunto de notas vacias, ya asignado y un objeto de tipo DBHandler.
 * El DBHandler se encarga la obtencion de los datos del .json y la actualizacion de estos.
 * 
 * @param UserName UserName -> Nombre del usuario
 * @param Notes    Notes -> Conjuto de notas
 * @param DB       DB -> Manejador de la base de datos
 * 
 * ## Funcion addNewNote(Title: string, Body: string, Color: TypeColor)
 * 
 * Se encarga de añadir una nueva nota al conjunto de notas, primero, tenemos una 
 * variable booleana que se encarga de comprobar que se añade una nueva nota, luego, 
 * una variable ```check```, de tipo [boolean, number], la cual se le asigna lo que retorna 
 * la llamada a la funcion ```existNote()```, la cual retorna si la nota que recibe por parametro existe.
 * 
 * Si el valor del booleano de ```check``` es false, se procede a añadir la nota, se cambia el valor de complete 
 * a true, se imprime por pantalla que la nota se ha creado, en caso contrario se imprime un mensaje alertando 
 * de que no se ha creado la nota debido a que existe.
 * 
 * @param complete  complete -> Comprueba que se realiza la accion
 * @param check     check -> Comprueba que exista o no la nota a añadir
 * 
 * Las funciones siguen esta estructura:
 * 
 * ```ts  
 * addNewNote(Title: string, Body: string, Color: TypeColor): boolean {
 *   let complete: boolean = false;
 *   let check: [boolean, Note] = this.existNote(Title);
 *   if(!check[0]) {      // Logica de la funcion, sera diferente en cada una.
 *     this.Notes.push(new Note(Title, Body, Color));
 *     complete = true;
 *     console.log(chalk.green.bold("Nueva nota creada!"));
 *   } else {
 *     console.log(chalk.red.bold("Ya existe una nota con el mismo titulo"));
 *   }
 *   return complete;
 * }
 * ```
 * 
 * ## Funcion modifyNote(Body: string, Title: string)
 * 
 * Se encarga de modificar una nota del conjunto de notas, al igual que la funcion anterior, tenemos una 
 * variable booleana que se encarga de comprobar que se modifica la nota, al igual que check.
 * 
 * Si el valor del booleano de ```check``` es true, se procede a modificar la nota, se cambia el valor de complete 
 * a true, se imprime por pantalla que la nota se ha modificado, en caso contrario se imprime un mensaje alertando 
 * de que no se ha modificado la nota debido a que no existe.
 * 
 * @param complete  complete -> Comprueba que se realiza la accion
 * @param check     check -> Comprueba que exista o no la nota a modificar
 * 
 * 
 * ## Funcion removeNote(Title: string)
 * 
 * Se encarga de elimianr una nota del conjunto de notas, al igual que la funcion anterior, tenemos una 
 * variable booleana que se encarga de comprobar que se elimina la nota, al igual que check.
 * 
 * Si el valor del booleano de ```check``` es true, se procede a eliminar la nota, se cambia el valor de complete 
 * a true, se imprime por pantalla que la nota se ha eliminado, en caso contrario se imprime un mensaje alertando 
 * de que no se ha eliminado la nota debido a que no existe.
 * 
 * @param complete  complete -> Comprueba que se realiza la accion
 * @param check     check -> Comprueba que exista o no la nota a eliminar
 * 
 * 
 * ## Funcion existNote(Title: string)
 * 
 * Se encarga de comprobar si la nota que se le pasa por parametro esta dentro del conjunto de notas.
 * 
 * Tenemos una variable booleana found, si se encuentra el titulo en el conjunto esta variable se pasa a true, 
 * luego un objeto de tipo Note que se asigna el objeto econtrado, luego se retorna el objeto [boolean, Note]
 * 
 * @param found       found -> True si se encuentra la nota
 * @param foundNote   foundNote -> Nota encontrada
 * 
 * ## Funcion listTitles()
 * 
 * Se encarga de listar todas las notas del usuario
 * Se llama a la funcion printTitle() de cada nota del conjunto.
 * 
 * ## Funcion readNote(Title: string)
 * 
 * Si la nota existe, llamamos a printTitle() y printBody() de la nota a leer
 * 
 * @param found   found -> True si se encuentra la nota
 * 
 */

export class UserNotes {
  constructor(private UserName: string, private Notes: Note[] = [], private DB: DBHandler = new DBHandler(UserName, Notes)) {
  }

  updateUser() {
    this.DB.databaseUpdater(this.UserName, this.Notes);
  }

  addNewNote(Title: string, Body: string, Color: TypeColor): boolean {
    let complete: boolean = false;
    let check: [boolean, Note] = this.existNote(Title);
    if(!check[0]) {
      this.Notes.push(new Note(Title, Body, Color));
      complete = true;
      console.log(chalk.green.bold("Nueva nota creada!"));
    } else {
      console.log(chalk.red.bold("Ya existe una nota con el mismo titulo"));
    }
    return complete;
  }

  modifyNote(newBody: string, Title: string): boolean {
    let complete: boolean = false;
    let check: [boolean, Note] = this.existNote(Title);
    if (check[0]) {
      const index = this.Notes.indexOf(check[1]);
      this.Notes[index].setBody(newBody);
      complete = true;
      console.log(chalk.green.bold("Nota modificada!"));
    } else {
      console.log(chalk.red.bold("No existe ninguna nota con ese titulo"));
    }
    return complete;
  }

  removeNote(Title: string): boolean {
    let complete: boolean = false;
    let check: [boolean, Note] = this.existNote(Title);
    if (check[0]) {
      const index = this.Notes.indexOf(check[1])
      if (index > -1) this.Notes.splice(index, 1);
      complete = true;
      console.log(chalk.green("Nota Eliminada!"));
    } else {
      console.log(chalk.red.bold("No existe ninguna nota con ese titulo"));
    }
    return complete;
  }

  existNote(Title: string): [boolean, Note] {
    let found: boolean = false;
    let foundNote: Note = new Note("-", "-", "Red");
    this.Notes.forEach(note => {
      if (note.getTitle() === Title) {
        found = true;
        foundNote = note;
      }
    })
    return [found, foundNote];
  }

  listTitles() {
    console.log("Notas de " + this.UserName + ":");
    this.Notes.forEach(note => {
      note.printTitle();
    })
  }

  readNote(Title: string) {
    let check: [boolean, Note] = this.existNote(Title);
    if (check[0]) {
      console.log("------------------------")
      check[1].printTitle();
      check[1].printBody();
      console.log("------------------------")
    } else {
      console.log(chalk.red.bold("No existe ninguna nota con ese titulo"));
    }
  }
}