import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class ChatbotService {
  private http = inject(HttpClient);

  get(prompt: string) {
    return this.http.get<string>(
      `${environment.apiURLChatBot}/rag?query=${prompt}`,
      {
        responseType: "text" as "json",
      },
    );
  }

  getQCM(prompt: string) {
    return this.http.get<any>(`${environment.apiURLChatBot}/ragQcm?query=${prompt}`);
  }

  postFile(formData: FormData) {
    return this.http.post<any>(`${environment.apiURLChatBot}/addPDF`, formData);
  }
}
