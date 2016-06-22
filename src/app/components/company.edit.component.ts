/**
 * Created by asarker on 6/10/16.
 */
import  {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute}       from '@angular/router';
import {MenuComponent} from "./menu.component";
import {Company} from "../models/company";
import {CompanyService} from "../services/company.service";

@Component({
  templateUrl: '../app/templates/company/edit.html',
  providers: [CompanyService],
  directives: [MenuComponent]
})

export class CompanyEditComponent implements OnInit, OnDestroy {

  headerTxt:string = 'Edit Company';
  company:Company;
  messages:String[] = [];
  private sub: any;

  constructor(private _router:Router, private _route: ActivatedRoute, private _service:CompanyService) {
    this.company = <Company>({
      id: null,
      name: '',
      display_name: '',
      logo_url: '',
      updated_by_id: null,
      created_by_id: null
    });
  }

  private onSubmit() {
    console.log("value: " + this.company.id + " company: name : " + this.company.name + "Logo: " + this.company.logo_url);

    //update the company
    if (this.company.id) {
      this._service.updateCompany(this.company).then((data) => {
          if (data) {
            console.log('company is updated successfuly', data);
            this._router.navigate(['/companies']);
          } else {
            this.messages.push('Failed to update try again');
          }
        },
        (error) => {
          this.messages = error;
          console.log('Failed to update', error);
        });
    }
    else { // create new company
      this._service.addCompany(this.company).then((data) => {
          if (data) {
            console.log('company is added successfuly', data);
            this._router.navigate(['/companies']);
          } else {
            this.messages.push('Failed to add try again');
          }
        },
        (error) => {
          this.messages = error;
          console.log('Failed to add', error);
        });
      console.log('add post the company: ');
    }
  }

  private onCancel() {
    this._router.navigate(['/companies']);
  }



  ngOnInit():any {

    this.sub = this._route.params.subscribe(params => {
      var companyId = Number(params['id']);

      if (isNaN(companyId) || companyId == 0) {
        this.headerTxt = "Add New Company";

      } else {
        this._service.getCompany(companyId).subscribe(
          data => {
            this.company = data;
          },
          err=> {
            console.log("error: " + err)
            this.messages = this._service._serviceHelper.getFormattedErrorMessage(err);
          },
          () => {
            console.log("Company: " + this.company.name + " name: " + this.company.name);
          }
        );
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
