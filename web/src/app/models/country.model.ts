export class Country {
  id?: number;
  icao: string;
  name: string;

  constructor(id: number, icao: string, name: string) {
    this.id = id;
    this.icao = icao;
    this.name = name;
  }
}
