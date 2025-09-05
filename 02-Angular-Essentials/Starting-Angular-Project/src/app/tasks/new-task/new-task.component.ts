import { Component, Output, EventEmitter, signal, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../task/task.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter();

  private tasksService = inject(TasksService)

  // signals
  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // eneteredDate = signal('');

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  onClose() {
    return this.close.emit();
  }

  onSubmit(){
    this.tasksService.addTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDate
    }, this.userId
    );

    this.close.emit();
  }
}
