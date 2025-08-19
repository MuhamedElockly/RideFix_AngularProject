// // register-step1.component.ts
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { AuthService } from '../../Services/AuthService/auth.service';
// import { IRegisterStep1 } from '../../Interfaces/Account/IRegisterStep1';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { NgSelectModule } from '@ng-select/ng-select';

// @Component({
//   selector: 'app-register-step1',
//   templateUrl: './register-step1.html',
//   styleUrls: ['./register-step1.css'],
//   standalone: true,
//   imports: [FormsModule, CommonModule, NgSelectModule],
// })
// export class RegisterStep1Component {
//   // Password visibility toggles
//   showPassword = false;
//   showConfirmPassword = false;
//   isSubmitting = false;
//   showCategories = false;

//   allCategories = [
//     { id: 1, name: 'كهرباء' },
//     { id: 2, name: 'سباكة' },
//     { id: 3, name: 'نقاشة' },
//     { id: 4, name: 'نجارة' },
//   ];

//   // النموذج الرئيسي للتسجيل
//   model: IRegisterStep1 = {
//     email: '',
//     password: '',
//     confirmPassword: '',
//     ssn: '',
//     name: '',
//     birthDate: '',
//     address: '',
//     gender: '',
//     role: '',
//     pin: null,
//     startWorking: '',
//     endWorking: '',
//     description: '',
//     categories: [],
//   };

//   // حالة التحقق لكل حقل
//   validationState = {
//     name: false,
//     email: false,
//     password: false,
//     confirmPassword: false,
//     ssn: false,
//     birthDate: false,
//     address: false,
//     gender: false,
//     pin: false,
//     role: false,
//   };

//   // التحقق العام لصلاحية الفورم
//   get isFormValid(): boolean {
//     const {
//       name,
//       email,
//       password,
//       confirmPassword,
//       ssn,
//       birthDate,
//       address,
//       gender,
//       role,
//       categories,
//     } = this.model;
//     const pin = this.model.pin?.toString() ?? '';

//     return (
//       !!name &&
//       !!email &&
//       /^\S+@\S+\.\S+$/.test(email) && // تحقق من صحة الإيميل
//       !!password &&
//       password.length >= 6 &&
//       confirmPassword === password &&
//       /^\d{14}$/.test(ssn) && // رقم قومي من 14 رقم
//       !!birthDate &&
//       !!address &&
//       !!gender &&
//       pin.length >= 4 &&
//       pin.length <= 6 &&
//       !!role
//     );
//   }

//   // حالات عدم صحة كل حقل على حدة
//   get nameInvalid(): boolean {
//     return !this.model.name && this.validationState.name;
//   }

//   get emailInvalid(): boolean {
//     return (
//       (!this.model.email || !/^\S+@\S+\.\S+$/.test(this.model.email)) &&
//       this.validationState.email
//     );
//   }
//   get categoriesInvalid(): boolean {
//     return (
//       this.model.role === 'Technician' &&
//       (!this.model.categories || this.model.categories.length === 0) &&
//       this.validationState.role
//     );
//   }

//   get passwordInvalid(): boolean {
//     return (
//       (!this.model.password || this.model.password.length < 6) &&
//       this.validationState.password
//     );
//   }

//   get confirmPasswordInvalid(): boolean {
//     return (
//       this.model.confirmPassword !== this.model.password &&
//       this.validationState.confirmPassword
//     );
//   }

//   get ssnInvalid(): boolean {
//     return !/^\d{14}$/.test(this.model.ssn) && this.validationState.ssn;
//   }

//   get birthDateInvalid(): boolean {
//     return !this.model.birthDate && this.validationState.birthDate;
//   }

//   get addressInvalid(): boolean {
//     return !this.model.address && this.validationState.address;
//   }

//   get genderInvalid(): boolean {
//     return !this.model.gender && this.validationState.gender;
//   }

//   get pinInvalid(): boolean {
//     const pinStr = this.model.pin?.toString() ?? '';
//     const isInvalidLength = pinStr.length < 4 || pinStr.length > 6;
//     const isEmpty = pinStr.trim() === '';

//     return this.validationState.pin && (isEmpty || isInvalidLength);
//   }

//   get roleInvalid(): boolean {
//     return !this.model.role && this.validationState.role;
//   }

//   constructor(private authService: AuthService, private router: Router) {}

