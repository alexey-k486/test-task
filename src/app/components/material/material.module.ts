import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatButtonModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule, MatButtonModule, MatToolbarModule
  ],
  exports: [ MatIconModule, MatButtonModule, MatToolbarModule ]
})
export class MaterialModule { }
