import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  

  constructor(private httpClient: HttpClient) { 
   
  }

 

  getClients() {
    return this.httpClient.get('http://localhost:3000/clients');
  }
  
  getClient(id: number) {
    return this.httpClient.get(`http://localhost:3000/clients/${id}`);
  }
  
  createClient(clientData: any) {
    return this.httpClient.post('http://localhost:3000/clients', clientData);
  }
  
  updateClient(newClient: any) {
    return this.httpClient.put(`http://localhost:3000/clients/${newClient.id}`, newClient);
  }
  
  deleteClient(id: number) {
    return this.httpClient.delete(`http://localhost:3000/clients/${id}`);
  }

}
