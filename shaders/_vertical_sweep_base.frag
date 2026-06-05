// _vertical_sweep_base.frag
// Classic slit-scan: time flows across x-axis, vertical slices sampled from history
// X-coordinate = time offset, Y = spatial slice

precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

// Pseudo-random
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Value noise for synthetic video source
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Moving subject: a "dancer" composed of blobs
float dancer(vec2 uv, float t) {
    float body = 0.0;
    
    // Head
    vec2 headPos = vec2(0.5 + 0.1 * sin(t * 0.7), 0.7 + 0.05 * sin(t * 1.1));
    body += smoothstep(0.08, 0.0, length(uv - headPos));
    
    // Torso
    vec2 torsoPos = vec2(0.5 + 0.08 * sin(t * 0.5), 0.5 + 0.03 * sin(t * 0.9));
    body += smoothstep(0.12, 0.0, length(uv - torsoPos) * 0.8);
    
    // Arms
    vec2 lArm = vec2(0.35 + 0.15 * sin(t * 1.3), 0.55 + 0.1 * cos(t * 0.8));
    vec2 rArm = vec2(0.65 + 0.15 * cos(t * 1.1), 0.55 + 0.1 * sin(t * 0.7));
    body += smoothstep(0.06, 0.0, length(uv - lArm));
    body += smoothstep(0.06, 0.0, length(uv - rArm));
    
    // Legs
    vec2 lLeg = vec2(0.45 + 0.1 * sin(t * 0.6), 0.3 + 0.08 * cos(t * 0.5));
    vec2 rLeg = vec2(0.55 + 0.1 * cos(t * 0.5), 0.3 + 0.08 * sin(t * 0.6));
    body += smoothstep(0.05, 0.0, length(uv - lLeg));
    body += smoothstep(0.05, 0.0, length(uv - rLeg));
    
    return body;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Slit-scan parameters
    float scanWidth = 0.01; // Width of the slit
    float timeScale = 2.0;  // How much time to stretch across the screen
    
    // X-coordinate determines the time offset for this column
    // Left side = older time, right side = newer time (or vice versa)
    float timeOffset = uv.x * timeScale;
    
    // Sample the "video" at time (u_time - timeOffset) at the vertical position uv.y
    float sampleTime = u_time - timeOffset;
    
    // Get the dancer's shape at that time and vertical position
    vec2 sampleUV = vec2(0.5, uv.y); // We sample the center horizontally
    float body = dancer(sampleUV, sampleTime);
    
    // Add background noise for texture
    float bg = noise(vec2(uv.y * 50.0, sampleTime * 10.0)) * 0.3;
    
    // Combine
    float value = body + bg * (1.0 - body);
    
    // Color: warm amber body, cool blue background
    vec3 bodyColor = vec3(0.9, 0.6, 0.3);
    vec3 bgColor = vec3(0.1, 0.15, 0.25);
    vec3 color = mix(bgColor, bodyColor, body);
    
    // Add motion trails from scan
    float trail = smoothstep(0.0, 0.5, body) * 0.3;
    color += vec3(0.5, 0.3, 0.1) * trail;
    
    gl_FragColor = vec4(color, 1.0);
}
