---
name: implement
description: Plan a change, implement it, and review the result
---

## planner
output: plan.md

Create an execution-ready implementation plan for:

{task}

Inspect the codebase. Keep the change set small, name exact files and symbols when known, include validation, and write `# Clarification Needed` instead of guessing if the request is still too ambiguous.

## worker
reads: plan.md
progress: true

Execute the requested change for:

{task}

Use `plan.md`, verify the plan against the code, make the smallest safe change set, update `progress.md`, run validation, and summarize files changed plus results. If `plan.md` says clarification is needed or that no code changes are required, do not invent work; verify and report that outcome clearly instead.

## reviewer
reads: plan.md, progress.md
output: review.md

Review the resulting working tree for:

{task}

Use `plan.md`, `progress.md`, and the actual diff. Focus on evidence-backed behavioral findings, missing coverage, and confidence gaps. If the work was blocked or no code changes were needed, verify that conclusion instead of fabricating defects.
