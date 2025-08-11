import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../Services/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-step2',
  standalone: true,
  templateUrl: './register-step2.html',
  styleUrls: ['./register-step2.css'],
  imports: [CommonModule, FormsModule],
})
export class RegisterStep2Component implements OnDestroy {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;

  email: string = '';
  stream: MediaStream | null = null;
  showCamera: boolean = false;
  cameraTarget: 'identity' | 'face' | null = null;
  isSubmitting = false;

  identityImage!: File;
  faceImage!: File;

  identityPreview: string | null = null;
  facePreview: string | null = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }

  openCamera(type: 'identity' | 'face') {
    this.cameraTarget = type;
    this.showCamera = true;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.stream = stream;
        if (this.videoElement?.nativeElement) {
          this.videoElement.nativeElement.srcObject = stream;
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'فشل في تشغيل الكاميرا',
          text: 'يرجى السماح باستخدام الكاميرا من إعدادات المتصفح.',
        });
      });
  }

  captureImage() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], `${this.cameraTarget}.jpg`, {
        type: 'image/jpeg',
      });
      const previewUrl = URL.createObjectURL(blob);

      if (this.cameraTarget === 'identity') {
        this.identityImage = file;
        this.identityPreview = previewUrl;
      } else if (this.cameraTarget === 'face') {
        this.faceImage = file;
        this.facePreview = previewUrl;
      }

      this.stopCamera();
    }, 'image/jpeg');
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.showCamera = false;
    this.cameraTarget = null;
  }

  closeCamera() {
    this.stopCamera();
  }

  submit() {
    if (!this.identityImage || !this.faceImage) {
      Swal.fire({
        icon: 'error',
        title: 'الصور مطلوبة',
        text: 'يرجى التقاط صورة البطاقة وصورة الوجه.',
      });
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('Email', this.email); // ✅ Uppercase E
    formData.append('IdentityImage', this.identityImage); // ✅ Exact match
    formData.append('FaceImage', this.faceImage); // ✅ Exact match

    this.authService.registerStep2(formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'تم التسجيل بنجاح',
          text: 'يمكنك الآن تسجيل الدخول.',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'error',
          title: 'فشل التحقق',
          text: err?.error?.[0]?.description || 'حدث خطأ أثناء التحقق.',
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }
}
