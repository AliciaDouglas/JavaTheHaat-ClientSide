import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';


@NgModule({
    imports: [MatButtonModule,
              MatCheckboxModule,
              MatGridListModule,
              MatStepperModule,
              FormsModule,
              ReactiveFormsModule,
              MatFormFieldModule,
              MatInputModule,
              MatCardModule
            ],
    exports: [MatButtonModule,
              MatCheckboxModule,
              MatGridListModule,
              MatStepperModule,
              FormsModule,
              ReactiveFormsModule,
              MatFormFieldModule,
              MatInputModule,
              MatCardModule
            ],
})
export class Material { }
