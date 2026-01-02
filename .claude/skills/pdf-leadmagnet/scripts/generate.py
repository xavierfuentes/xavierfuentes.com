#!/usr/bin/env python3
"""
PDF Lead Magnet Generator

Generates professional PDF lead magnets from Markdown content using
Jinja2 templates and various PDF rendering engines.

Usage:
    python generate.py --template ebook --title "Your Title" --content content.md --output output.pdf

Dependencies:
    - pdfkit (recommended, requires wkhtmltopdf)
    - weasyprint (fallback)
    - jinja2
    - markdown
"""

import argparse
import os
import re
import sys
from pathlib import Path

try:
    import markdown
    from markdown.extensions import fenced_code, tables, toc
except ImportError:
    print("Error: markdown package not installed. Run: pip install markdown")
    sys.exit(1)

try:
    from jinja2 import Environment, FileSystemLoader, select_autoescape
except ImportError:
    print("Error: jinja2 package not installed. Run: pip install jinja2")
    sys.exit(1)


# Script directory
SCRIPT_DIR = Path(__file__).parent.parent
TEMPLATES_DIR = SCRIPT_DIR / "templates"


def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="Generate PDF lead magnets from Markdown content"
    )

    parser.add_argument(
        "--template",
        choices=["ebook", "checklist", "cheatsheet"],
        default="ebook",
        help="Template type to use (default: ebook)"
    )

    parser.add_argument(
        "--title",
        required=True,
        help="Title of the lead magnet"
    )

    parser.add_argument(
        "--subtitle",
        default="",
        help="Subtitle or tagline"
    )

    parser.add_argument(
        "--author",
        default="Xavier Fuentes",
        help="Author name (default: Xavier Fuentes)"
    )

    parser.add_argument(
        "--website",
        default="xavierfuentes.com",
        help="Website URL (default: xavierfuentes.com)"
    )

    parser.add_argument(
        "--brand-colour",
        default="#0d2818",
        help="Primary brand colour in hex (default: #0d2818 Deep Jungle)"
    )

    parser.add_argument(
        "--accent-colour",
        default="#d4a05e",
        help="Accent colour in hex (default: #d4a05e Golden Amber)"
    )

    parser.add_argument(
        "--logo",
        default="",
        help="Path to logo file"
    )

    parser.add_argument(
        "--content",
        required=True,
        help="Path to Markdown content file"
    )

    parser.add_argument(
        "--output",
        required=True,
        help="Output PDF file path"
    )

    parser.add_argument(
        "--engine",
        choices=["auto", "pdfkit", "weasyprint"],
        default="auto",
        help="PDF engine to use (default: auto)"
    )

    parser.add_argument(
        "--debug",
        action="store_true",
        help="Save intermediate HTML file for debugging"
    )

    return parser.parse_args()


def preprocess_callouts(content: str) -> str:
    """Convert custom callout syntax to HTML."""

    callout_types = {
        "tip": ("callout-tip", "Tip"),
        "warning": ("callout-warning", "Warning"),
        "note": ("callout-note", "Note"),
        "key-takeaway": ("callout-key-takeaway", "Key Takeaway"),
    }

    for callout_type, (css_class, title) in callout_types.items():
        # Match ::: callout_type ... :::
        pattern = rf":::\s*{callout_type}\s*\n(.*?)\n:::"
        replacement = (
            f'<div class="callout {css_class}">'
            f'<div class="callout-title">{title}</div>'
            r'\1'
            f'</div>'
        )
        content = re.sub(pattern, replacement, content, flags=re.DOTALL | re.IGNORECASE)

    return content


def preprocess_checkboxes(content: str) -> str:
    """Convert Markdown checkboxes to styled HTML."""

    # Unchecked: - [ ] item
    content = re.sub(
        r"^- \[ \] (.+)$",
        r'<li class="checkbox-item"><span class="checkbox"></span><span class="checkbox-label">\1</span></li>',
        content,
        flags=re.MULTILINE
    )

    # Checked: - [x] item
    content = re.sub(
        r"^- \[x\] (.+)$",
        r'<li class="checkbox-item"><span class="checkbox checkbox-checked"></span><span class="checkbox-label">\1</span></li>',
        content,
        flags=re.MULTILINE | re.IGNORECASE
    )

    # Wrap consecutive checkbox items in a ul
    # This is a simplified approach - may need refinement
    lines = content.split('\n')
    result = []
    in_checkbox_list = False

    for line in lines:
        if '<li class="checkbox-item">' in line:
            if not in_checkbox_list:
                result.append('<ul class="checkbox-list">')
                in_checkbox_list = True
            result.append(line)
        else:
            if in_checkbox_list:
                result.append('</ul>')
                in_checkbox_list = False
            result.append(line)

    if in_checkbox_list:
        result.append('</ul>')

    return '\n'.join(result)


def process_markdown(content: str) -> str:
    """Convert Markdown to HTML with preprocessing."""

    # Preprocess custom syntax
    content = preprocess_callouts(content)
    content = preprocess_checkboxes(content)

    # Configure Markdown extensions
    md = markdown.Markdown(
        extensions=[
            'fenced_code',
            'tables',
            'toc',
            'attr_list',
            'md_in_html',
        ],
        extension_configs={
            'toc': {
                'permalink': False,
            }
        }
    )

    # Convert to HTML
    html = md.convert(content)

    return html


def load_content(content_path: str) -> str:
    """Load and process Markdown content file."""

    path = Path(content_path)
    if not path.exists():
        raise FileNotFoundError(f"Content file not found: {content_path}")

    content = path.read_text(encoding="utf-8")

    # Remove YAML frontmatter if present
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            content = parts[2].strip()

    return process_markdown(content)


