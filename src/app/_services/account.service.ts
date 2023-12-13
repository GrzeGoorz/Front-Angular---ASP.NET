// Importowanie modułu HttpClient z pakietu '@angular/common/http'
import { HttpClient } from '@angular/common/http';

// Importowanie dekoratora Injectable z pakietu '@angular/core'
import { Injectable } from '@angular/core';

// Dekorator Injectable oznaczający, że klasa jest serwisem i może być wstrzykiwana w inne komponenty
@Injectable({
  providedIn: 'root' // Określenie, że ten serwis będzie dostępny globalnie w całej aplikacji
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/'; // Bazowy adres URL dla żądań API

  // Konstruktor serwisu, przyjmujący obiekt HttpClient jako zależność
  constructor(private http: HttpClient) { }

  // Metoda służąca do wysyłania żądania POST na serwer dotyczące logowania
  // Przyjmuje obiekt 'model' jako parametr, który zawiera dane do zalogowania
  login(model: any) {
    // Wywołanie metody post z obiektu HttpClient, przekazując pełny adres URL do endpointa logowania oraz dane 'model'
    return this.http.post(this.baseUrl + 'account/login', model);
  }
}