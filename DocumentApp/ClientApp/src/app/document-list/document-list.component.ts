import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doc } from '../_models/Doc';
import { DocService } from '../_services/doc.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit
{
  docs: Doc[] = [];
  displayedColumns: string[] = ['id', 'name', 'created', 'version', 'author', 'category', 'subcategory'];
  dataSource: MatTableDataSource<Doc>;

  @ViewChild(MatPaginator) paginator:MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  @ViewChild(MatSort) sort:MatSort = new MatSort();

  constructor(public docService: DocService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {  
    this.loadMembers();
  }

  
  loadMembers() {    
    this.docService.getDocuments().subscribe({
      next: (response: any) => {
          this.dataSource = new MatTableDataSource(response);        
      }
    })
  }

  ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}