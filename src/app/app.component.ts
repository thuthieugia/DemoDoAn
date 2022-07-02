import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { get, lowerCase, map, includes } from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showLayout = false;
  isCollapsed = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLayout =
          this.activatedRoute.firstChild?.snapshot.data['showLayout'] !== false;
      }
    });
  }
  visible: boolean = false;

  clickMe(): void {
    this.visible = false;
  }
  canShow(roles: string[]): boolean {
    const convertRoles = map(roles, lowerCase);
    const userRole = lowerCase(
      get(JSON.parse(localStorage.getItem('user') || '{}'), 'permission', '')
    );
    return includes(convertRoles, userRole);
  }
  change(value: boolean): void {
    console.log(value);
  }
}
