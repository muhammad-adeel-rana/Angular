import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounce, debounceTime, of } from 'rxjs';
// import { debounce, debounceTime } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }

  return of({ emailIsNotUnique: true });
}

let loadedEmail = '';

const savedForm = window.localStorage.getItem('save-login-data');
if (savedForm) {
  const loadForm = JSON.parse(savedForm);
  loadedEmail = loadForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})

// export class LoginComponent {
//   private form = viewChild.required<NgForm>('form');
//   private destroyRef = inject(DestroyRef);

//   constructor() {
//     afterNextRender(() => {
//       const savedForm = window.localStorage.getItem('saved-login-form');

//       if (savedForm) {
//         const loadedFormData = JSON.parse(savedForm);
//         const savedEmail = loadedFormData.email;
//         setTimeout(() => {
//           this.form().controls['email'].setValue(savedEmail);
//         });
//       }

//       const subsciption = this.form()
//         .valueChanges?.pipe(debounceTime(500))
//         .subscribe({
//           next: (value) =>
//             window.localStorage.setItem(
//               'saved-login-form',
//               JSON.stringify({ email: value.email })
//             ),
//         });

//       this.destroyRef.onDestroy(() => subsciption?.unsubscribe());
//     });
//   }

//   onSubmit(formData: NgForm) {
//     if (formData.form.valid) {
//       const enteredEmail = formData.form.value.email;
//       const enteredPassword = formData.form.value.password;

//       console.log(enteredEmail, enteredPassword);

//       formData.reset();
//     }
//   }
// }
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(loadedEmail, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  private destroyRef = inject(DestroyRef);

  get emailIsInvalid() {
    return (
      this.form.controls.email.dirty &&
      this.form.controls.email.touched &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.dirty &&
      this.form.controls.password.touched &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit() {
    // const savedForm = window.localStorage.getItem('save-login-data');
    // if (savedForm) {
    //   const loadForm = JSON.parse(savedForm);
    //   this.form.patchValue({
    //     email: loadForm.email
    //   })
    // }

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) =>
          window.localStorage.setItem(
            'save-login-data',
            JSON.stringify({ email: value.email })
          ),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe);
  }

  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    console.log(enteredEmail, enteredPassword);
  }
}
