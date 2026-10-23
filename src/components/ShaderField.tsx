import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const vertexShader = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  vec2 mouse = (uMouse - 0.5) * 0.14;
  vec2 center = vec2(0.34, 0.0) - mouse;
  vec2 p = uv - center;

  float r = length(p);
  float ang = atan(p.y, p.x);
  float t = uTime * 0.055;

  vec2 q = vec2(
    fbm(p * 2.35 + vec2(0.0, t * 2.0)),
    fbm(p * 2.35 + vec2(5.2, 1.3) - vec2(t * 1.5, 0.0))
  );
  float f = fbm(p * 3.1 + q * 2.2 + vec2(t, -t * 0.7));

  float spiral = sin(ang * 3.0 + r * 11.0 - uTime * 0.42 + f * 7.0);
  spiral = smoothstep(0.46, 0.98, spiral * 0.5 + 0.5);
  float falloff = exp(-r * 2.15);
  float smoke = smoothstep(0.4, 0.8, f);

  vec3 lime = vec3(0.79, 1.0, 0.24);
  vec3 teal = vec3(0.0, 0.9, 0.7);
  vec3 violet = vec3(0.32, 0.12, 0.95);
  vec3 bone = vec3(0.93, 0.91, 0.86);

  vec3 col = vec3(0.012, 0.013, 0.012);
  vec3 aura = mix(violet, teal, smoothstep(0.08, 0.55, f + 0.18));
  aura = mix(aura, lime, smoothstep(0.55, 0.92, f + 0.25 * q.y));
  col += aura * smoke * falloff * 0.6;
  col += mix(teal, lime, 0.55) * spiral * falloff * 0.5;

  float rim = exp(-pow((r - 0.27) * 7.5, 2.0));
  col += lime * rim * 0.32;
  col += lime * exp(-r * 14.0) * 0.5;
  col += bone * exp(-r * 34.0) * 0.6;

  col *= smoothstep(-1.6, -0.2, uv.x) * 0.3 + 0.7;
  col *= smoothstep(1.65, 0.15, length(uv));
  col += (hash21(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.022;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });

    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uMouse = gl.getUniformLocation(program, 'uMouse');

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    const resize = () => {
      width = Math.max(1, canvas.clientWidth);
      height = Math.max(1, canvas.clientHeight);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    let targetX = 0.5;
    let targetY = 0.5;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const render = (now: number) => {
      frame = 0;
      if (!visible) return;
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reduced) frame = requestAnimationFrame(render);
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX / Math.max(window.innerWidth, 1);
      targetY = 1 - event.clientY / Math.max(window.innerHeight, 1);
    };

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      if (visible && !frame) frame = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting && document.visibilityState === 'visible';
        if (visible && !wasVisible && !frame) frame = requestAnimationFrame(render);
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={`shader-field ${className}`.trim()} aria-hidden="true" />;
}
