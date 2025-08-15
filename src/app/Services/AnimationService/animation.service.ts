import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor() { }

  /**
   * Initialize scroll animations for elements with 'fade-in' class
   */
  initScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
  }

  /**
   * Add fade-in class to elements for animation
   */
  addFadeInClass(): void {
    const elements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .step');
    elements.forEach((el, index) => {
      el.classList.add('fade-in');
      // Add staggered delay for better visual effect
      (el as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }

  /**
   * Smooth scroll to element
   */
  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
