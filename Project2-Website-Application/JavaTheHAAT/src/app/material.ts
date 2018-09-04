import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [MatButtonModule,
              MatCheckboxModule,
              MatGridListModule,
              MatStepperModule,
              FormsModule,
              ReactiveFormsModule,
              MatFormFieldModule,
              MatInputModule
            ],
    exports: [MatButtonModule,
              MatCheckboxModule,
              MatGridListModule,
              MatStepperModule,
              FormsModule,
              ReactiveFormsModule,
              MatFormFieldModule,
              MatInputModule
            ],
})
export class Material { }
