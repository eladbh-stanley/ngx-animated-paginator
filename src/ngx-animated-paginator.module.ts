import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAnimatedPaginatorComponent } from './ngx-animated-paginator.component';

@NgModule({
  declarations: [NgxAnimatedPaginatorComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [NgxAnimatedPaginatorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxAnimatedPaginatorModule {} 