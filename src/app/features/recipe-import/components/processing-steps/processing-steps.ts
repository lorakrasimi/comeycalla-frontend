import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-processing-steps',
  standalone: true,
  templateUrl: './processing-steps.html',
  styleUrl: './processing-steps.scss',
})
export class ProcessingSteps {
  readonly currentStep = signal(0);

  constructor() {
    setTimeout(() => this.currentStep.set(1), 700);
    setTimeout(() => this.currentStep.set(2), 1400);
    setTimeout(() => this.currentStep.set(3), 2100);
  }

  isCompleted(step: number): boolean {
    return this.currentStep() >= step;
  }
}
