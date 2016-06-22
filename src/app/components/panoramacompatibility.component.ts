/**
 * Created by asarker on 6/17/16.
 */

import {OnInit, Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {PanoramaCompatibility} from "../models/panoramacompatibily";
import {PanoramaCompatibilityService} from "../services/panotama.compatibilitiy.service";

@Component({
  templateUrl: '../app/templates/panorama/panorama.html',
  providers: [PanoramaCompatibilityService],
  directives: [ROUTER_DIRECTIVES, MenuComponent]
})

export class PanoramaCompatibilityComponent implements  OnInit{
  panoramaCompatibilities:PanoramaCompatibility[] = [];
  messages:String[] = [];


  constructor(private _router:Router, private _service:PanoramaCompatibilityService) {

  }

  private onEdit(panoramaCompatibility:PanoramaCompatibility) {
    this._router.navigate(['/panorama', panoramaCompatibility.id])
  }


  private delete(panoramaCompatibility:PanoramaCompatibility) {
    this._service.deletePanoramaCompatibility(panoramaCompatibility.id).then(data => {
        if (data) {
          this.panoramaCompatibilities = this.panoramaCompatibilities.filter(app => app.id !== panoramaCompatibility.id);
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
    this.getPanoramaCompatibilities();
  }

  private getPanoramaCompatibilities() {
    this._service.getPanoramaCompatibilities().subscribe(
      data => {
        this.panoramaCompatibilities = data;
      },
      error => {
        this.messages = this._service._serviceHelper.getFormattedErrorMessage(error)
        console.log("failed to get panorama list")
      }
    );
  }
}
