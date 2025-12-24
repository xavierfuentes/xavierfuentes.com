# /validate Command

Run frontmatter validation on all content files.

## What This Command Does

1. Runs `npm run validate` to check all content files
2. Reports validation errors by file
3. Summarises overall health

## Execution Steps

1. **Run validation script**: Execute `npm run validate`
2. **Parse output**: Extract errors and warnings
3. **Report by file**: List issues per file
4. **Summarise**: Overall pass/fail status

## Usage

```
/validate
```

## Expected Output

### All Valid
```
Validating content files...

All 15 files passed validation.
```

### With Errors
```
Validating content files...

Errors found in 2 files:

content/posts/2025-01-example.md:
  - Missing required field: title
  - Invalid status value: "publishing" (expected: draft, published, scheduled)

content/ideas/2025-01-another.md:
  - Invalid pillar value: "tech" (expected: technology-strategy, leadership-management, execution-delivery, founder-lessons, market-ai-trends)

13 files passed, 2 files failed.
```

## What Gets Validated

- Required frontmatter fields present
- Field values match allowed enums
- Date formats correct
- File naming conventions followed

## Reference

See `context/frontmatter-schemas.md` for valid field values.
