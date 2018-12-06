import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DeptComponent } from '../dept/dept.component';
import { DocComponent } from '../doc/doc.component';
import { EmpComponent } from '../emp/emp.component';
import { NoteComponent } from '../note/note.component';
import { OrgChartComponent } from '../org-chart/org-chart.component';
import { MainComponent} from '../main/main.component';

import { DocIngComponent } from '../doc/doc-ing/doc-ing.component';
import { DocEndComponent } from '../doc/doc-end/doc-end.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'dept', component: DeptComponent },
  { path: 'doc', component: DocComponent },
  { path: 'emp', component: EmpComponent },
  { path: 'note', component: NoteComponent },
  { path: 'org-chart', component: OrgChartComponent },
  { path: 'doc/docIng', component: DocIngComponent },
  { path: 'doc/docEnd', component: DocEndComponent }
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
