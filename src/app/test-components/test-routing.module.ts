import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router'; 

import { TestComponent } from './test.component';
import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { TestInfoComponent } from './test-info/test-info.component';
import { TestResultsComponent } from './test-results/test-results.component';

import { TestQuestionGuard } from './test-questions/can-activate.guard';
import { TestResultsGuard } from './test-results/test-results.guard';
import { CanDeactivateGuard } from './test-questions/can-deactivate.guard';
import { AnswersReviewComponent } from './test-results/answers-review/answers-review.component';


const routes: Route[] = [
  { path: '', component: TestComponent },
  { path: 'info/:testId', component: TestInfoComponent },
  { 
    path: 'session:testId/:questionId', 
    component: TestQuestionsComponent,
    // canActivate: [TestQuestionGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  { 
    path: 'results', 
    component: TestResultsComponent,
    canActivate: [TestResultsGuard]
  },
  { 
    path: 'results/review', 
    component: AnswersReviewComponent,
    canActivate: [TestResultsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard],
})
export class TestRoutingModule { }
