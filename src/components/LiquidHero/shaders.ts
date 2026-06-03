export const fluidVertShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Pass 1: Update velocity field with diffusion + mouse force
export const fluidFragShader = `
  precision highp float;
  uniform sampler2D tMap;
  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  uniform float uBrushRadius;
  uniform float uDissipation;
  uniform vec2 uTexelSize;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Diffuse: sample neighbors and average (spreads velocity spatially)
    vec2 texel = uTexelSize;
    vec4 top    = texture2D(tMap, uv + vec2(0.0,  texel.y));
    vec4 bottom = texture2D(tMap, uv + vec2(0.0, -texel.y));
    vec4 left   = texture2D(tMap, uv + vec2(-texel.x, 0.0));
    vec4 right  = texture2D(tMap, uv + vec2( texel.x, 0.0));
    vec4 center = texture2D(tMap, uv);

    // Weighted diffusion
    vec4 diffused = (top + bottom + left + right) * 0.2 + center * 0.2;

    // Mouse force falloff
    float dist = length(uv - uMouse);
    float falloff = smoothstep(uBrushRadius, 0.0, dist);

    // Add mouse velocity force
    vec2 force = uVelocity * falloff * 12.0;
    diffused.rg += force;

    // Decay (viscosity)
    diffused.rg *= uDissipation;

    gl_FragColor = diffused;
  }
`;

// Pass 2: Render image with velocity-based UV distortion
export const renderVertShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const renderFragShader = `
  precision highp float;
  uniform sampler2D tImage;
  uniform sampler2D tFluid;
  uniform float uStrength;
  varying vec2 vUv;

  void main() {
    vec2 fluid = texture2D(tFluid, vUv).rg;
    vec2 distortedUV = vUv - fluid * uStrength;
    // Cover-fit: keep within bounds but allow slight repeat for liquid feel
    distortedUV = clamp(distortedUV, 0.001, 0.999);
    gl_FragColor = texture2D(tImage, distortedUV);
  }
`;
