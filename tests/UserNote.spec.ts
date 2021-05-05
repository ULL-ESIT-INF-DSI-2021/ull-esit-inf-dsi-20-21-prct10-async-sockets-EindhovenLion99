import 'mocha';
import {expect} from 'chai';
import {UserNotes} from '../src/server/UserNotes';

describe('Class UserNotes', () => {

  // UserNotes -> Notas de Usuario

  let Usuario1: UserNotes = new UserNotes("Juan");

  it("Create new Object UserNotes" , () => {
      expect(Usuario1 instanceof UserNotes).to.eql(true);
  });

  it("Adding New Note to Usuario1" , () => {
      expect(Usuario1.addNewNote("Titulo", "Cuerpo", "green")).to.eql(true);
  });

  it("Adding New Note to Usuario1 that already exists" , () => {
    expect(Usuario1.addNewNote("Titulo", "Cuerpo", "green")).to.eql(false);
  });

  it("Removing Previus Note from Usuario1" , () => {
    expect(Usuario1.removeNote("Titulo")).to.eql(true);
  });

  it("Adding New Note to Usuario1" , () => {
    expect(Usuario1.addNewNote("Titulo2", "Cuerpo2", "green")).to.eql(true);
  });

  it("Modifying Note from Usuario1" , () => {
    expect(Usuario1.modifyNote("Cuerpo", "Titulo2")).to.eql(true);
  });
});