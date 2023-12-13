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
    // Tutaj można umieścić kod, który ma być wykonany podczas inicjalizacji komponentu
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

  logout() {
    
  }
}