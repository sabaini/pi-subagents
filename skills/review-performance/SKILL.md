---
name: review-performance
description: Review rubric for performance. Use with the reviewer agent or when checking runtime cost, scalability, bottlenecks, and unnecessary work.
---

# Review rubric: performance

Use this rubric when reviewing code. Focus on concrete, evidence-backed findings in this lens. If multiple review rubrics are active, stay primarily within this lens and avoid duplicating the same finding under multiple labels unless it materially changes risk or severity.

Review the code for performance characteristics: whether it uses CPU, memory, I/O, and external dependencies efficiently at expected scale without adding unjustified complexity. Focus on material cost and scaling limits, not speculative micro-optimizations.

**Look for:**
- Algorithmic complexity that does not match expected workload size
- Repeated work inside loops, request paths, or hot code paths
- N+1 query or chatty dependency patterns (database, API, filesystem, subprocess)
- Unnecessary allocations, copying, or serialization/deserialization
- Blocking operations in async or concurrent contexts
- Memory leaks or unbounded growth in caches, queues, buffers, or retained state
- Inefficient parsing, regex, string building, or data transformation
- Work done eagerly that could be lazy, deferred, batched, or cached
- Poor batching, pagination, or streaming behavior for large datasets
- Lock contention or coordination patterns that will limit concurrency
- Expensive startup or re-initialization work done more often than necessary

**In a charm, also check for:**
- Expensive operations inside frequently-fired hooks such as update-status or relation-changed
- Repeated subprocess or Pebble exec calls where a single call, cache, or shared probe would suffice
- Large relation data or config payloads repeatedly serialized/deserialized on every hook invocation
- Full reconcile/configure work on every event when incremental checks would be enough
- Status computation or readiness checks that trigger unnecessary external calls

**Questions to answer:**
- What dominates cost in the common path?
- Which paths become bottlenecks at 10x, 100x, and 1000x scale?
- What concrete evidence suggests batching, caching, indexing, streaming, or concurrency changes would help?
- Is any added performance complexity justified by the expected workload and likely bottlenecks?
