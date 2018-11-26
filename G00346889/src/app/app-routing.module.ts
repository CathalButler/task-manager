import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importted Components
import { ViewComponent } from './view/view.component';
import { CompletedComponent } from './completed/completed.component';
import { EditComponent } from './edit/edit.component';
import { TodayComponent } from './today/today.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
  },
  {
    path: 'completed',
    component: CompletedComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'today',
    component: TodayComponent,
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
