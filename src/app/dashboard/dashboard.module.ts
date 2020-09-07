import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { SidebarComponent } from './shared-components/sidebar/sidebar.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TasksComponent } from './dashboard-home/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { StatsComponent } from './dashboard-home/stats/stats.component';
import { ProviderComponent } from './provider/provider.component';
import { SharedModule } from './../shared/shared.module';
import { PostListComponent } from './post/post-list.component';
import { PostComponent } from './post/post/post.component';
import { PaginationModule } from './../shared/components/pagination/pagination.module';
import { ProviderListComponent } from './post/post/provider-list/provider-list.component';
import { TaskConfirmationDialogComponent } from './post/post/task-confirmation-create/task-confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    DashboardHomeComponent,
    TasksComponent,
    StatsComponent,
    ProviderComponent,
    PostListComponent,
    PostComponent,
    ProviderListComponent,
    TaskConfirmationDialogComponent
  ],
  exports:[SharedModule]
})
export class DashboardModule { }
