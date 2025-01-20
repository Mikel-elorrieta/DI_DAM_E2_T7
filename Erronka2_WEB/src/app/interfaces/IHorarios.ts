export interface IHorarios {
  Dia:       dia;
  Hora:      number;
  Modulo:    string;
  Profesor:  string;

}

export enum dia {
  JO = "J/O",
  LA = "L/A",
  MA = "M/A",
  VO = "V/O",
  X = "X",
}
