import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router,RouterModule } from '@angular/router';
import { ClientFormComponent } from "../client-form/client-form.component";
import { AccountService } from '../../services/account.service';
import { AccountsComponent } from '../accounts/accounts.component';
declare var bootstrap: any;


@Component({
  selector: 'app-clients',
  imports: [RouterModule, ClientFormComponent, AccountsComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  @ViewChild(`clientForm`) clientForm!:ClientFormComponent;
  @ViewChild(`accountComp`) accountComp!: AccountsComponent 
  @ViewChild('exampleModal') exampleModalRef!: ElementRef;
  @ViewChild('accountsModal') exampleModalRef2!: ElementRef;
  
  selectedClientId: number | null = null;


  modalTitle = ""
  isEditing:boolean = false

openCreateModal() {
  this.selectedClientId = null;
  this.isEditing = false
  setTimeout(()=>{
    this.ngOnInit();
    this.clientForm.ngOnInit();
      const modal = new bootstrap.Modal(this.exampleModalRef.nativeElement);
      modal.show();
    },100)
    
  
}
 

openAccountsModal(id: any){
  console.log("clicked ID: ", id); 
  this.selectedClientId = id;
  setTimeout(()=>{
    this.accountComp.ngOnInit();
      const modal = new bootstrap.Modal(this.exampleModalRef2.nativeElement);
      modal.show();
    },100)
}

openEditModal(id: number) {
  this.selectedClientId = id;
  this.isEditing = true
  setTimeout(()=>{
    this.ngOnInit();
  this.clientForm.ngOnInit();
    const modal = new bootstrap.Modal(this.exampleModalRef.nativeElement);
    modal.show();
  },100)
  
  
}


  clients: any[] = [];
  constructor(
    private clientService: ClientService,
    private accountsService: AccountService,
  ) {}
  ngOnInit(): void {
    if(this.isEditing){this.modalTitle = "Update Client"}
    else{this.modalTitle = "New Client"}
    this.loadClients();
  }
  
  loadClients(){
    this.clientService.getClients().subscribe((res: any) =>{
      this.clients = res; 
    });
  }
  deleteClient(id: number) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.loadClients();});
    }
  }
}
