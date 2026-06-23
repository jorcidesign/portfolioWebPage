'use client';

import { useRef, useEffect } from 'react';
import styles from './AtomHoverReveal.module.scss';

interface AtomHoverRevealProps {
  srcA: string;
  srcB: string;
}

const VERTEX_SHADER = `
attribute vec2 a;
varying vec2 vU;
void main(){vU=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0,1);}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vU;
uniform sampler2D uA,uB;
uniform vec2 uM;
uniform float uT,uSz,uSt,uSw,uGr,uReveal,uAsp,uAspA,uAspB;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.1+vec2(1.7,9.2);a*=.5;}
  return v;
}

vec2 coverUV(vec2 uv,float ca,float ia){
  if(ca>ia){return vec2(uv.x,(uv.y-.5)*(ia/ca)+.5);}
  return vec2((uv.x-.5)*(ca/ia)+.5,uv.y);
}

void main(){
  vec2 uv=vU;
  vec2 asp=vec2(uAsp,1.);
  vec2 mu=uM;
  vec2 d=(uv-mu)*asp;
  float dist=length(d);
  float t=uT*.3;
  float ang=atan(d.y,d.x);
  float swirl=uSw*.002*exp(-dist*3.)*sin(ang*3.+t*2.);
  vec2 swirlOff=vec2(cos(ang+swirl),sin(ang+swirl))*dist-d;
  vec2 wUv=(uv+swirlOff*.25)*3.+t*.15;
  float warp=fbm(wUv)*.22+fbm(wUv*2.1-t*.1)*.10;
  float grainN=fbm(uv*18.+t*.5);
  float grainEdge=uGr*.008*grainN;
  float sz=uSz*.001;
  float r=sz;
  float edge=0.04+warp*.5+grainEdge;
  float raw=dist-warp-grainEdge;
  float mask=smoothstep(r,r-edge,raw)*uReveal;
  mask=clamp(mask,0.,1.);
  mask=pow(mask,1./(uSt*.05+.01));
  vec4 colA=texture2D(uA,coverUV(uv,uAsp,uAspA));
  vec4 colB=texture2D(uB,coverUV(uv,uAsp,uAspB));
  gl_FragColor=mix(colA,colB,mask);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function AtomHoverReveal({ srcA, srcB }: AtomHoverRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    mouse: { x: 0.5, y: 0.5 },
    lerpM: { x: 0.5, y: 0.5 },
    reveal: 0,
    targetReveal: 0,
    isHover: false,
    returnTimer: null as ReturnType<typeof setTimeout> | null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;
    const g = gl;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        g.viewport(0, 0, w, h);
      }
    };
    resize();

    const vs = createShader(g, g.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(g, g.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const prog = g.createProgram()!;
    g.attachShader(prog, vs);
    g.attachShader(prog, fs);
    g.linkProgram(prog);
    g.useProgram(prog);

    const buf = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, buf);
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
    const aLoc = g.getAttribLocation(prog, 'a');
    g.enableVertexAttribArray(aLoc);
    g.vertexAttribPointer(aLoc, 2, g.FLOAT, false, 0, 0);

    const uM = g.getUniformLocation(prog, 'uM');
    const uT = g.getUniformLocation(prog, 'uT');
    const uSz = g.getUniformLocation(prog, 'uSz');
    const uSt = g.getUniformLocation(prog, 'uSt');
    const uSw = g.getUniformLocation(prog, 'uSw');
    const uGr = g.getUniformLocation(prog, 'uGr');
    const uRev = g.getUniformLocation(prog, 'uReveal');
    const uAsp = g.getUniformLocation(prog, 'uAsp');
    const uAspA = g.getUniformLocation(prog, 'uAspA');
    const uAspB = g.getUniformLocation(prog, 'uAspB');
    const uA = g.getUniformLocation(prog, 'uA');
    const uB = g.getUniformLocation(prog, 'uB');

    function makeTex(img: HTMLImageElement | HTMLCanvasElement) {
      const t = g.createTexture()!;
      g.bindTexture(g.TEXTURE_2D, t);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, img);
      return t;
    }

    let texA: WebGLTexture | null = null;
    let texB: WebGLTexture | null = null;
    let aspectA = 1.0;
    let aspectB = 1.0;
    let loaded = 0;

    function makeFallback(r: number, g: number, b: number, label: string) {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      for (let i = 0; i < 512; i += 40) { ctx.fillRect(i, 0, 20, 512); ctx.fillRect(0, i, 512, 20); }
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = 'bold 32px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 256, 256);
      return makeTex(c);
    }

    function loadImg(src: string, onDone: (img: HTMLImageElement | null) => void) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => onDone(img);
      img.onerror = () => onDone(null);
      img.src = src;
    }

    loadImg(srcA, (img) => {
      if (img) {
        aspectA = img.naturalWidth / img.naturalHeight;
        texA = makeTex(img);
      } else {
        texA = makeFallback(40, 45, 55, 'PORTRAIT');
      }
      loaded++;
    });
    loadImg(srcB, (img) => {
      if (img) {
        aspectB = img.naturalWidth / img.naturalHeight;
        texB = makeTex(img);
      } else {
        texB = makeFallback(10, 10, 18, 'BLUEPRINT');
      }
      loaded++;
    });

    const state = stateRef.current;
    const params = { sz: 100, st: 8, sw: 28, gr: 4, rt: 30 };

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      state.mouse.x = (e.clientX - r.left) / r.width;
      // UV.y = 0 at top, 1 at bottom — matches screen Y direction without flip
      state.mouse.y = (e.clientY - r.top) / r.height;
      state.isHover = true;
      if (state.returnTimer) { clearTimeout(state.returnTimer); state.returnTimer = null; }
      state.targetReveal = 1;
    };

    const onLeave = () => {
      state.isHover = false;
      state.returnTimer = setTimeout(() => { state.targetReveal = 0; }, 100);
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', resize);

    const t0 = performance.now();
    let animId = 0;

    function loop() {
      animId = requestAnimationFrame(loop);
      if (loaded < 2) return;

      const t = (performance.now() - t0) * 0.001;

      state.lerpM.x += (state.mouse.x - state.lerpM.x) * 0.08;
      state.lerpM.y += (state.mouse.y - state.lerpM.y) * 0.08;

      const speed = state.isHover ? 0.04 : -(1 / params.rt * 0.6);
      state.reveal = Math.max(0, Math.min(1, state.reveal + speed));

      const w = canvas!.width;
      const h = canvas!.height;

      g.uniform2f(uM, state.lerpM.x, state.lerpM.y);
      g.uniform1f(uT, t);
      g.uniform1f(uSz, params.sz);
      g.uniform1f(uSt, params.st);
      g.uniform1f(uSw, params.sw);
      g.uniform1f(uGr, params.gr);
      g.uniform1f(uRev, state.reveal);
      g.uniform1f(uAsp, w / h);
      g.uniform1f(uAspA, aspectA);
      g.uniform1f(uAspB, aspectB);

      if (texA) { g.activeTexture(g.TEXTURE0); g.bindTexture(g.TEXTURE_2D, texA); g.uniform1i(uA, 0); }
      if (texB) { g.activeTexture(g.TEXTURE1); g.bindTexture(g.TEXTURE_2D, texB); g.uniform1i(uB, 1); }

      g.drawArrays(g.TRIANGLES, 0, 3);
    }
    loop();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
      if (state.returnTimer) clearTimeout(state.returnTimer);
      g.deleteProgram(prog);
      g.deleteShader(vs);
      g.deleteShader(fs);
    };
  }, [srcA, srcB]);

  return (
    <div className={styles.container} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
