import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-institution',
  templateUrl: './add-institution.component.html',
  styleUrls: ['./add-institution.component.scss']
})
export class AddInstitutionComponent implements OnInit {

  name: string = "";
  adress: string = "";
  phoneNumbers: number[] = [NaN];
  email: string = "";
  website: string = "";
  district: string = "";

  submitErrorMessage = "";

  showPhoneNumbers: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  nameChanged(eventTarget: EventTarget | null):void {
    this.name = (eventTarget as HTMLInputElement).value;
    this.submitErrorMessage = "";
  }

  adressChanged(eventTarget: EventTarget | null):void {
    this.adress = (eventTarget as HTMLInputElement).value;
    this.submitErrorMessage = "";
  }

  removePhoneNumber(i: number): void {
    this.phoneNumbers.splice(i, 1);
    this.submitErrorMessage = "";
  }

  addPhoneNumber(): void {
    this.phoneNumbers.unshift(NaN);
    this.submitErrorMessage = "";
  }

  phoneNumberChanged(eventTarget: EventTarget | null, i: number):void {
    let value = Number((eventTarget as HTMLInputElement).value);
    this.phoneNumbers[i] = value;
    this.submitErrorMessage = "";
    this.showPhoneNumbers = false;
    setTimeout(() => this.showPhoneNumbers = true);
  }

  emailChanged(eventTarget: EventTarget | null):void {
    this.email = (eventTarget as HTMLInputElement).value;
    this.submitErrorMessage = "";
  }

  websiteChanged(eventTarget: EventTarget | null):void {
    this.website = (eventTarget as HTMLInputElement).value;
    this.submitErrorMessage = "";
  }

  districtChanged(eventTarget: EventTarget | null):void {
    this.district = (eventTarget as HTMLInputElement).value;
    this.submitErrorMessage = "";
  }

  submitInstitution(): void {
    if (!this.name) {
      this.submitErrorMessage = "Name is required"
      return;
    }
    if (!this.website) {
      this.submitErrorMessage = "Website is required"
      return;
    }
    if (!this.district) {
      this.submitErrorMessage = "Select a district"
    }
  }
}
