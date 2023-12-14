import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

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
  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit(): void {
      this.getUsers();
      this.setCurrentUser();
  }

  getUsers() {
  this.http.get('https://localhost:5001/api/users').subscribe({
    next: response => {
      console.log('Dane użytkowników:', response);
      this.users = response;
    },
    error: error => console.error('Błąd podczas pobierania danych użytkowników:', error),
    complete: () => console.log('Zapytanie zakończone')
  });
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);

  }
}
