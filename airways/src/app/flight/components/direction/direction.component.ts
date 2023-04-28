import { Component, Input } from '@angular/core';
import { SearchParams } from '../../models/flight.models';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss'],
})
export class DirectionComponent {
  @Input() searchParams!: SearchParams;
}
