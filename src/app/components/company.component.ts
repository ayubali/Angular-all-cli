/**
 * Created by asarker on 6/10/16.
 */

import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Company} from "../models/company";
import {MenuComponent} from "./menu.component";
import {CompanyService} from "../services/company.service";

@Component({
  templateUrl: '../app/templates/company/company.html',
  styleUrls: ['../styles/dashboard.css'],
  providers: [CompanyService],
  directives: [ROUTER_DIRECTIVES, MenuComponent]
})

export class CompanyComponent implements OnInit {

  companies:Company[] = [];
  messages:String[] = [];

  constructor(private _router:Router, private _service:CompanyService) {

  }

 private onEdit(company:Company) {
    this._router.navigate(['/companies', company.id])
   //this.router.navigate(['/hero', hero.id]);

 }

  private delete(_company:Company) {
    this._service.deleteCompany(_company.id).then(data => {
        if (data) {
          this.companies = this.companies.filter(company => company.id !== _company.id);
        }
        else {
          this.messages.push("problem in deteting Entity");
        }
      },
      (error) => {
        this.messages = error;
        console.log('failed to update', error);
      });

  }


  ngOnInit():any {
    this.getCompanies();
  }

  private getCompanies() {
    this._service.getCompanies().subscribe(
      data => {
        this.companies = data;
      },
      error => {
        this.messages = this._service._serviceHelper.getFormattedErrorMessage(error)
        console.log("failed to get company list")
      }
    );
  }


}

