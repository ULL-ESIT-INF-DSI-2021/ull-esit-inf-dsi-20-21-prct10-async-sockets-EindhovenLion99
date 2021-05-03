import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/Note';

describe('Class Note', () => {

  // Note -> Primera Nota

  let Note1 = new Note("Primera Nota", "Esta es una nota de prueba", "Blue");

  it("Create new Object Note" , () => {
      expect(Note1 instanceof Note).to.eql(true);
  });

  it("Getters Note Title" , () => {
      expect(Note1.getTitle()).to.eql("Primera Nota");
  });

  it("Getters Note Body" , () => {
      expect(Note1.getBody()).to.eql("Esta es una nota de prueba");
  });

  it("Getters Note Color" , () => {
      expect(Note1.getColor()).to.eql("Blue");
  });

  // Cambiamos los datos con los setters

  it("Modified Note Title" , () => {
    Note1.setTitle("Titulo Nuevo");
    expect(Note1.getTitle()).to.eql("Titulo Nuevo");
  });

  it("Modified Note Body" , () => {
      Note1.setBody("Body Nuevo");
      expect(Note1.getBody()).to.eql("Body Nuevo");
  });

  it("Modified Note Color" , () => {
      Note1.setColor("Green");
      expect(Note1.getColor()).to.eql("Green");
  });


});