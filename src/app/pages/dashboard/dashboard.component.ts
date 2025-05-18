import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsComponent } from "../clients/clients.component";


@Component({
  selector: 'app-dashboard',
  imports: [ClientsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor( 
    private router: Router,){}


    ngOnInit(): void {
        const loged = sessionStorage.getItem('isLoged') === 'true';
        
        if (loged) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
    }
    
    signOut() {
      if(confirm('Are you sure you want to Sign Out?')){
        sessionStorage.setItem('isLoged', 'false');
        this.router.navigate(['/login']);
      }
      }     
}
