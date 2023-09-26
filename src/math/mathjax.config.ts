import { Injectable } from '@angular/core';

declare const MathJax: {
  Hub: {
    Queue: (queue: any[]) => void;
    Config: (config: any) => void;
  };
};

@Injectable({
  providedIn: 'root',
})
export class MathJaxService {
  constructor() {
    this.loadMathJax();
  }

  private loadMathJax() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      this.typesetMath();
      this.configureMathJax();
    }
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
    document.head.appendChild(script);
  }

  public typesetMath() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }


  private configureMathJax() {
    MathJax.Hub.Config({
      showMathMenu: false,
      tex2jax: { inlineMath: [["$", "$"]],displayMath:[["$$", "$$"]] },
      menuSettings: { zoom: "Double-Click", zscale: "150%" },
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } }
    });
  }


}

