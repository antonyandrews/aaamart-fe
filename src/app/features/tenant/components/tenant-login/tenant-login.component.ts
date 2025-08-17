import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ImageContainerComponent } from '../../../shared/components/image-container/image-container.component';

@Component({
  selector: 'app-tenant-login',
  templateUrl: './tenant-login.component.html',
  styleUrls: ['./tenant-login.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ImageContainerComponent],
  standalone: true
})
export class TenantLoginComponent implements OnInit {
  tenantForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.tenantForm = this.createTenantForm();
   }

  createTenantForm(): FormGroup {
    return this.formBuilder.group({
      tenantName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      gstNumber: new FormControl('', Validators.required)
    });
  }

  createTenant(): void {

  }

  ngOnInit() {
  }

}
