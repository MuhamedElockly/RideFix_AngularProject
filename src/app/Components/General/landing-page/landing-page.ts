import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LandingNavComponent } from '../landing-nav/landing-nav';
import { AnimationService } from '../../../Services/AnimationService/animation.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, LandingNavComponent],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPageComponent implements OnInit {
  constructor(
    private router: Router,
    private animationService: AnimationService
  ) {}

  ngOnInit(): void {
    // Initialize animations after view is loaded
    setTimeout(() => {
      this.animationService.addFadeInClass();
      this.animationService.initScrollAnimations();
    }, 100);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register-step1']);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
