import { Component } from '@angular/core';
import { DataService } from '../../providers/shared/shared.service';


@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfileComponent {
  user: any = {name: '', picture: ''};

  constructor(
    private shareData: DataService
  ) {
    this.shareData.userProfileSubscriber.subscribe((res) => {
      if(res != undefined && Object.keys(res).length) {
        this.user = res;

        
      }
    });
  }
}
