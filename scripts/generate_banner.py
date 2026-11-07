#!/usr/bin/env python3
"""
Generate GitHub README Card-Style Hero Banners (Dark & Light SVG).
Inspired by AnythingLLM, Raycast, and modern developer tooling aesthetics.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
from pathlib import Path

# Predefined theme palettes (Primary accent colors)
THEMES = {
    "sky": {
        "dark_accent": "#38BDF8",
        "dark_pill_text": "#38BDF8",
        "light_accent": "#0284C7",
        "light_pill_text": "#0369A1",
    },
    "emerald": {
        "dark_accent": "#34D399",
        "dark_pill_text": "#34D399",
        "light_accent": "#059669",
        "light_pill_text": "#047857",
    },
    "indigo": {
        "dark_accent": "#818CF8",
        "dark_pill_text": "#818CF8",
        "light_accent": "#4F46E5",
        "light_pill_text": "#4338CA",
    },
    "violet": {
        "dark_accent": "#A78BFA",
        "dark_pill_text": "#A78BFA",
        "light_accent": "#7C3AED",
        "light_pill_text": "#6D28D9",
    },
    "amber": {
        "dark_accent": "#FBBF24",
        "dark_pill_text": "#FBBF24",
        "light_accent": "#D97706",
        "light_pill_text": "#B45309",
    },
    "rose": {
        "dark_accent": "#FB7185",
        "dark_pill_text": "#FB7185",
        "light_accent": "#E11D48",
        "light_pill_text": "#BE123C",
    },
    "cyan": {
        "dark_accent": "#22D3EE",
        "dark_pill_text": "#22D3EE",
        "light_accent": "#0891B2",
        "light_pill_text": "#0e7490",
    },
    "teal": {
        "dark_accent": "#2FC6A4",
        "dark_pill_text": "#2FC6A4",
        "light_accent": "#0C7F6C",
        "light_pill_text": "#0C7F6C",
    },
}


def estimate_text_width(text: str, font_size: int = 13, bold: bool = True) -> int:
    """Estimate pixel width of sans-serif text string."""
    width = 0
    for ch in text:
        if ord(ch) > 127:
            width += font_size * 1.1
        elif ch in "ijlI1.,' ":
            width += font_size * 0.35
        elif ch in "mwMW@":
            width += font_size * 0.95
        else:
            width += font_size * 0.62
    if bold:
        width *= 1.05
    return int(width)


def generate_monogram_icon(char: str, dark: bool, accent_color: str) -> str:
    """Generate a clean geometric monogram icon for 72x72 box."""
    char = (char[:1] or "X").upper()
    fg_color = "#F8FAFC" if dark else "#0F172A"
    return f"""
    <!-- Geometric Monogram Icon -->
    <text x="36" y="49" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="800" fill="{fg_color}">{html.escape(char)}</text>
    <circle cx="54" cy="22" r="4" fill="{accent_color}" />
    """


def render_svg(
    dark: bool,
    name: str,
    suffix: str,
    tagline: str,
    pills: list[str],
    version_tag: str,
    theme_cfg: dict[str, str],
    custom_icon_svg: str | None = None,
) -> str:
    """Render a 960x300 pixel-perfect SVG card."""
    accent = theme_cfg["dark_accent"] if dark else theme_cfg["light_accent"]
    pill_text_color = theme_cfg["dark_pill_text"] if dark else theme_cfg["light_pill_text"]

    # Background and card tokens
    bg_fill = "#0B0F17" if dark else "#FFFFFF"
    card_stroke = "#1E293B" if dark else "#E2E8F0"
    grid_dot = "#1E293B" if dark else "#E2E8F0"
    grid_id = "grid-dark" if dark else "grid-light"

    # Icon box tokens
    icon_box_fill = "#111827" if dark else "#F8FAFC"
    icon_box_stroke = "#1E293B" if dark else "#E2E8F0"

    # Typography tokens
    title_color = "#F8FAFC" if dark else "#0F172A"
    tagline_color = "#94A3B8" if dark else "#64748B"
    divider_stroke = "#1E293B" if dark else "#E2E8F0"
    meta_color = "#94A3B8" if dark else "#64748B"

    # Pill tokens
    pill_fill = "#162032" if dark else "#F1F5F9"
    pill_stroke = "#1E293B" if dark else "#CBD5E1"

    # Icon content
    if custom_icon_svg:
        icon_body = custom_icon_svg
    else:
        icon_body = generate_monogram_icon(name, dark=dark, accent_color=accent)

    # Compute pills layout
    pills_markup = []
    curr_x = 0
    pill_h = 34
    pill_spacing = 12

    for text in pills:
        text_w = estimate_text_width(text, font_size=13, bold=True)
        pill_w = max(110, text_w + 48)  # 16 dot + 12 gap + text + 20 padding
        dot_x = 16
        label_x = 28
        pills_markup.append(f"""
    <!-- Pill: {html.escape(text)} -->
    <rect x="{curr_x}" y="0" width="{pill_w}" height="{pill_h}" rx="8" fill="{pill_fill}" stroke="{pill_stroke}" stroke-width="1"/>
    <circle cx="{curr_x + dot_x}" cy="17" r="4" fill="{accent}"/>
    <text x="{curr_x + label_x}" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="{pill_text_color}">{html.escape(text)}</text>
        """)
        curr_x += pill_w + pill_spacing

    pills_combined = "\n".join(pills_markup)

    suffix_markup = ""
    if suffix:
        suffix_markup = f'<tspan font-size="28" font-weight="500" fill="{accent}"> {html.escape(suffix)}</tspan>'

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 300" width="100%" height="100%" fill="none">
  <!-- Card Container with 24px Squircle Radius -->
  <rect x="2" y="2" width="956" height="296" rx="24" fill="{bg_fill}" stroke="{card_stroke}" stroke-width="2"/>

  <!-- Subtle Dot Grid in Background -->
  <defs>
    <pattern id="{grid_id}" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="1" fill="{grid_dot}" />
    </pattern>
  </defs>
  <rect x="20" y="20" width="920" height="260" rx="16" fill="url(#{grid_id})" opacity="0.6"/>

  <!-- Brand Mark Icon Box (72x72) -->
  <g transform="translate(64, 60)">
    <rect width="72" height="72" rx="18" fill="{icon_box_fill}" stroke="{icon_box_stroke}" stroke-width="1.5"/>
    {icon_body}
  </g>

  <!-- Typography: Wordmark & Core Tagline -->
  <text x="156" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="44" font-weight="800" fill="{title_color}" letter-spacing="-1">{html.escape(name)}{suffix_markup}</text>
  
  <text x="156" y="138" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="400" fill="{tagline_color}">{html.escape(tagline)}</text>

  <!-- Divider Line -->
  <line x1="64" y1="180" x2="896" y2="180" stroke="{divider_stroke}" stroke-width="1.5"/>

  <!-- Bottom Badges / Tech Capabilities -->
  <g transform="translate(64, 210)">
{pills_combined}
    <!-- Right Side Protocol Tag -->
    <text x="832" y="22" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace" font-size="13" font-weight="500" fill="{meta_color}">{html.escape(version_tag)}</text>
  </g>
</svg>"""


