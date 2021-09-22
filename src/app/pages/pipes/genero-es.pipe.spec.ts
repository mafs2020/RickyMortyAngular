import { GeneroEsPipe } from './genero-es.pipe';

describe('GeneroEsPipe', () => {
  let pipe = new GeneroEsPipe()
  it('create an instance', () => {
    const pipe = new GeneroEsPipe();
    expect(pipe).toBeTruthy();
  });

  it('definir sexo Masculino', () => {
    expect(pipe.transform('Male')).toBe('Hombre');
  });

  it('definir sexo Femenino', () => {
    expect(pipe.transform('Female')).toBe('Mujer');
  });
});
