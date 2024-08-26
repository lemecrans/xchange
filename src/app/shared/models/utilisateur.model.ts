export class Utilisateur {
    id: number;
    email: string;
    password: string;
    username: string;
    role: string;
    nombreDeNotes: number;
    noteMoyenne: number;
  
    constructor(
      id: number,
      email: string,
      password: string,
      username: string,
      role: string,
      nombreDeNotes: number,
      noteMoyenne: number
    ) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.username = username;
      this.role = role;
      this.nombreDeNotes = nombreDeNotes;
      this.noteMoyenne = noteMoyenne;
    }
  }