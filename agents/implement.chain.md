---
name: implement
description: Plan a change, implement it, review it, address review findings once, and re-review
---

## planner
output: plan.md

Create an execution-ready implementation plan for:

{task}

Inspect the codebase and plan the change. Write `# Clarification Needed` instead of guessing if the request is still too ambiguous.

Only write `# Implementation Plan` when the plan is safe to execute without additional user feedback. If there are any user-facing open questions, decisions, or success criteria that must be answered before implementation, write `# Clarification Needed` with the questions instead of putting them under `## Open Questions`.

## worker
reads: plan.md
progress: true

- Create a new feature branch for the work.
- Execute the series of tasks in `plan.md`.
- Verify the plan against the code, make the smallest safe change set, update `progress.md`, and summarize results.
- Commit changes on the feature branch.
- If `plan.md` says clarification is needed or that no code changes are required, do not invent work; verify and report that outcome clearly instead.

## reviewer
reads: plan.md, progress.md
output: review-initial.md

Review the resulting working tree for:

{task}

Use `plan.md`, `progress.md`, and the actual diff. Focus on evidence-backed behavioral findings, missing coverage, and confidence gaps.
- Report concrete, evidence-backed findings with stable ids `F-01`, `F-02`, and so on.
- If the work was blocked or no code changes were needed, verify that conclusion instead of fabricating defects.
- If no issues are found, say so explicitly.

## worker
reads: plan.md, progress.md, review-initial.md
output: review-response.md
progress: true

Address the review findings for:

{task}

Use `review-initial.md` as the review backlog, but verify every finding against the code before changing anything.
- Continue on the existing feature branch; do not create a new branch.
- Fix valid findings with the smallest safe change set.
- If a finding is invalid, already resolved, or intentionally not addressed, record that clearly with evidence.
- Update `progress.md`.
- Write `review-response.md` with one disposition per finding id: `fixed`, `not-reproducible`, `not-applicable`, or `deferred`, plus validation notes.
- Commit any follow-up changes if needed.

## reviewer
reads: plan.md, progress.md, review-initial.md, review-response.md
output: review-final.md

Re-review the current working tree for:

{task}

Use `review-initial.md` as the baseline, `review-response.md` for claimed dispositions, and the actual diff and tests as the source of truth.
- Verify whether each prior finding was resolved.
- Report only unresolved prior findings and any new concrete issues introduced by the remediation.
- If all findings were resolved and no new issues were introduced, say so explicitly.
