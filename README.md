# slit_scan

A creative coding project exploring **slit-scan photography** — a time-space imaging technique where different vertical slices of a scene are recorded at different moments, stretching motion into impossible geometries and revealing the hidden temporal dimension of ordinary movement.

## What Is Slit-Scan?

Traditional photography captures a full frame at a single instant. Slit-scan captures one narrow vertical column at a time, sweeping left-to-right (or right-to-left) over seconds, minutes, or hours. The result: time becomes horizontal, motion becomes form, and familiar subjects become alien landscapes.

In shader terms: the x-coordinate of each pixel determines which time slice to sample. `uv.x` becomes `time_offset`, and `uv.y` becomes `spatial_slice`.

## Project Structure

```
shaders/              # GLSL fragment shaders — real-time slit-scan effects
video_sources/        # Test footage: dancers, traffic, water, crowds
scan_geometries/      # Vertical, horizontal, radial, spiral, arbitrary-curve slits
temporal_filters/     # Time-buffering, motion blur, frame interpolation
chromatic_modes/      # Per-channel slit offsets (RGB time divergence)
analog_artifacts/     # VHS, CRT, tape degradation, signal noise
outputs/              # Still captures, video renders, print-ready compositions
```

## Running

Shaders are written for WebGL/Three.js. Each shader is self-contained — drop it into any fragment shader environment (Shadertoy, The Book of Shaders editor, local Three.js setup). Video input requires WebGL video texture binding.

## Current Scan Modes

- [ ] _vertical_sweep — classic left-to-right, time across x-axis
- [ ] _horizontal_sweep — time flows down, waterfall effect
- [ ] _radial_clock — time radiates from center, spinning subjects into vortex
- [ ] _spiral_tunnel — helical slit path, DNA-like twisted motion traces
- [ ] _wave_sweep — sine-modulated slit position, liquid time distortion
- [ ] _chromatic_drift — R, G, B slits offset by 1/3 phase, rainbow ghosting
- [ ] _reverse_echo — newest frames at left, oldest at right, decay trail
- [ ] _scan_and_hold — freeze selected slices while continuing to scan others
- [ ] _temporal_stretch — non-linear time mapping, slow-motion centers
- [ ] _pixel_sort_bleed — combine slit-scan with threshold-based pixel sorting

## VHS / Analog Artifacts Suite

- [ ] _tracking_error — horizontal band noise, sync pulse interference
- [ ] _chromatic_aberration — channel misalignment, blooming edges
- [ ] _dropout — white noise bursts, tape oxide imperfections
- [ ] _chrominance_noise — color subcarrier bleeding, dot crawl
- [ ] _head_clog — repeating frame sections, tape path contamination
- [ ] _thermal_color — temperature-dependent hue shift, warm=cool time distortion
- [ ] _edge_enhancement — analog aperture correction, overshoot artifacts
- [ ] _ghosting — RF interference, multi-path signal echoes

## References

- Zbigniew Rybczyński (1981). *Tango* — Oscar-winning slit-scan short
- Douglas Trumbull (1968). *2001: A Space Odyssey* — Stargate slit-scan sequence
- Jay Mark Johnson (2000s). *Chronophotography* — dancer slit-scan portraits
- Brian Eno (1970s). *Oblique Strategies* — generative time manipulation concepts
- Weezer (1996). *Pinkerton* — music video slit-scan effects
- Thomas Wilfred (1930s). *Lumia* — early light-based time-space art

---

*Time is not a dimension you move through. Time is a dimension you can stretch, fold, and slice.*
