import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export const emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
console.log(password.value, 'username', confirmPassword.value);
  return  { nomatch: true };
};

@IonicPage({
  name: 'page-signup'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public form: FormGroup;
  public user: any = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };
  public passwordsDoesnotMatch: boolean = false;
  public isSubmit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, 
    { validator: (control: AbstractControl): {[key: string]: boolean} => {
      const password = control.get('password'),
            confirmPassword = control.get('confirmPassword');
      
      if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
        this.passwordsDoesnotMatch = true;
        return  { nomatch: true };
      } else {
        this.passwordsDoesnotMatch = false;
        return  { };
      }
    }});


    //,{ validator: emailMatcher }
  }

  signUp() {
    this.isSubmit = true;
    console.log(this.form.valid, 'fff');
  }
}
