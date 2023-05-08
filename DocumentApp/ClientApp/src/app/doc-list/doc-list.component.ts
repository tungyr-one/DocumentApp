import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../_services/category.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doc } from '../_models/Doc';
import { DocService } from '../_services/doc.service';
import { Pagination } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

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

  pagination: Pagination | undefined;
  userParams: UserParams;

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  // pageChanged(event: any){
  //   if(this.userParams && this.userParams.pageNumber !== event.page)
  //   {
  //     this.userParams.pageNumber = event.page;
  //     this.loadDocs();
  //   }
  // }

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.clear();
    console.log(e);

    this.userParams!.pageSize = e.pageSize;
    this.userParams!.pageNumber = e.pageIndex;

    this.loadDocs();

  }

  @ViewChild(MatPaginator) paginator:MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort:MatSort = new MatSort();

  constructor(private docService: DocService, private categoriesService:CategoryService,
    private toastrService:ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.userParams = new UserParams();
    this.loadDocs();

    this.categoriesService.categoriesChangedEvent
    .subscribe(() => {
         this.loadDocs();
    });
  }

  loadDocs() {
    if(this.userParams)
    {
      console.log("user params: ", this.userParams);
      this.docService.getDocuments(this.userParams).subscribe({
        next: (response: any) => {
            this.dataSource = new MatTableDataSource(response);
            // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          this.length = 50;
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.userParams!.filterBy = filterValue
    this.loadDocs();
  }

  sortData(sort: Sort) {
    console.log(sort);
    this.userParams!.orderBy = sort.active;
    this.userParams!.orderDirection = sort.direction;
    this.loadDocs();
    }
}


