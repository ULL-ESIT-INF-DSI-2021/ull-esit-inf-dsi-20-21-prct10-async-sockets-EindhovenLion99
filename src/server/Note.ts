import chalk from "chalk";

export type TypeColor = "Red" | "Green" | "Blue" | "Yellow";

/**
 * # Class Note
 * Esta clase se encargara de la estructura y componentes de cada nota.
 * 
 * ## Atributos
 * Los atributos de la clase Note son los siguientes:
 * @param Title Title
 * @param Body Body
 * @param Color Color
 * 
 * 
 * ## Metodos
 * Son los setters y getters basicos de la clase, para poder modificar y obtener los valores de la clase
 * @method setTitle() Modifica el titulo de la nota
 * @method setBody() Modifica el cuerpo de la nota
 * @method setColor() Modifica el color de la nota
 * 
 * @method getTitle() Retorna el titulo de la nota
 * @method getBody() Retorna el cuerpo de la nota
 * @method getColor() Retorna el color de la nota
 * 
 * @method printTitle() Hace un console.log del titulo de la nota
 * 
 * ```ts
 * printTitle() {
 *   switch (this.Color) {
 *     case "Red":
 *       console.log(chalk.red(this.Title));
 *       break;
 *     case "Blue":
 *       console.log(chalk.blue(this.Title));
 *       break;
 *     case "Green":
 *       console.log(chalk.green(this.Title));
 *       break;
 *     case "Yellow":
 *       console.log(chalk.yellow(this.Title));
 *       break;
 *   } 
 * }
 * ```
 * 
 * @method printBody() Hace un console.log del body de la nota
 * 
 * ```ts
 * printBody() {
 *   switch (this.Color) {
 *     case "Red":
 *       console.log(chalk.red(this.Body));
 *       break;
 *     case "Blue":
 *       console.log(chalk.blue(this.Body));
 *       break;
 *     case "Green":
 *       console.log(chalk.green(this.Body));
 *       break;
 *     case "Yellow":
 *       console.log(chalk.yellow(this.Body));
 *       break;
 *   } 
 * }
 * ```
 */

export class Note {
  constructor(private Title: string,
              private Body: string,
              private Color: TypeColor) {}

  setTitle(newTitle: string): void {
    this.Title = newTitle;
  }

  setBody(newBody: string): void {
    this.Body = newBody;
  }

  setColor(newColor: TypeColor): void {
    this.Color = newColor;
  }

  getTitle(): string {
    return this.Title;
  }

  getBody(): string {
    return this.Body;
  }

  getColor(): TypeColor {
    return this.Color;
  }

  printTitle() {
    switch (this.Color) {
      case "Red":
        console.log(chalk.red(this.Title));
        break;
      case "Blue":
        console.log(chalk.blue(this.Title));
        break;
      case "Green":
        console.log(chalk.green(this.Title));
        break;
      case "Yellow":
        console.log(chalk.yellow(this.Title));
        break;
    } 
  }

  printBody() {
    switch (this.Color) {
      case "Red":
        console.log(chalk.red(this.Body));
        break;
      case "Blue":
        console.log(chalk.blue(this.Body));
        break;
      case "Green":
        console.log(chalk.green(this.Body));
        break;
      case "Yellow":
        console.log(chalk.yellow(this.Body));
        break;
    } 
  }
}