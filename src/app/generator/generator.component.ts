import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { StringGenerator } from '../app.component';


@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent {

  @Input() stringList: StringGenerator[] = []
  title = 'StrGenerator';
  str = "New strings is here";
  open = true;
  btnText = "Start";
  showText = "Hide log";
  isRuning = false;
  startClick = true;
  subs: any;
  color = 'black';
  timer: string = '';
  bonusText = 'Here you can see your bonus';
  allChar: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; //comment this for tests
  // allChar: string = 'aaaaaa'; //uncomment this for test palindroms cases
  // allChar: string = '0123456789';  //uncomment this for test '0' and all numbers cases

  generator(){
    this.isRuning = true;
    this.subs = interval(3000).subscribe(n=>{
      this.timer = String(n*3) + ' s';
      this.str = '';
      this.color = 'black';
      for(let i=1; i<=5; i++){
        this.str = this.str + this.allChar.charAt(Math.floor(Math.random()*this.allChar.length))
      }
      this.str = this.checkStr(this.str);
      if(this.str === 'Х_Х') return;
      this.stringList.push({time: this.timer, string: this.str, bonus: this.bonusText, color: this.color})
    })
  }

  checkStr(str:any){
    for (let i = 0; i < str.length; i++) {
      if(str.charAt(i)=='0'){
        this.bonusText = 'You out of Luck. Here 0'
        return  'Х_Х'
      }
    }
    if(!isNaN(+str)){
      this.color = 'blue';
      this.bonusText = 'All this char is numbers'
      return str
    }
    if (str.split('').reverse().join('') === str) {
      this.color = 'red';
      this.bonusText = 'Its palindrome!'
      return str
      }
    this.bonusText = 'Just a simple random text'
    return str;
    }


  start(){
    if(this.startClick){
      this.btnText = "Stop";
      this.generator();
    }
    if(!this.startClick){
      if(this.isRuning){
        this.subs.unsubscribe();
      }
      this.isRuning = false;
      this.color = 'black';
      this.bonusText = 'Here you can see your bonus'
      this.btnText = "Start";
      this.str = "New strings is here";
    }
    this.startClick = !this.startClick
    
  }
  showList(){
    if(this.open)this.showText = "Show log";
    if(!this.open)this.showText = "Hide log";
    this.open = !this.open;
  }
  clearList(){
    this.stringList = [];
  }

}
