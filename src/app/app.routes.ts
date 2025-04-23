import { Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { NgModule } from '@angular/core';
export const routes: Routes = [
    {path: '', redirectTo: 'formulario', pathMatch: 'full'},
];
