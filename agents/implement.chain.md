---
name: implement
description: Plan a change, implement it, and review the result
---

## planner
output: plan.md

Create an execution-ready implementation plan for:

{task}

Inspect the codebase and plan the change. Write `# Clarification Needed` instead of guessing if the request is still too ambiguous.

## worker
reads: plan.md
progress: true

- Create a new feature branch for the work.
- Execute the series of tasks `plan.md`. 
- Verify the plan against the code, make the smallest safe change set, update `progress.md`, and summarize results. 
- Commit changes on the feature branch.
- If `plan.md` says clarification is needed or that no code changes are required, do not invent work; verify and report that outcome clearly instead.

## reviewer
reads: plan.md, progress.md
output: review.md

Review the resulting working tree for:

{task}

Use `plan.md`, `progress.md`, and the actual diff. Focus on evidence-backed behavioral findings, missing coverage, and confidence gaps. If the work was blocked or no code changes were needed, verify that conclusion instead of fabricating defects.
