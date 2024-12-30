import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavLink } from '../models/nav-link';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private router = inject(Router);
  private auth = inject(AuthService);
  filteredNavLinks: NavLink[] = [];
  navLinks: NavLink[] = [
    {
      icon: "ri-lungs-fill",
      label: "Anatomy",
      role: "student",
      path: "anatomy",
    },
    {
      icon: "ri-heart-pulse-fill",
      label: "Surgery",
      role: "student",
      path: "surgery",
    },
    {
      icon: "ri-robot-2-fill",
      label: "Chatbot",
      role: "all",
      path: "chatbot",
    },
  ];
  ngOnInit(): void {
    this.filteredNavLinks = this.getFilteredNavLinks();
  }
  handleSignOut(): void {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getFilteredNavLinks() {
    const userRole = this.auth.getUserRole();
    return this.navLinks.filter(link => link.role === userRole || link.role === 'all');
  }
}


