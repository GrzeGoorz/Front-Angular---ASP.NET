// Importowanie modułu HttpClient z pakietu '@angular/common/http'
import { HttpClient } from '@angular/common/http';

// Importowanie dekoratora Injectable z pakietu '@angular/core'
import { Injectable } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

// Dekorator Injectable oznaczający, że klasa jest serwisem i może być wstrzykiwana w inne komponenty
@Injectable({
  providedIn: 'root' // Określenie, że ten serwis będzie dostępny globalnie w całej aplikacji
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/'; // Bazowy adres URL dla żądań API
  // Prywatny obiekt BehaviorSubject przechowujący informacje o aktualnie zalogowanym użytkowniku
  private currentUserSource = new BehaviorSubject<User | null>(null);
  // Obserwator (observable) dostępny publicznie, który umożliwia subskrybowanie zmian w aktualnie zalogowanym użytkowniku
  currentUser$ = this.currentUserSource.asObservable();

  // Konstruktor serwisu, przyjmujący obiekt HttpClient jako zależność
  constructor(private http: HttpClient) { }

  // Metoda służąca do wysyłania żądania POST na serwer dotyczące logowania
  // Przyjmuje obiekt 'model' jako parametr, który zawiera dane do zalogowania
  login(model: any) {
    // Wywołanie metody post z obiektu HttpClient, przekazując pełny adres URL do endpointa logowania oraz dane 'model'
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      // Przetworzenie odpowiedzi za pomocą operatora 'map' z RxJS
      map((response: User) => {
         // Przypisanie odpowiedzi do zmiennej 'user'
        const user = response;
        // Sprawdzenie, czy użytkownik został zalogowany poprawnie
        if (user) {
           // Jeśli tak, zapisz informacje o użytkowniku w localStorage w formie JSON
          localStorage.setItem('user', JSON.stringify(user));
          // Aktualizacja BehaviorSubject, powiadamiając subskrybentów o zmianie w aktualnie zalogowanym użytkowniku
          this.currentUserSource.next(user);
        }
      })
    )  
  }
  // Metoda ustawiająca aktualnie zalogowanego użytkownika
  setCurrentUser(user: User) {
    // Aktualizacja BehaviorSubject, powiadamiając subskrybentów o zmianie w aktualnie zalogowanym użytkowniku
    this.currentUserSource.next(user);
  }
  // Metoda służąca do wylogowywania użytkownika
  logout() {
    // Usunięcie informacji o użytkowniku z localStorage
    localStorage.removeItem('user');
    // Aktualizacja BehaviorSubject, informując o wylogowaniu użytkownika
    this.currentUserSource.next(null);
  }
}