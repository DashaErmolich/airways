import { Component } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';
import { MatIconService } from '../../services/icon.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(
    public layout: LayoutService,
    private matIconService: MatIconService,
  ) { }
}
