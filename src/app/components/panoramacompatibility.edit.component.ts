/**
 * Created by asarker on 6/17/16.
 */

import  {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {PanoramaCompatibility} from "../models/panoramacompatibily";
import {PanoramaCompatibilityService} from "../services/panotama.compatibilitiy.service";

@Component({
  templateUrl: '../app/templates/panorama/edit.html',
  providers: [PanoramaCompatibilityService],
  directives: [ROUTER_DIRECTIVES, MenuComponent]
})

export class PanoramaCompatibilityEditComponent implements OnInit, OnDestroy{
  headerTxt:string = 'Edit PanoramaCompatibility';
  panoramaCompatibility:PanoramaCompatibility;
  messages:String[] =[];
  private sub:any;


  constructor(private _router:Router, private _route:ActivatedRoute, private _service:PanoramaCompatibilityService) {
    this.panoramaCompatibility = <PanoramaCompatibility>({
      id: null,
      panorama_version: '',
      display_name: '',
      te_version: ''
    });
  }

  private onSubmit() {
    console.log("value: " + this.panoramaCompatibility.id + " panorama_version : " + this.panoramaCompatibility.panorama_version + " te_version: " + this.panoramaCompatibility.te_version);

    //update the panoramaCompatibility
    if (this.panoramaCompatibility.id) {
      this._service.updatePanoramaCompatibility(this.panoramaCompatibility).then((data) => {
          if (data) {
            console.log('panoramaCompatibility is updated successfuly', data);
            this._router.navigate(['/panorama']);
          } else {
            this.messages.push('Failed to update try again');
          }
        },
        (error) => {
          this.messages = error;
          console.log('Failed to update', error);
        });
    }
    else { // create new panoramaCompatibility
      this._service.addPanoramaCompatibility(this.panoramaCompatibility).then((data) => {
          if (data) {
            console.log('panoramaCompatibility is added successfuly', data);
            this._router.navigate(['/panorama']);
          } else {
            this.messages.push('Failed to add try again');
          }
        },
        (error) => {
          this.messages = error;
          console.log('Failed to add', error);
        });
      console.log('added the panoramaCompatibility: ');
    }
  }

  private onCancel() {
    this._router.navigate(['/panorama']);
  }

  ngOnInit():any {

    this.sub = this._route.params.subscribe(params => {
      var panoramaId = Number(params['id']);
      console.log("panoramaId: " + panoramaId);

      if (isNaN(panoramaId) || panoramaId == 0) {
        this.headerTxt = "Add New PanoramaCompatibility";

      } else {
        this._service.getPanoramaCompatibility(panoramaId).subscribe(
          data => {
            this.panoramaCompatibility = data;
          },
          err=> {
            console.log("error: " + err)
            this.messages = this._service._serviceHelper.getFormattedErrorMessage(err);
          },
          () => {
            console.log("panorama: " + this.panoramaCompatibility.panorama_version + " te: " + this.panoramaCompatibility.te_version);
          }
        );
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
