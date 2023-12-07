import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
   // Tytuł aplikacji
  title = 'Date App';
  // Tablica użytkowników (typ "any" oznacza dowolny typ)
  users: any;

  // Konstruktor klasy AppComponent, wstrzykujący HttpClient
  constructor(private http: HttpClient) {}
   // Metoda cyklu życia komponentu wywoływana po zainicjowaniu komponentu
  ngOnInit(): void {
    // Wywołanie metody HTTP GET, aby pobrać dane z serwera
    this.http.get('https://localhost:5001/api/users').subscribe ({
      // next: Obsługuje udane zapytanie HTTP, przypisując odpowiedź do zmiennej users.
      next: response => this.users = response,
      // error: Obsługuje błąd w przypadku niepowodzenia zapytania HTTP, wypisując błąd w konsoli.
      error: error => console.log(error),
       // complete Obsługuje zdarzenie po zakończeniu zapytania HTTP, niezależnie od wyniku, wypisując komunikat w konsoli
      complete: () => console.log('Request has completed')
    })

    
    }
  }
