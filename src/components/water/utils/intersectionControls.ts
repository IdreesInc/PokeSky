import { useControls, folder } from "leva";

export function useWaterDepthIntersectionControls() {
  return useControls(
    "Intersection",
    {
      enabled:   { value: true,    label: "Enabled" },
      lineWidth: { value: 3, min: 0.01, max: 5.0, step: 0.01, label: "Line Width (world)" },
      glowWidth: { value: 2.7,  min: 0.1,  max: 10,  step: 0.1,  label: "Glow Width (world)" },
      Line: folder({
        lineColor:   { value: "#ffd229", label: "Color" },
        lineOpacity: { value: 0.5, min: 0, max: 1, step: 0.01, label: "Opacity" },
      }, { collapsed: false }),
      Glow: folder({
        glowColor:   { value: "#88ccff", label: "Color" },
        glowOpacity: { value: 0.25, min: 0, max: 1, step: 0.01, label: "Opacity" },
      }, { collapsed: false }),
    },
    { collapsed: true }
  );
}
