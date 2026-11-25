import { Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { MemberlistsComponent } from './members/memberlists/memberlists.component';
import { authGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.Resolver';
import { MemberListResolver } from './_resolvers/member-list.Resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.Resolver';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'members',
    component: MemberlistsComponent,
    canActivate: [authGuard],
    resolve: {
      users: MemberListResolver,
    },
  },
  {
    path: 'member/edit',
    component: MemberEditComponent,
    canActivate: [authGuard],
    resolve: {
      user: MemberEditResolver,
    },
    canDeactivate: [preventUnsavedChangesGuard],
  },
  {
    path: 'members/:id',
    component: MemberDetailComponent,
    canActivate: [authGuard],
    resolve: {
      user: MemberDetailResolver,
    },
  },

  { path: 'lists', component: ListsComponent, canActivate: [authGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
