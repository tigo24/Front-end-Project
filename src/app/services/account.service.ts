import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  getAccountsByClientId(clientId: any,callback: (accounts: any) => void) {
    this.httpClient.get<any>(`http://localhost:3000/clients/${clientId}`).subscribe(client => callback(client.accounts));
  }


  depositCurrentBalance(clientId: any, newBalance: number, callback: (updatedClient: any) => void) {
    this.httpClient.get<any>(`http://localhost:3000/clients/${clientId}`).subscribe(client => {
      client.accounts.current.balance = client.accounts.current.balance + newBalance;
  
      this.httpClient.put<any>(`http://localhost:3000/clients/${clientId}`, client)
        .subscribe(updatedClient => callback(updatedClient));
    });
  }
  
  withdrawCurrentBalance(clientId: any, newBalance: number, callback: (updatedClient: any) => void) {
    this.httpClient.get<any>(`http://localhost:3000/clients/${clientId}`).subscribe(client => {
      client.accounts.current.balance = client.accounts.current.balance - newBalance;
  
      this.httpClient.put<any>(`http://localhost:3000/clients/${clientId}`, client)
        .subscribe(updatedClient => callback(updatedClient));
    });
  }
  
  depositSavingBalance(clientId: any, newBalance: number, callback: (updatedClient: any) => void) {
    this.httpClient.get<any>(`http://localhost:3000/clients/${clientId}`).subscribe(client => {
      client.accounts.saving.balance = client.accounts.saving.balance + newBalance;
  
      this.httpClient.put<any>(`http://localhost:3000/clients/${clientId}`, client)
        .subscribe(updatedClient => callback(updatedClient));
    });
  }
  withdrawSavingBalance(clientId: any, newBalance: number, callback: (updatedClient: any) => void) {
    this.httpClient.get<any>(`http://localhost:3000/clients/${clientId}`).subscribe(client => {
      client.accounts.saving.balance = client.accounts.saving.balance - newBalance;
  
      this.httpClient.put<any>(`http://localhost:3000/clients/${clientId}`, client)
        .subscribe(updatedClient => callback(updatedClient));
    });
  }

  

}
