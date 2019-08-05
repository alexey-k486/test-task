import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatButtonModule, MatToolbarModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule, MatButtonModule, MatToolbarModule, MatInputModule
  ],
  exports: [ MatIconModule, MatButtonModule, MatToolbarModule, MatInputModule ]
})
export class MaterialModule { }
