import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";

import { User } from "../models/auth.models";
import { environment } from "src/app/environments/environment";
import { throwError } from "rxjs";

const URL_BASE = environment.host + "auth/";
@Injectable({ providedIn: "root" })
export class AuthenticationService {
  user: any | null = null;
  emailRegister :string = '';
  constructor(private http: HttpClient) {}

  /**
   * Returns the current user
   */
  public currentUser(): User | null {
    if (!this.user) {
      this.user = JSON.parse(sessionStorage.getItem("currentUser")!);
    }
    return this.user;
  }

  /**
   * Performs the login auth
   * @param email email of user
   * @param password password of user
   */
  login(email: string, password: string): any {
    const url = URL_BASE + "login";
    const body = {
      email: email,
      password: password,
    };
    // console.log("=====================================================");
    // console.log(body);

    return this.http.post<any>(url, body).pipe(
      map((response) => {
        if (response) {
          const user = {
            email: response.user.email,
            id: response.user.id,
            nombreDeNotes: response.user.nombreDeNotes,
            noteMoyenne: response.user.noteMoyenne,
            role: response.user.role,
            username: response.user.username,
            token: response.token,
          };
          this.user = user;
          sessionStorage.setItem("currentUser", JSON.stringify(this.user));
        }
        return this.user;
      }),
      // Interception et gestion des erreurs
      catchError((error) => {
        console.error("Erreur de login :", error);
        let errorMessage = "Une erreur s'est produite lors de la connexion.";
        if (error.status === 401) {
          errorMessage = "Email ou mot de passe incorrect.";
        } else if (error.status === 500) {
          errorMessage = "Erreur serveur, veuillez réessayer plus tard.";
        }
        // Vous pouvez renvoyer l'erreur ou afficher un message d'erreur à l'utilisateur
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Performs the signup auth
   * @param name name of user
   * @param email email of user
   * @param password password of user
   */
  signup(username: string, email: string, password: string): any {
    const url = URL_BASE + "register";
    const body = {
      email: email,
      password: password,
      username:username,
      role: "ROLE_USER",
    };
    return this.http.post<any>(url,body)
    .pipe(map((response) => {
            this.emailRegister=  response.user.email;
      }));
      
  }

  /**
   * Logout the user
   */
  logout(): void {
    // remove user from session storage to log user out
    sessionStorage.removeItem("currentUser");
    this.user = null;
  }
}
