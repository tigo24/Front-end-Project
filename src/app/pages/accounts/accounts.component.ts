import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, Validators, FormsModule,ReactiveFormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-accounts',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule,ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
constructor(
  private accountsService: AccountService,
){}

@Output() loadClients = new EventEmitter<void>();
@Input() clientId: number | null = null;
@ViewChild('savingDepositCollapseC', { static: false }) savingCollapse1!: ElementRef;
@ViewChild('savingWithdrawCollapseC', { static: false }) savingCollapse2!: ElementRef;
@ViewChild('currentDepositCollapseC', { static: false }) currentCollapse1!: ElementRef;
@ViewChild('currentWithdrawCollapseC', { static: false }) currentCollapse2!: ElementRef;

savingForm = new FormGroup ({
  savingFormControl : new FormControl('', [Validators.required])
})

currentForm = new FormGroup ({
  currentFormControl : new FormControl('', [Validators.required])
})


  ngOnInit(): void {
    const id = this.clientId
    if(id != null){
      this.loadAccounts(id);
      
      setTimeout(()=>{
      // this.currentForm.controls.currentFormControl.setValue(this.accounts.current.balance)
      // this.savingForm.controls.savingFormControl.setValue(this.accounts.saving.balance)
      console.log("ngOn:", this.accounts);
      this.currentBalance = this.accounts.current.balance
      this.savingBalance = this.accounts.saving.balance
        },100)
  }
}


  accounts: any;
  loadAccounts(id:any){
    this.accountsService.getAccountsByClientId(id,(accounts)=>{
      this.accounts = accounts
    }); 
  }

isEdit: boolean = false;


savingDepositCollapse(){
  setTimeout(()=>{
    this.ngOnInit()
    const collapse = new bootstrap.Collapse(this.savingCollapse1.nativeElement);
    collapse.toggle();
  })
  
}
savingWithdrawCollapse(){
  setTimeout(()=>{
    this.ngOnInit()
    const collapse = new bootstrap.Collapse(this.savingCollapse2.nativeElement);
    collapse.toggle();
  })
  
}

depositSavingBalance() {
  this.accountsService.depositSavingBalance(this.clientId, Number(this.savingForm.controls.savingFormControl.value) , (updated) => {
    console.log('New current balance:', updated.accounts.saving.balance);
    this.loadClients.emit();
    this.ngOnInit()
  });
}
withdrawSavingBalance() {
  this.accountsService.withdrawSavingBalance(this.clientId, Number(this.savingForm.controls.savingFormControl.value) , (updated) => {
    console.log('New current balance:', updated.accounts.saving.balance);
    this.loadClients.emit();
    this.ngOnInit()
  });
}



currentDepositCollapse(){
  setTimeout(()=>{
    this.ngOnInit()
    const collapse = new bootstrap.Collapse(this.currentCollapse1.nativeElement);
    collapse.toggle();
  })
}
depositCurrentBalance() {
  this.accountsService.depositCurrentBalance(this.clientId, Number(this.currentForm.controls.currentFormControl.value) , (updated) => {
    console.log('New current balance:', updated.accounts.current.balance);
    this.loadClients.emit();
    this.ngOnInit()
  });
}
currentWithdrawCollapse(){
  setTimeout(()=>{
    this.ngOnInit()
    const collapse = new bootstrap.Collapse(this.currentCollapse2.nativeElement);
    collapse.toggle();
  })
}
withdrawCurrentBalance(){
  this.accountsService.withdrawCurrentBalance(this.clientId, Number(this.currentForm.controls.currentFormControl.value) , (updated) => {
    console.log('New current balance:', updated.accounts.current.balance);
    this.loadClients.emit();
    this.ngOnInit()
  });
}

currentBalance:any;
savingBalance:any;
}
