import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../_services/category.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doc } from '../_models/Doc';
import { DocService } from '../_services/doc.service';
import { UserParams } from '../_models/userParams';
import { Pagination } from '../_models/Pagination';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocumentListComponent implements OnInit
{
  docs: Doc[] = [];
  displayedColumns: string[] = ['name', 'edited', 'created', 'version', 'author', 'category'];
  dataSource: MatTableDataSource<Doc>;

  userParams: UserParams =
  {
    offset:0,
    pageSize: 5,
    sortBy: 'name',
    sortOrder: 'asc',
    filterBy: '',
  };

  pagination: Pagination<Doc> = new Pagination();
  countPages:number;

  pageSizeOptions = [5, 10, 25, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(private docService: DocService,
    private categoriesService:CategoryService,
    private toastrService:ToastrService)
  {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadDocs();
  }

  handlePageEvent(e: PageEvent) {
    this.userParams.pageSize = e.pageSize;
    this.userParams.offset = e.pageSize * e.pageIndex;

    this.loadDocs();
  }

  loadDocs() {
    if(this.userParams)
    {
      this.docService.getDocuments(this.userParams).subscribe({
        next: (response: Pagination<Doc>) => {
          this.dataSource = new MatTableDataSource(response.items);
          this.pagination = response;
        }
      })
    }
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
    this.userParams.filterBy = filterValue;
    this.loadDocs();
  }

  sortData(sort: Sort) {
    this.userParams.sortBy = sort.active;
    this.userParams.sortOrder = sort.direction;
    this.loadDocs();
    }
}


