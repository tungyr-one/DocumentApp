import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { DocumentListComponent } from './doc-list/doc-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { DocEditComponent } from './doc-edit/doc-edit.component';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { NewDocComponent } from './new-doc/new-doc.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { MatTreeSelectInputModule } from 'mat-tree-select-input';
import { CommonModule } from '@angular/common';
import { DocumentViewComponent } from './doc-view/doc-view.component';

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesListToolbarComponent } from './categories-list-toolbar/categories-list-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DocumentListComponent,
    DocEditComponent,
    NewDocComponent,
    NewCategoryComponent,
    CategoryEditComponent,
    ManageCategoryComponent,
    CategoriesListComponent,
    DocumentViewComponent,
    CategoriesListToolbarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:'toast-top-left'
    }),
    NgxSpinnerModule,
    ToastContainerModule,
    NgbModule,
    FontAwesomeModule,
    MatTreeSelectInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
