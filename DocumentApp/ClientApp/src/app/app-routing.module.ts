import { NewCategoryComponent } from './new-category/new-category.component';
import { NewDocComponent } from './new-doc/new-doc.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocEditComponent } from './doc-edit/doc-edit.component';
import { HomeComponent } from './home/home.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { DocumentViewComponent } from './doc-view/doc-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'docs/new', component: NewDocComponent, pathMatch: 'full' },
  { path: 'docs/:id', component: DocumentViewComponent, pathMatch: 'full' },
  { path: 'docs/edit/:id', component: DocEditComponent, pathMatch: 'full' },
  { path: 'categories/new', component: NewCategoryComponent, pathMatch: 'full' },
  { path: 'categories/edit/:id', component: CategoryEditComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
