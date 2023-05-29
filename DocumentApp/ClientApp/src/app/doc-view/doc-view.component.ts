import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IDoc as Doc } from 'src/app/_models/Doc';
import { DocService } from '../_services/doc.service';


@Component({
  selector: 'app-document-view',
  templateUrl: './doc-view.component.html',
  styleUrls: ['./doc-view.component.css']
})
export class DocumentViewComponent {
  id:number;
  doc$:Observable<Doc>;

  constructor(private docService:DocService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit() {
    this.loadDoc();
  }

  loadDoc(){
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if(this.id !== null)
    {
      this.doc$ = this.docService.getDocument(this.id)
      .pipe();
    }
    else
    {
      this.toastr.error('Unable to load document data');
    }
  }

  deleteDoc()
  {
    if(this.id)
    {
    this.docService.deleteDocument(this.id).subscribe({
      next: () => {
        this.router.navigateByUrl('');
      }
    });
    }
  }

  cancel(){
    this.router.navigateByUrl('');
  }
}