def render_template(template_name: str, context: dict) -> str:
    """Render Jinja2 template with context."""

    template_dir = TEMPLATES_DIR / template_name

    env = Environment(
        loader=FileSystemLoader([template_dir, TEMPLATES_DIR / "shared"]),
        autoescape=select_autoescape(['html', 'xml'])
    )

    template = env.get_template("template.html")
    return template.render(**context)


def generate_pdf_pdfkit(html: str, output_path: str, debug: bool = False) -> bool:
    """Generate PDF using pdfkit (wkhtmltopdf)."""
    try:
        import pdfkit
    except ImportError:
        return False

    options = {
        'page-size': 'A4',
        'margin-top': '20mm',
        'margin-right': '15mm',
        'margin-bottom': '25mm',
        'margin-left': '15mm',
        'encoding': 'UTF-8',
        'enable-local-file-access': None,
        'print-media-type': None,
        'no-stop-slow-scripts': None,
    }

    try:
        # Write HTML to temp file for debugging if needed
        if debug:
            debug_path = output_path.replace('.pdf', '.html')
            Path(debug_path).write_text(html, encoding='utf-8')
            print(f"Debug HTML saved to: {debug_path}")

        pdfkit.from_string(html, output_path, options=options)
        return True
    except Exception as e:
        print(f"pdfkit error: {e}")
        return False


def generate_pdf_weasyprint(html: str, output_path: str, debug: bool = False) -> bool:
    """Generate PDF using WeasyPrint."""
    try:
        from weasyprint import HTML, CSS
    except ImportError:
        return False

    try:
        if debug:
            debug_path = output_path.replace('.pdf', '.html')
            Path(debug_path).write_text(html, encoding='utf-8')
            print(f"Debug HTML saved to: {debug_path}")

        HTML(string=html).write_pdf(output_path)
        return True
    except Exception as e:
        print(f"weasyprint error: {e}")
        return False


def generate_pdf(html: str, output_path: str, engine: str = "auto", debug: bool = False) -> bool:
    """Generate PDF using available engine."""

    engines = []

    if engine == "auto":
        engines = ["pdfkit", "weasyprint"]
    else:
        engines = [engine]

    for eng in engines:
        print(f"Trying {eng}...")

        if eng == "pdfkit":
            if generate_pdf_pdfkit(html, output_path, debug):
                print(f"Successfully generated PDF with pdfkit")
                return True
        elif eng == "weasyprint":
            if generate_pdf_weasyprint(html, output_path, debug):
                print(f"Successfully generated PDF with weasyprint")
                return True

    return False


def main():
    """Main entry point."""
    args = parse_args()

    # Validate content file exists
    if not Path(args.content).exists():
        print(f"Error: Content file not found: {args.content}")
        sys.exit(1)

    # Create output directory if needed
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"Generating {args.template} PDF...")
    print(f"  Title: {args.title}")
    print(f"  Content: {args.content}")
    print(f"  Output: {args.output}")

    # Load and process content
    print("Processing content...")
    content_html = load_content(args.content)

    # Prepare template context
    # CTA only for ebook template (checklists/cheatsheets are more compact)
    cta_content = None
    if args.template == "ebook":
        cta_content = {
            "title": "What's Next?",
            "intro": "Ready for more insights?",
            "primary": {
                "heading": "Want more frameworks like this?",
                "text": f"Subscribe to The Jungle Brief for weekly insights: {args.website}/newsletter"
            }
        }

    context = {
        "title": args.title,
        "subtitle": args.subtitle,
        "author": args.author,
        "website": args.website,
        "brand_colour": args.brand_colour,
        "brand_secondary": args.brand_colour,  # Slightly derive from primary
        "accent_colour": args.accent_colour,
        "logo_path": args.logo if args.logo else None,
        "content": content_html,
        # Placeholders for optional sections
        "toc": None,
        "welcome": None,
        "cta": cta_content,
        "about_author": None,
        "intro": None,
        "show_notes": False,
    }

    # Render template
    print("Rendering template...")
    html = render_template(args.template, context)

    # Inject CSS file paths (make them absolute for PDF rendering)
    shared_css = (TEMPLATES_DIR / "shared" / "base.css").read_text()
    shared_print_css = (TEMPLATES_DIR / "shared" / "print.css").read_text()
    template_css_path = TEMPLATES_DIR / args.template / "styles.css"
    template_css = template_css_path.read_text() if template_css_path.exists() else ""

    # Inject all CSS inline for reliable PDF rendering
    style_block = f"<style>\n{shared_css}\n{shared_print_css}\n{template_css}\n</style>"
    html = html.replace(
        '<link rel="stylesheet" href="../shared/base.css">',
        ''
    ).replace(
        '<link rel="stylesheet" href="../shared/print.css">',
        ''
    ).replace(
        '<link rel="stylesheet" href="styles.css">',
        style_block
    )

    # Generate PDF
    print("Generating PDF...")
    success = generate_pdf(html, str(output_path), args.engine, args.debug)

    if success:
        print(f"\nPDF generated successfully: {args.output}")
        print(f"File size: {output_path.stat().st_size / 1024:.1f} KB")
    else:
        print("\nError: Failed to generate PDF.")
        print("Make sure you have either wkhtmltopdf or weasyprint installed:")
        print("  macOS: brew install wkhtmltopdf")
        print("  pip: pip install weasyprint")
        sys.exit(1)


if __name__ == "__main__":
    main()