def auto_detect_project(project_dir: Path) -> dict[str, str | list[str]]:
    """Inspect package.json, pyproject.toml, or Cargo.toml to extract project info."""
    info: dict[str, str | list[str]] = {}

    # 1. package.json
    pkg_json = project_dir / "package.json"
    if pkg_json.is_file():
        try:
            data = json.loads(pkg_json.read_text(encoding="utf-8"))
            raw_name = data.get("name", "")
            info["name"] = raw_name.split("/")[-1].replace("-", " ").title()
            info["tagline"] = data.get("description", "")
            info["version"] = data.get("version", "1.0.0")
        except Exception:
            pass

    # 2. pyproject.toml
    pyproject = project_dir / "pyproject.toml"
    if not info.get("name") and pyproject.is_file():
        try:
            content = pyproject.read_text(encoding="utf-8")
            name_m = re.search(r'name\s*=\s*["\']([^"\']+)["\']', content)
            desc_m = re.search(r'description\s*=\s*["\']([^"\']+)["\']', content)
            ver_m = re.search(r'version\s*=\s*["\']([^"\']+)["\']', content)
            if name_m:
                info["name"] = name_m.group(1).replace("-", " ").title()
            if desc_m:
                info["tagline"] = desc_m.group(1)
            if ver_m:
                info["version"] = ver_m.group(1)
        except Exception:
            pass

    # 3. Cargo.toml
    cargo = project_dir / "Cargo.toml"
    if not info.get("name") and cargo.is_file():
        try:
            content = cargo.read_text(encoding="utf-8")
            name_m = re.search(r'name\s*=\s*["\']([^"\']+)["\']', content)
            desc_m = re.search(r'description\s*=\s*["\']([^"\']+)["\']', content)
            ver_m = re.search(r'version\s*=\s*["\']([^"\']+)["\']', content)
            if name_m:
                info["name"] = name_m.group(1).replace("-", " ").title()
            if desc_m:
                info["tagline"] = desc_m.group(1)
            if ver_m:
                info["version"] = ver_m.group(1)
        except Exception:
            pass

    return info


