import {Component, inject, OnDestroy} from '@angular/core';
import {AvatarUploadComponent} from "../../settings-page/avatar-upload/avatar-upload.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../../data/services/profile.service";
import {debounceTime, startWith, Subscription, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    AvatarUploadComponent,
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);


  searchFormSub: Subscription;

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: ['']
  });

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap(formValue => {
          return this.profileService.filterProfile(formValue)
        }),
        //takeUntilDestroyed()
      ).subscribe()
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe();
  }


}
