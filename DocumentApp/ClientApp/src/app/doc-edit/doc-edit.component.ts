import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doc } from 'src/app/_models/doc';
import { DocService } from '../_services/doc.service';

@Component({
  selector: 'app-doc-edit',
  templateUrl: './doc-edit.component.html',
  styleUrls: ['./doc-edit.component.css']
})
export class DocEditComponent implements OnInit{
  editForm: FormGroup;
  id:string|null;
  doc:Doc;

  constructor(private docService:DocService, private toastr: ToastrService,
    private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {    
    this.editForm = this.fb.group({
      name: ['name', Validators.required],
      version: ['', [Validators.required]],
      author: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      text: ['', [Validators.required, Validators.minLength(15)]],
    });
    this.loadDoc();
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid);
    console.log('Name', form.value.name);
    console.log('Version', form.value.email);
    console.log('Author', form.value.message);
    console.log('Category', form.value.message);
    console.log('Subcategory', form.value.message);
    console.log('Text', form.value.message);
    this.toastr.success('Ehuuuuuuu!');
  }

  fillForm(editDoc:Doc){
    this.editForm.controls['name'].setValue('ddddddddd');

    this.editForm.controls['version'].setValue(this.doc.version);
  }

  loadDoc(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("id: " + this.id);
    if(this.id !== null)
    {
        this.docService.getDoc(this.id).subscribe(doc =>{
        this.doc = doc;
      })
    }
    else
    {
      this.toastr.error('Unable to load document data');
    }
  }
}