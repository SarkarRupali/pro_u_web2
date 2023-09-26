import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MathJaxService } from './mathjax.config';

@Component({
  selector: 'app-math-render',
  template: '<div [innerHTML]="mathContent"></div>',
})
export class MathRenderComponent implements OnChanges {
  @Input() mathExpression: any;
  mathContent: any;

  constructor(private mathJaxService: MathJaxService) { }

  ngOnChanges(changes: any): void {

    if (changes.mathExpression) {
      console.log('Enter')
      this.mathContent = this.mathExpression;
      this.mathJaxService.typesetMath();

      console.log('mathContent', this.mathContent)
    }
  }
}