//   // تحديد أن المستخدم بدأ محاولة تعبئة الحقل
//   validateField(field: keyof typeof this.validationState): void {
//     this.validationState[field] = true;
//   }

//   // تنسيق الوقت مع الثواني
//   private formatTimeWithSeconds(time?: string): string | null {
//     if (!time?.trim()) return null;
//     return time.length === 5 ? time + ':00' : time; // مثل "14:30" تصبح "14:30:00"
//   }

//   // عند إرسال الفورم
//   submit(): void {
//     // فعّل التحقق لكل الحقول
//     Object.keys(this.validationState).forEach((key) => {
//       this.validationState[key as keyof typeof this.validationState] = true;
//     });

//     console.log('Submitted model:', this.model);

//     // لو النموذج غير صالح
//     if (!this.isFormValid) {
//       Swal.fire({
//         icon: 'error',
//         title: 'فشل التحقق',
//         text: 'من فضلك قم بتصحيح الحقول المظللة.',
//       });
//       return;
//     }

//     this.isSubmitting = true;

//     const cleanedModel = {
//       ...this.model,
//       startWorking: this.formatTimeWithSeconds(this.model.startWorking),
//       endWorking: this.formatTimeWithSeconds(this.model.endWorking),
//     };

//     // استدعاء API للتسجيل
//     this.authService.registerStep1(cleanedModel).subscribe({
//       next: (_) => {
//         this.isSubmitting = false;
//         Swal.fire({
//           icon: 'success',
//           title: 'تم إكمال الخطوة الأولى',
//           text: 'الآن انتقل إلى الخطوة الثانية.',
//         }).then(() => {
//           console.log('Submitted model:', this.model);

//           this.router.navigate(['/register-step2'], {
//             queryParams: { email: this.model.email },
//           });
//         });
//       },
//       error: (err) => {
//         this.isSubmitting = false;
//         console.error(err);
//         Swal.fire({
//           icon: 'error',
//           title: 'فشل في التسجيل',
//           text:
//             err?.error?.[0]?.description ?? 'حدث خطأ غير متوقع، حاول مرة أخرى.',
//         });
//       },
//     });
//   }

//   // التحقق من وجود الإيميل مسبقًا
//   emailExists: boolean | null = null;

//   checkEmailAvailability(email: string): void {
//     if (!email || !email.trim()) {
//       this.emailExists = null;
//       return;
//     }

//     this.authService.checkEmailExists(email).subscribe({
//       next: (exists) => {
//         this.emailExists = exists;
//       },
//       error: () => {
//         this.emailExists = null;
//       },
//     });
//   }
// }
////////////////////////////////////////////////
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../Services/AuthService/auth.service';
import { CategoryService } from '../../../Services/CategoryService/category-service';

import { IRegisterStep1 } from '../../../Interfaces/Account/IRegisterStep1';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-step1',
  templateUrl: './register-step1.html',
  styleUrls: ['./register-step1.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  encapsulation: ViewEncapsulation.None, // لتجنب مشاكل CSS
})
export class RegisterStep1Component {
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  showCategories = false;

  allCategories: string[] = [];

  model: IRegisterStep1 = {
    email: '',
    password: '',
    confirmPassword: '',
    ssn: '',
    name: '',
    birthDate: '',
    address: '',
    gender: '',
    role: '',
    pin: null,
    startWorking: '',
    endWorking: '',
    description: '',
    categories: [],
  };

  validationState = {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    ssn: false,
    birthDate: false,
    address: false,
    gender: false,
    pin: false,
    role: false,
  };

  get isFormValid(): boolean {
    const {
      name,
      email,
      password,
      confirmPassword,
      ssn,
      birthDate,
      address,
      gender,
      role,
    } = this.model;
    const pin = this.model.pin?.toString() ?? '';

    return (
      !!name &&
      !!email &&
      /^\S+@\S+\.\S+$/.test(email) &&
      !!password &&
      password.length >= 6 &&
      confirmPassword === password &&
      /^\d{14}$/.test(ssn) &&
      !!birthDate &&
      !!address &&
      !!gender &&
      pin.length >= 4 &&
      pin.length <= 6 &&
      !!role
    );
  }

  get categoriesInvalid(): boolean {
    return (
      this.model.role === 'Technician' &&
      (!this.model.categories || this.model.categories.length === 0) &&
      this.validationState.role
    );
  }

