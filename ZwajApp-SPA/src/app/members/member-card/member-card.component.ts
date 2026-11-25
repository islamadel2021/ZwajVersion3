import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  imports: [RouterLink],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User | undefined;

  constructor() {}

  ngOnInit() {}
}
