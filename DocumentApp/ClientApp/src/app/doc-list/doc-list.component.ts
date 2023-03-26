import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../_services/category.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doc } from '../_models/Doc';
import { DocService } from '../_services/doc.service';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocumentListComponent implements OnInit
{
  docs: Doc[] = [];
  displayedColumns: string[] = ['name', 'created', 'version', 'author', 'category'];
  dataSource: MatTableDataSource<Doc>;

  @ViewChild(MatPaginator) paginator:MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  @ViewChild(MatSort) sort:MatSort = new MatSort();

  constructor(private docService: DocService, private categoriesService:CategoryService,
    private toastrService:ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadDocs();

    this.categoriesService.categoriesChangedEvent
    .subscribe(() => {
         this.loadDocs();
    });
  }

  loadDocs() {
    this.docService.getDocuments().subscribe({
      next: (response: any) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  deleteDoc(id:number)
  {
    this.docService.deleteDocument(id).subscribe({
      next: () => {
        this.ngOnInit();
        this.toastrService.success('Document deleted');
      }
    });
  }

  deleteCategory(id:number)
  {
    this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: error => {
        this.toastrService.error(error.error.message, "Oops!")
    }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