def main():
    parser = argparse.ArgumentParser(description="Generate README Card-Style Hero Banners")
    parser.add_argument("--name", help="Project name (e.g. 'BugX')")
    parser.add_argument("--suffix", default="", help="Sub-title / suffix (e.g. 'Agent' or 'CLI')")
    parser.add_argument("--tagline", help="Tagline / short description")
    parser.add_argument("--pills", help="Comma-separated feature badges (e.g. 'Evidence-Chained,Local Security,ACP')")
    parser.add_argument("--version-tag", help="Version and protocol tag (e.g. 'v1.0.0 · Apache-2.0')")
    parser.add_argument("--theme", default="sky", choices=list(THEMES.keys()), help="Color theme")
    parser.add_argument("--icon-svg", help="Optional path to custom SVG file for icon box")
    parser.add_argument("--out-dir", default="assets", help="Output directory (default: assets)")
    parser.add_argument("--project-dir", help="Project directory to auto-detect metadata from")
    parser.add_argument("--slug", help="Slug for filenames (e.g. 'bugx-hero', default derived from name)")

    args = parser.parse_args()

    # Auto-detection
    name = args.name
    tagline = args.tagline
    version = "1.0.0"

    if args.project_dir:
        detected = auto_detect_project(Path(args.project_dir))
        if not name and detected.get("name"):
            name = str(detected["name"])
        if not tagline and detected.get("tagline"):
            tagline = str(detected["tagline"])
        if detected.get("version"):
            version = str(detected["version"])

    if not name:
        name = "OpenSource Project"
    if not tagline:
        tagline = "Modern Developer Tooling & Infrastructure"

    slug = args.slug or re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")

    # Feature pills
    if args.pills:
        pills = [p.strip() for p in args.pills.split(",") if p.strip()]
    else:
        pills = ["Zero-Config", "High Performance", "MIT Licensed"]

    version_tag = args.version_tag or f"v{version} · Open Protocol"
    theme_cfg = THEMES[args.theme]

    custom_icon = None
    if args.icon_svg:
        icon_path = Path(args.icon_svg)
        if icon_path.is_file():
            custom_icon = icon_path.read_text(encoding="utf-8")

    # Output directory
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    dark_file = out_dir / f"{slug}-hero-dark.svg"
    light_file = out_dir / f"{slug}-hero-light.svg"

    dark_svg = render_svg(
        dark=True,
        name=name,
        suffix=args.suffix,
        tagline=tagline,
        pills=pills,
        version_tag=version_tag,
        theme_cfg=theme_cfg,
        custom_icon_svg=custom_icon,
    )
    light_svg = render_svg(
        dark=False,
        name=name,
        suffix=args.suffix,
        tagline=tagline,
        pills=pills,
        version_tag=version_tag,
        theme_cfg=theme_cfg,
        custom_icon_svg=custom_icon,
    )

    dark_file.write_text(dark_svg, encoding="utf-8")
    light_file.write_text(light_svg, encoding="utf-8")

    print(f"✓ Generated Dark Hero Banner : {dark_file}")
    print(f"✓ Generated Light Hero Banner: {light_file}")
    print("\n=== README.md Integration Code ===")
    print(f"""```html
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="{out_dir.as_posix()}/{slug}-hero-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="{out_dir.as_posix()}/{slug}-hero-light.svg">
    <img alt="{html.escape(name)} Banner" src="{out_dir.as_posix()}/{slug}-hero-dark.svg" width="100%">
  </picture>
</p>
```""")


if __name__ == "__main__":
    main()
