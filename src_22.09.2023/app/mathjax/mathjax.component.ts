import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { GlbalServiceService } from '../services/glbal-service.service';
@Component({
  selector: 'mathjax',
  templateUrl: './mathjax.component.html',
  styleUrls: ['./mathjax.component.css']
})
export class MathjaxComponent implements OnInit {
  @Input() content: any;
  mathJaxObject: any

  constructor(public gs: GlbalServiceService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      // console.log("content chnaged")
      this.renderMath()
    }
  }

  renderMath() {
    // console.log("render math")
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

    this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];
    //setInterval(()=>{},1) 
    let angObj = this;
    // setTimeout(()=>{
    console.log("1234")
    angObj.mathJaxObject.Hub.Queue(["Typeset", angObj.mathJaxObject.Hub], 'mathContent');

    // },1000)
  }
  loadMathConfig() {
    console.log("load config")

    this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: { inlineMath: [["$", "$"], ["\\(", "\\)"]] },
      menuSettings: { zoom: "Double-Click", zscale: "150%" },
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } }
    });
  }

  ngOnInit() {

    this.loadMathConfig()
    this.renderMath();

  }
}