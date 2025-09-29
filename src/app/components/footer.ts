import { Component } from '@angular/core';

@Component({
  selector: 'bw-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();
}


