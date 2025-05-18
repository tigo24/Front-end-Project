import {ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, Validators, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule,ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnInit{
  @Output() loadClients = new EventEmitter<void>();
  @Input() clientId: number | null = null;

  constructor(private clientService: ClientService,
    private router: Router
  ){}

  clientFormGroup = new FormGroup({
    clientNameFormControl : new FormControl('', [
      Validators.required,
      Validators.minLength(3)]),
  
  
      phoneFormControl : new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)

      ]),
      nIdFormControl : new FormControl('', [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14)

      ])
  })
  client:any;
  formBtn: string = 'Create';
  isEdit: boolean = false

  ngOnInit(): void {
    const id = this.clientId
    if(id != null){
      this.getData(id)
      this.isEdit = true;
      this.formBtn = 'Update';
    }else{
      this.isEdit = false;
      this.formBtn = 'Create'
      this.clientFormGroup.controls.clientNameFormControl.setValue(``);
      this.clientFormGroup.controls.phoneFormControl.setValue(``);
      this.clientFormGroup.controls.nIdFormControl.setValue(``);
    }
    
  }

  getData(id: number){
    this.clientService.getClient(id).subscribe((res:any) =>{
      this.client = res;
      this.newClient.accounts = res.accounts;
      this.clientFormGroup.controls.clientNameFormControl.setValue(this.client.name);
      this.clientFormGroup.controls.phoneFormControl.setValue(this.client.phone);
      this.clientFormGroup.controls.nIdFormControl.setValue(this.client.nationalId);
      
      if (!this.clientFormGroup.contains('id')) {
        (this.clientFormGroup as FormGroup).addControl('id', new FormControl(id));
        (this.clientFormGroup as FormGroup).addControl('accounts', new FormControl())
      }
      

      console.log( res, );
      
    })
  }
  
  newClient: {
    id?: number;
    name: string;
    phone: string;
    nationalId: string;
    accounts: {
      current: { balance: number },
      saving: { balance: number }
    };
  } = {
    name: '',
    phone: '',
    nationalId: '',
    accounts: {
      current: {
        balance: 0
      },
      saving: {
        balance: 0
      }
    }
  }
  
  onCreateOrUpdateClient(){
    if (this.isEdit) {
      this.newClient = {
        ...this.newClient,
        id: this.clientId!,
        name: this.clientFormGroup.controls.clientNameFormControl.value!,
        phone: this.clientFormGroup.controls.phoneFormControl.value!,
        nationalId: this.clientFormGroup.controls.nIdFormControl.value!,
        
      }

      this.clientService.updateClient(this.newClient).subscribe(res =>{
        alert('Client Updated successfully');
        this.loadClients.emit();
        
        this.newClient = {
          name: '',
          phone: '',
          nationalId: '',
          accounts: {
            current: {
              balance: 0
            },
            saving: {
              balance: 0
            }
          }
        }
      })
    }else{
      this.newClient = {
        ...this.newClient,
        name: this.clientFormGroup.controls.clientNameFormControl.value!,
        phone: this.clientFormGroup.controls.phoneFormControl.value!,
        nationalId: this.clientFormGroup.controls.nIdFormControl.value!,
        accounts: {
          current: {
            balance: 0
          },
          saving: {
            balance: 0
          }
        }
      }
      
      this.clientService.createClient(this.newClient).subscribe(res =>{
        alert('Client created successfully');
        this.clientFormGroup.reset();
        this.loadClients.emit();
        this.newClient = {
          name: '',
          phone: '',
          nationalId: '',
          accounts: {
            current: {
              balance: 0
            },
            saving: {
              balance: 0
            }
          }
        }
      })
    }
  }
}
