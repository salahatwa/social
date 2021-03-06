import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../shared/services/common.service';
import { User } from './../../../shared/models/models';
import { UserService } from './../../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUser: User;

  constructor(public cmnSrv: CommonService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigate(['/auth']);
  }

  sidebarItems = [
    { link: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { link: '/dashboard/social-account', label: 'Accounts', icon: 'dashboard' },
    { link: '/dashboard/posts', label: 'Posts', icon: 'date_range' },

    // {
    //   label: 'Components', icon: 'apps', subItem: [
    //     { link: '/post/publish', label: 'buttons', icon: 'b' },
    //     { link: '/components/grids', label: 'grid System', icon: 'gs' },
    //     { link: '/components/panels', label: 'panels', icon: 'p' },
    //     { link: '/components/alerts', label: 'alerts', icon: 'a' },
    //     { link: '/components/notifications', label: 'notifications', icon: 'n' },
    //     { link: '/components/icons', label: 'icons', icon: 'i' },
    //     { link: '/components/typography', label: 'typography', icon: 't' },
    //   ]
    // },

    // {
    //   label: 'Forms', icon: 'ballot', subItem: [
    //     { link: '/forms/basic', label: 'basic form', icon: 'bf' },
    //     { link: '/forms/advance', label: 'advanced form', icon: 'af' },
    //     { link: '/forms/custom', label: 'custom form', icon: 'cf' },
    //     { link: '/forms/validations', label: 'Form Validation', icon: 'fv' }
    //   ]
    // },
    // {
    //   label: 'Pages', icon: 'pages', subItem: [
    //     { link: '/pages/notfound', label: 'Not Found', icon: 'nf' },
    //     { link: '/pages/auth', label: 'Auth', icon: 'A' }
    //   ]
    // },
    // {
    //   label: 'Tables', icon: 'grid_on', subItem: [
    //     { link: '/tables/basic', label: 'Basic Table', icon: 'BT' },
    //     { link: '/tables/smart', label: 'smart table', icon: 'ST' }
    //   ]
    // },
    // { link: '/charts', label: 'Charts', icon: 'show_chart' },
    // { link: '/maps', label: 'Maps', icon: 'place' },
    // { link: '/editors', label: 'Editors', icon: 'edit' },
    // { link: '/calendar', label: 'Calendar', icon: 'date_range' },
    // {
    //   label: 'Menu', icon: 'menu', subItem: [
    //     { link: 'void()', label: 'Sub Menu L1', icon: 'l1' },
    //     {
    //       label: 'Sub Menu L1', icon: 'l1', subItem: [
    //         { link: 'void()', label: 'Sub Menu L2', icon: 'l2' },
    //         { link: 'void()', label: 'Sub Menu L2', icon: 'l2' },
    //       ]
    //     },
    //   ]
    // }
  ];

}
