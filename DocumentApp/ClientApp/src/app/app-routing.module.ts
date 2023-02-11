import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocEditComponent } from './doc-edit/doc-edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'docs/:id', component: DocEditComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
