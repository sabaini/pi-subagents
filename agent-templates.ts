import type { AgentConfig } from "./agents.ts";

export interface AgentTemplate {
	name: string;
	config: Partial<AgentConfig>;
}

export type TemplateItem =
	| { type: "agent"; name: string; config: Partial<AgentConfig> }
	| { type: "chain"; name: string; description: string }
	| { type: "separator"; label: string };

export const TEMPLATE_ITEMS: TemplateItem[] = [
	{ type: "separator", label: "Agents" },
	{
		type: "agent",
		name: "Blank",
		config: { description: "Describe this agent", systemPrompt: "" },
	},
	{
		type: "agent",
		name: "Scout",
		config: {
			description: "Analyzes codebases and reports findings",
			systemPrompt: "You are a code analysis agent. Given a codebase and a question, thoroughly investigate the relevant files and report your findings. Focus on accuracy — read the actual code rather than guessing.",
			tools: ["read", "bash"],
			output: "analysis.md",
		},
	},
	{
		type: "agent",
		name: "Code Reviewer",
		config: {
			description: "Applies review rubrics and reports evidence-backed findings",
			systemPrompt:
				"You are a senior code reviewer. Review actual changed behavior as merge-ready code, not just whether it matches the intended plan. Prefer reviewing the real diff, changed files, and affected tests over summaries. If plan.md, progress.md, specs, design notes, or other review artifacts exist and are relevant, read them early and use them as context, not as the source of truth. Apply any injected review-* rubric skills explicitly; if none are injected, default to a correctness-focused review. Report only concrete, evidence-backed findings, explain why each issue matters, and distinguish clearly between blocker, medium-risk, and advisory findings. Bash is for read-only inspection only: git diff, git log, git show, and similar non-mutating commands.",
			tools: ["read", "grep", "find", "ls", "bash"],
			skills: ["review-correctness"],
			defaultReads: ["plan.md", "progress.md"],
		},
	},
	{
		type: "agent",
		name: "Planner",
		config: {
			description: "Creates implementation plans from requirements",
			systemPrompt: "You are a planning agent. Given a task or requirements, create a detailed implementation plan. Break the work into concrete steps, identify which files need changes, and note any risks or dependencies.",
			tools: ["read", "bash"],
			output: "plan.md",
		},
	},
	{
		type: "agent",
		name: "Implementer",
		config: {
			description: "Implements code changes from a plan",
			systemPrompt: "You are an implementation agent. Given a plan or task, make the necessary code changes. Write clean, tested code that follows existing patterns. Run tests after making changes.",
			defaultProgress: true,
		},
	},
	{ type: "separator", label: "Chains" },
	{ type: "chain", name: "Blank Chain", description: "Empty chain to configure" },
];
