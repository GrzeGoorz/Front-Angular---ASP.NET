// Importowanie modułu Component z pakietu '@angular/core'
import { Component } from '@angular/core';

// Importowanie usługi AccountService z lokalnego pliku '../_services/account.service'
import { AccountService } from '../_services/account.service';

// Importowanie obiektu response z modułu 'express'
import { response } from 'express';

// Dekorator Component oznaczający, że klasa reprezentuje komponent Angulara
@Component({
  selector: 'app-nav', // Selektor komponentu, który może być użyty w szablonach HTML
  templateUrl: './nav.component.html', // Ścieżka do pliku szablonu HTML dla komponentu
  styleUrls: ['./nav.component.css'] // Tablica ścieżek do plików stylów CSS dla komponentu
})
export class NavComponent {
  model: any = {}; // Obiekt modelu przechowujący dane formularza logowania
  loggedIn = false; // Zmienna informująca o tym, czy użytkownik jest zalogowany

  // Konstruktor komponentu, przyjmujący obiekt AccountService jako zależność
  constructor(private accountService: AccountService) { }

  // Metoda wywoływana podczas inicjalizacji komponentu
  ngOnInit(): void {
    // Wywołanie metody getCurrentUser() w celu uzyskania aktualnie zalogowanego użytkownika
    this.getCurrentUser();

  }
  // Metoda pobierająca aktualnie zalogowanego użytkownika za pomocą serwisu konta
  getCurrentUser() {
    // Subskrybowanie do obserwatora currentUser$ w serwisie AccountService
    this.accountService.currentUser$.subscribe({
      // Obsługa zdarzenia 'next' (sukces)
      next: user => this.loggedIn = !!user,
      // Obsługa zdarzenia 'error' (błąd)
      error: error => console.log(error)
    })
  }
  // Metoda obsługująca próbę logowania
  login() {
    // Wywołanie metody login z obiektu AccountService, przekazując dane modelu
    this.accountService.login(this.model).subscribe({
      // Obsługa zdarzenia 'next' (sukces)
      next: response => {
        console.log(response); // Wyświetlenie odpowiedzi z serwera w konsoli
        this.loggedIn = true; // Ustawienie flagi zalogowanego użytkownika na true
      },
      // Obsługa zdarzenia 'error' (błąd)
      error: error => console.log(error) // Wyświetlenie błędu w konsoli
    })
  }

  // Metoda obsługująca wylogowywanie
  logout() {
    // Wywołanie metody logout z obiektu AccountService
    this.accountService.logout();
    // Ustawienie flagi zalogowanego użytkownika na false
    this.loggedIn = false;
  }
}