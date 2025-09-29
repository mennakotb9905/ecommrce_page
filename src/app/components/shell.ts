import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header';
import { FooterComponent } from '../components/footer';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'bw-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './shell.html',
  styleUrls: ['./shell.css'],
  animations: [
    trigger('routeFade', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(16px)' })
          ], { optional: true }),
          query(':leave', [
            animate('200ms ease', style({ opacity: 0, transform: 'translateY(-8px)' }))
          ], { optional: true })
        ]),
        query(':enter', [
          animate('360ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class ShellComponent {}


