import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatStorageService } from '../chat-storage.service';
import { FetchanswerService } from '../fetchanswer.service';
import { ScrollToBottomDirective } from '../scroll-to-bottom.directive';

// import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mainchat',
  templateUrl: './mainchat.component.html',
  styleUrls: ['./mainchat.component.scss'],

})

export class MainchatComponent implements OnInit {
  @ViewChild(ScrollToBottomDirective)
  scroll!: ScrollToBottomDirective;
  // messages: { message: string, type: string }[] = [
  //   { message: "Hello Tell me about the Tamil language", type: "user" },
  //   { message: "Hi i'm Bot", type: "bot" },
  //   { message: "Good Morning", type: "user" },
  //   { message: "Here chicken smell varuthula!", type: "bot" }
  // ];
  messages: { message: string; type: string }[] = [];
  chatForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private chatStorage: ChatStorageService,private getAnswer :FetchanswerService) {
    this.chatForm = this.formBuilder.group({
      userInput: new FormControl(null, Validators.required),
    });
  }
  ngOnInit(): void {
    // localStorage.clear();
    this.messages = this.chatStorage.getMessages();
  }



  sendMessage() {
    const userInputControl = this.chatForm.get('userInput');
    if (userInputControl) {
      const userInput = userInputControl.value;
      if (userInput) {

          const formJson=new FormData();
          formJson.append("question",userInput);
          this.messages.push({ type: 'user', message: userInput });

          let answerforQs="";
          this.getAnswer.getAnswerForQs(formJson).subscribe(
            (data) => {
              if(data.body.answer!=null){
                answerforQs=data.body.answer;
              }
              console.log(answerforQs);
              this.messages.push({type:"bot",message:answerforQs});
              this.chatStorage.saveMessages(this.messages);
            },
            (err) => {
              console.log(err);
              this.chatStorage.saveMessages(this.messages);
            }
          );
        this.chatForm.reset();
      }
    }
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.messages.push({ type: 'image', message: e.target.result });
      }
      reader.readAsDataURL(inputElement.files[0]);

      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('image', file);
      let answerforQs="";
      this.getAnswer.getAnswerForQs(formData).subscribe(
        (data) => {
          if(data.body.answer!=null){
            answerforQs=data.body.answer;
          }
          console.log("->",answerforQs);
          this.messages.push({type:"bot",message:answerforQs});
          this.chatStorage.saveMessages(this.messages);
        },
        (error) => {
          this.chatStorage.saveMessages(this.messages);
        }
      );
      this.chatForm.reset();
    }
  }


}
