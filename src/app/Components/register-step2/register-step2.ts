import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-step2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-step2.html',
})
export class RegisterStep2Component {
  email: string = '';

  identityImage!: File;
  faceImage!: File;

  identityPreview: string | null = null;
  facePreview: string | null = null;

  triedSubmit: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }

  onFileSelected(event: any, type: 'identity' | 'face') {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'error',
        title: 'ملف غير صالح',
        text: 'يرجى اختيار صورة صالحة.',
      });
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      Swal.fire({
        icon: 'error',
        title: 'حجم الصورة كبير',
        text: 'الحد الأقصى للصورة هو 5 ميجا.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'identity') {
        this.identityImage = file;
        this.identityPreview = reader.result as string;
      } else {
        this.faceImage = file;
        this.facePreview = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  submit() {
    this.triedSubmit = true;

    if (!this.identityImage || !this.faceImage) {
      Swal.fire({
        icon: 'error',
        title: 'الصور مطلوبة',
        text: 'يرجى رفع صورة البطاقة وصورة الوجه معًا.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('identityImage', this.identityImage);
    formData.append('faceImage', this.faceImage);

    Swal.fire({
      title: '....جاري التحقق',
      text: 'يتم الآن التحقق من هويتك. قد يستغرق هذا بعض الوقت.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.authService.registerStep2(formData).subscribe({
      next: (_) => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'تم التسجيل بنجاح',
          text: 'يمكنك الآن تسجيل الدخول.',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        Swal.close();
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'فشل التحقق',
          text:
            err?.error?.[0]?.description ??
            'حدث خطأ أثناء التحقق، حاول لاحقًا.',
        });
      },
    });
  }
}
