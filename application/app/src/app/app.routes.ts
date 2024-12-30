import { Routes } from "@angular/router";
import { AnatomyComponent } from "./components/anatomy/anatomy.component";
import { SurgeryComponent } from "./components/surgery/surgery.component";
import { BrainComponent } from "./components/brain/brain.component";
import { ChatbotComponent } from "./components/chatbot/chatbot.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./home/home.component";
import { authGuard } from "./core/guard/auth.guard";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "anatomy",
        component: AnatomyComponent,
      },
      {
        path: "surgery",
        component: SurgeryComponent,
      },
      {
        path: "brain",
        component: BrainComponent,
      },
      {
        path: "chatbot",
        component: ChatbotComponent,
      }
    ],
  },
  {
    path: "login",
    component: LoginComponent
  }
];
