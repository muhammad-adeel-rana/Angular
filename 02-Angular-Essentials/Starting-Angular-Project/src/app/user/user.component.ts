import { Component, Input, Output, EventEmitter, Type } from '@angular/core';
import { User } from './user.model';
import { CardComponent } from '../tasks/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) avatar! : string;
  // @Input({ required: true }) name! : string;

  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;

  @Output() select = new EventEmitter<string>();

  // avatar = input.required<string>();
  // name = input.required<string>();
  // select = output<string>();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  // imagePath = computed(()=> {
  //    return "assets/users/" + this.avatar();
  //   });

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
