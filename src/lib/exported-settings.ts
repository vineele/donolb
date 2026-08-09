import type { StyleConfig } from "@/lib/style-config";

export interface ExportedSettings {
  accent?: string;
  background?: Partial<StyleConfig>;
  cards?: Partial<StyleConfig>;
  bracket?: Partial<StyleConfig>;
  profile?: { avatarUrl?: string; username?: string; bio?: string; banner?: Partial<StyleConfig> };
  customCss?: string;
}

export const EXPORTED_SETTINGS: ExportedSettings = {
  "background": {
    "bgType": "image",
    "bgColor": "#1f1f1f",
    "gradFrom": "#1a0a2e",
    "gradTo": "#0a1628",
    "gradDir": "135deg",
    "imgUrl": "",
    "effect": "none",
    "glowColor": "#a855f7",
    "borderColor": "#06d6a0",
    "holoColor": "#a855f7",
    "auroraColor": "#00c3ff"
  },
  "customCss": ""
};
