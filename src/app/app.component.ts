import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
  this.http.get('https://localhost:5001/api/users').subscribe({
    next: response => {
      console.log('Dane użytkowników:', response);
      this.users = response;
    },
    error: error => console.error('Błąd podczas pobierania danych użytkowników:', error),
    complete: () => console.log('Zapytanie zakończone')
  });
  }
}
