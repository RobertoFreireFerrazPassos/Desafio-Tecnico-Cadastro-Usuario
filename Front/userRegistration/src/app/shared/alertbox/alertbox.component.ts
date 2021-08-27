import { Component, OnInit, Input } from '@angular/core';

import { TypeMessage } from './typeMessage';

@Component({
  selector: 'app-alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.css']
})
export class AlertboxComponent implements OnInit {
  @Input() message : String;
  @Input() type : TypeMessage;

  constructor() { }

  ngOnInit() {
  }

  isSucessMessage(){
    return this.type === TypeMessage.Success;
  }

  isErrorMessage(){
    return this.type === TypeMessage.Error;
  }
}
