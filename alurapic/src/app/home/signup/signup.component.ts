import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './newUser';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput', null) emailInput: ElementRef;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private platformDetectorService: PlatformDetectorService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: ['',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
    });

    this.focusInputEmail();
  }

  signUp() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signUpService.signUp(newUser).subscribe(() =>
      this.router.navigate(['']),
      err => console.log(err.message));
  }

  focusInputEmail() {
    if (this.platformDetectorService.isPlatformBrowser()) {
      this.emailInput.nativeElement.focus();
    }
  }
}
