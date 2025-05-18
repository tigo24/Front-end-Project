import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(
    private router:Router
  ){}
  ngOnInit(): void {
    this.router.navigate(['/login'])
  }
  title = 'my-app';

  
  
}
