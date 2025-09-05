import { Component, ElementRef, output, viewChild, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ControlComponent } from '../../../shared/control/control.component';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  add = output<{
    title : string,
    request: string
  }>();

  enteredTitle = '';
  enteredRequest = '';
  
  // ngOnInit(){
  //   console.log("OnIT");
  //   console.log(this.form);
  // }

  // ngAfterViewInit(){
  //   console.log("After View Init");
  //   console.log(this.form);
  // }

  onSubmit() {
    // console.log(title);
    // console.log(requestText);
    this.add.emit({
      title: this.enteredTitle,
      request: this.enteredRequest
    });
    // this.form().nativeElement.reset();\
    this.enteredTitle = '';
    this.enteredRequest = '';
  }
}
