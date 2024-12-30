import { Component } from "@angular/core";

@Component({
  selector: "app-brain",
  standalone: true,
  imports: [],
  templateUrl: "./brain.component.html",
  styleUrl: "./brain.component.css",
})
export class BrainComponent {
  MRIFile: File | null = null;
  previewSrc: string | ArrayBuffer | null | undefined = null;
  loadingFile = false;
  tumorDetected: boolean | null = null;

  async uploadImage(event: any) {
    this.reset();

    const target = event.target as HTMLInputElement;
    if (!target.files?.length) {
      return;
    }

    this.loadingFile = true;

    // Wait for a few seconds before attaching the file
    await new Promise((resolve) => setTimeout(resolve, 3000));
    this.MRIFile = target.files?.item(0) || null;

    // Preview the image
    if (this.MRIFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewSrc = e.target?.result;
      };
      reader.readAsDataURL(this.MRIFile);
    }

    this.loadingFile = false;
    await this.detectTumor();
  }

  async detectTumor() {
    this.tumorDetected = Math.random() > 0.5;
  }

  reset() {
    this.MRIFile = null;
    this.previewSrc = null;
    this.tumorDetected = null;
  }
}
