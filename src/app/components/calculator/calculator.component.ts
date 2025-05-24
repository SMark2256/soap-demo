import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculatorApiService } from '../../services/calculator-api.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  title = 'Calculator';

  operation: 'add' | 'subtract' | 'multiply' | 'divide' = 'add';

  form: FormGroup = new FormGroup({
    firstNumber: new FormControl(0, [Validators.required]),
    secondNumber: new FormControl(0, [Validators.required]),
    operation: new FormControl(this.operation, [Validators.required]),
  });

  constructor(public calculatorService: CalculatorApiService) {}

  async calculate() {
    const { firstNumber, secondNumber, operation } = this.form.value;

    if (operation === 'divide' && secondNumber === 0) {
      this.calculatorService.error.set('Division by zero is not allowed');
      return;
    }

    await firstValueFrom(this.calculatorService.calculate(firstNumber, secondNumber, operation))
  }
}
