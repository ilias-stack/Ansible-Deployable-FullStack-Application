import { Component } from "@angular/core";
import { SafePipe } from "safe-pipe";
@Component({
  selector: "app-surgery",
  standalone: true,
  imports: [SafePipe],
  templateUrl: "./surgery.component.html",
  styleUrl: "./surgery.component.css",
})
export class SurgeryComponent {
  models = [
    {
      thumbnail:
        "https://media.sketchfab.com/models/d3fda2a0b8d24a04b7bc4ce2d7827480/thumbnails/5b14da6fa27943c9a890d3f6854f75e4/213a716bc8cf48778153e13a59a8c994.jpeg",
      title: "Bicuspid Aortic Valve",
      sketchfabID: "d3fda2a0b8d24a04b7bc4ce2d7827480",
    },
    {
      thumbnail:
        "https://media.sketchfab.com/models/4d3e3c9a3dd84b69a0a179f92be1c9aa/thumbnails/bf5777d36e5e4545bb0fb81af66dfeb5/8d33cca26fd341b7991631aea8663fb1.jpeg",
      title: "Coronary Fistula Blood Volume",
      sketchfabID: "4d3e3c9a3dd84b69a0a179f92be1c9aa",
    },
    {
      thumbnail:
        "https://media.sketchfab.com/models/10d22e2e5d934d5eb5a2b728fdd9488f/thumbnails/33189c3d241a4954909f694da90a05aa/94a4f0296cbd43bfb0135b760d896ba2.jpeg",
      title: "Tetralogy of Fallot 2018002-01",
      sketchfabID: "10d22e2e5d934d5eb5a2b728fdd9488f",
    },
    {
      thumbnail:
        "https://media.sketchfab.com/models/2445071000744fa1a9eb3ca5288f2e41/thumbnails/358acfd90dd54b729f44ee1c7c5385b0/cc644be6a123488c853a14b83f0fb5c3.jpeg",
      title: "Marfan's syndrome. Aortic root, diastole",
      sketchfabID: "2445071000744fa1a9eb3ca5288f2e41",
    },
    {
      thumbnail:
        "https://media.sketchfab.com/models/eac2f67044044cd09dd22aec2a55366f/thumbnails/93cf56d238314bdaac6cd5aff5f03af0/5dabbcba41ea45df87e09d019fe910d3.jpeg",
      title: "Intra-cardiac Fontan 2018001-01",
      sketchfabID: "eac2f67044044cd09dd22aec2a55366f",
    },
    {
      thumbnail:
        "https://media.sketchfab.com/models/ce808362388e460f8ac1a36c4b5696d6/thumbnails/ad07bb9cf4fb4cac871dd0fd8005c6c8/cacf326ca5ce4c3dad9fe28334b4a119.jpeg",
      title:
        "2018004-01 D-TGA (AV concordance; VA discordance) post Mustardrepair. Large leak between IVC and pulmonary venous baffle. 35 y.",
      sketchfabID: "ce808362388e460f8ac1a36c4b5696d6",
    },
    {
      thumbnail:
        "https://media.sketchfab.com/models/fb3e47ca23f64a0e8c3453555c9bef23/thumbnails/3036ab62e4cb462792ffb9f26e43d5ec/bba5e316fd434ae198ff051904326cb6.jpeg",
      title: "Complex Pseudoaneurysm of Right Coronary Artery",
      sketchfabID: "fb3e47ca23f64a0e8c3453555c9bef23",
    },
    {
      thumbnail:
        "https://media.sketchfab.com/models/18e207b5fb99421897b72f205f5ead60/thumbnails/0b3df9aa345d4847ba75af571b1f84b5/f97d36e65063479aa59c6b977dc5eb79.jpeg",
      title: "CCTGA w/Leads",
      sketchfabID: "18e207b5fb99421897b72f205f5ead60",
    },
    {
      thumbnail:
        "https://media.sketchfab.com/models/ede911c05c4a4e6a9493c849513ff124/thumbnails/819f9ebc19944bfc98da7fb6fac4ac06/e623981c7e6e470898d8fd6a8545bcf0.jpeg",
      title: "Yasui Repair",
      sketchfabID: "ede911c05c4a4e6a9493c849513ff124",
    },
    {
      thumbnail:
        "https://media.sketchfab.com/models/c3b38921d5134584869195ab86648d30/thumbnails/210e9093725946149abda355d6fbe740/8080bbd0ef344ff1baa5d6f8eac571f4.jpeg",
      title: "Coarctation Pre-Surgical Repair #1",
      sketchfabID: "c3b38921d5134584869195ab86648d30",
    },
    {
      thumbnail:
        "https://media.sketchfab.com/models/a0ee60f8c3f34c90a69b23aa46e58301/thumbnails/4c8c2592a2344d65afbe8c6bbeac87d5/2855a0163b5e4417a80695342322d1ef.jpeg",
      title: "Coarctation Post-Surgical Repair #1",
      sketchfabID: "a0ee60f8c3f34c90a69b23aa46e58301",
    },
  ];

  activeModel = {
    thumbnail: "",
    title: "",
    sketchfabID: "",
  };

  truncate(str: string, n: number) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  getEmbedUrl(sketchfabID: string) {
    return `https://sketchfab.com/models/${sketchfabID}/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_ar=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_theatre=1&amp;ui_watermark=0`;
  }
}