  get nameInvalid(): boolean {
    return !this.model.name && this.validationState.name;
  }

  get emailInvalid(): boolean {
    return (
      (!this.model.email || !/^\S+@\S+\.\S+$/.test(this.model.email)) &&
      this.validationState.email
    );
  }

  get passwordInvalid(): boolean {
    return (
      (!this.model.password || this.model.password.length < 6) &&
      this.validationState.password
    );
  }

  get confirmPasswordInvalid(): boolean {
    return (
      this.model.confirmPassword !== this.model.password &&
      this.validationState.confirmPassword
    );
  }

  get ssnInvalid(): boolean {
    return !/^\d{14}$/.test(this.model.ssn) && this.validationState.ssn;
  }

  get birthDateInvalid(): boolean {
    return !this.model.birthDate && this.validationState.birthDate;
  }

  get addressInvalid(): boolean {
    return !this.model.address && this.validationState.address;
  }

  get genderInvalid(): boolean {
    return !this.model.gender && this.validationState.gender;
  }

  get pinInvalid(): boolean {
    const pinStr = this.model.pin?.toString() ?? '';
    const isInvalidLength = pinStr.length !== 4;
    const isEmpty = pinStr.trim() === '';

    return this.validationState.pin && (isEmpty || isInvalidLength);
  }

  get roleInvalid(): boolean {
    return !this.model.role && this.validationState.role;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        if (res.success && Array.isArray(res.data)) {
          this.allCategories = res.data.map((c: any) => c.name);
        } else {
          this.allCategories = [];
        }
      },
      error: (err) => {
        console.error('Error loading categories', err);
        Swal.fire('خطأ', 'تعذر تحميل التصنيفات', 'error');
      },
    });
  }

  validateField(field: keyof typeof this.validationState): void {
    this.validationState[field] = true;
  }

  private formatTimeWithSeconds(time?: string): string | null {
    if (!time?.trim()) return null;
    return time.length === 5 ? time + ':00' : time;
  }

  submit(): void {
    Object.keys(this.validationState).forEach((key) => {
      this.validationState[key as keyof typeof this.validationState] = true;
    });

    if (!this.isFormValid) {
      Swal.fire({
        icon: 'error',
        title: 'فشل التحقق',
        text: 'من فضلك قم بتصحيح الحقول المظللة.',
      });
      return;
    }

    this.isSubmitting = true;

    let cleanedModel: any = {
      email: this.model.email,
      password: this.model.password,
      confirmPassword: this.model.confirmPassword,
      ssn: this.model.ssn,
      name: this.model.name,
      birthDate: this.model.birthDate,
      address: this.model.address,
      gender: this.model.gender,
      role: this.model.role,
      pin: this.model.pin,
    };

    if (this.model.role === 'Technician') {
      cleanedModel = {
        ...cleanedModel,
        categories: this.model.categories,
        description: this.model.description,
        startWorking: this.formatTimeWithSeconds(this.model.startWorking),
        endWorking: this.formatTimeWithSeconds(this.model.endWorking),
      };
    }

    this.authService.registerStep1(cleanedModel).subscribe({
      next: (_) => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'تم إكمال الخطوة الأولى',
          text: 'الآن انتقل إلى الخطوة الثانية.',
        }).then(() => {
          this.router.navigate(['/register-step2'], {
            queryParams: { email: this.model.email },
          });
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'error',
          title: 'فشل في التسجيل',
          text:
            err?.error?.[0]?.description ?? 'حدث خطأ غير متوقع، حاول مرة أخرى.',
        });
      },
    });
  }

  emailExists: boolean | null = null;

  checkEmailAvailability(email: string): void {
    if (!email || !email.trim()) {
      this.emailExists = null;
      return;
    }

    this.authService.checkEmailExists(email).subscribe({
      next: (exists) => {
        this.emailExists = exists;
      },
      error: () => {
        this.emailExists = null;
      },
    });
  }

  toggleCategoryList() {
    this.showCategories = !this.showCategories;
  }

  toggleCategory(category: string) {
    const index = this.model.categories.findIndex((c) => c === category);
    if (index > -1) {
      this.model.categories.splice(index, 1);
    } else {
      this.model.categories.push(category);
    }
  }

  isSelected(category: string): boolean {
    return this.model.categories.includes(category);
  }

  removeCategory(cat: string) {
    this.model.categories = this.model.categories.filter((c) => c !== cat);
  }
}
