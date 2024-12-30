import { Injectable } from '@angular/core';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private speechConfig: sdk.SpeechConfig;
  private audioConfig: sdk.AudioConfig;
  private recognizer: sdk.SpeechRecognizer;

  constructor() {
    // Replace with your own subscription key and region
    this.speechConfig = sdk.SpeechConfig.fromSubscription('ba7908821ca2433d90e6d31425e63eee', 'eastus');
    this.audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    this.recognizer = new sdk.SpeechRecognizer(this.speechConfig, this.audioConfig);
  }

  recognizeSpeech(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.recognizer.recognizeOnceAsync(result => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          resolve(result.text);
        } else {
          reject(result.errorDetails);
        }
      });
    });
  }
}
