# Piano: Convergio Evolution Engine v2
**Project**: convergio | **Plan ID**: 654 | **Status**: todo

## USER REQUEST
> [See source: .copilot-tracking/prompt-evolution-engine.json]

## CONSTRAINTS (NON-NEGOTIABLE)
| ID | Constraint | Type | Verify |
|----|-----------|------|--------|

## FUNCTIONAL REQUIREMENTS
| ID | Requirement | Wave | Verified |
|----|-------------|------|----------|

## WAVES

### W0: Discovery & Baseline
Status: pending (0/5)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| T0-01 | Architecture ADR for all Evolution Engine subsystems | P0 | claude-opus-4.6 | pending |
| T0-02 | Inventory all existing Convergio telemetry sources | P0 | claude-opus-4.6 | pending |
| T0-03 | Baseline KPI definitions with targets | P0 | claude-opus-4.6 | pending |
| T0-04 | Canonical TypeScript data model for all subsystems | P0 | claude-opus-4.6 | pending |
| T0-05 | ADR: Maranello vs dashboard_web architectural split | P0 | claude-opus-4.6 | pending |

### W1: Telemetry Foundation
Status: pending (0/6)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| T1-01 | Telemetry collector core with buffering and routing | P0 | gpt-5 | pending |
| T1-02 | PII/secrets sanitizer for telemetry pipeline | P0 | gpt-5 | pending |
| T1-03 | Agent telemetry adapter for .claude metrics | P1 | gpt-5 | pending |
| T1-04 | CI/CD telemetry adapter for pipeline metrics | P1 | gpt-5 | pending |
| T1-05 | Runtime/mesh/DB telemetry adapter | P1 | gpt-5 | pending |
| T1-06 | Time-series storage with retention and query API | P0 | gpt-5 | pending |

### W2: Evaluator & Guardrails
Status: pending (0/5)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| T2-01 | Evaluator core with immutability and tamper detection | P0 | claude-opus-4.6 | pending |
| T2-02 | Safety guardrails: budget, rollback, single-target | P0 | claude-opus-4.6 | pending |
| T2-03 | Proposal validation: schema, constraints, risk scoring | P0 | claude-opus-4.6 | pending |
| T2-04 | Cost control: budget limits, monitoring, auto-abort | P0 | gpt-5 | pending |
| T2-05 | Immutability proof test suite for evaluator | P0 | gpt-5 | pending |

### W3: Optimizer Engine Core
Status: pending (0/5)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| T3-01 | Optimizer core: telemetry analysis to proposals | P0 | gpt-5 | pending |
| T3-02 | Proposal format with schema validation | P0 | gpt-5 | pending |
| T3-03 | PR generator: proposals to GitHub draft PRs | P0 | gpt-5 | pending |
| T3-04 | Proposal pipeline: optimizer→evaluator→PR wiring | P0 | gpt-5 | pending |
| T3-05 | Experiment runner with budget/rollback/audit | P0 | gpt-5 | pending |

### W4: Loop Architecture
Status: pending (0/4)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| T4-01 | Daily micro-loop with 24h telemetry scan | P0 | gpt-5 | pending |
| T4-02 | Weekly night runner with deep trend analysis | P0 | gpt-5 | pending |
| T4-03 | Cron scheduler for daily+weekly loops | P1 | gpt-5 | pending |
| T4-04 | Loop architecture integration tests | P1 | gpt-5 | pending |

### W5: Agent Evolution
Status: pending (0/5)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| T5-01 | Agent pattern analyzer from real work data | P1 | claude-opus-4.6 | pending |
| T5-02 | Agent config proposer for model/prompt/tools | P1 | claude-opus-4.6 | pending |
| T5-03 | Agent task replay for safe validation | P1 | claude-opus-4.6 | pending |
| T5-04 | Wire agent evolution into loop architecture | P1 | gpt-5 | pending |
| T5-05 | Agent evolution unit + integration tests | P1 | gpt-5 | pending |

### W6: Platform & Runtime Optimization
Status: pending (0/4)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| T6-01 | CI pipeline optimizer with build/test analysis | P1 | gpt-5 | pending |
| T6-02 | Runtime config optimizer for services | P1 | gpt-5 | pending |
| T6-03 | Database/query optimizer for DB telemetry | P2 | gpt-5 | pending |
| T6-04 | Register platform optimizers as plugins | P1 | gpt-5-mini | pending |

### W7: Maranello & Control Room Integration
Status: pending (0/8)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| T7-01 | Evolution assessment with dashboard_web prior art audit | P1 | claude-opus-4.6 | pending |
| T7-02 | Canary benchmark config using Maranello CI gates | P1 | gpt-5 | pending |
| T7-03 | Add Evolution section to dashboard_web control room | P1 | gpt-5 | pending |
| T7-04 | Proposal widget for dashboard_web using existing patterns | P1 | gpt-5 | pending |
| T7-05 | Experiment timeline widget extending nightly-jobs pattern | P2 | gpt-5 | pending |
| T7-06 | Extend api_server.py with Evolution Engine endpoints | P1 | gpt-5 | pending |
| T7-07 | Wire dashboard_web signals into telemetry collector | P1 | gpt-5 | pending |
| T7-08 | Extract mn-evolution-kpi WC back to Maranello | P2 | gpt-5 | pending |

### W8: Governance, Research & Audit
Status: pending (0/5)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| T8-01 | Governance framework with authority matrix | P1 | claude-opus-4.6 | pending |
| T8-02 | Append-only audit trail for all decisions | P0 | gpt-5 | pending |
| T8-03 | Web research as hypothesis with human gate | P2 | gpt-5 | pending |
| T8-04 | ROI tracker with attribution and trend output | P1 | gpt-5 | pending |
| T8-05 | Wire audit trail into all subsystems | P1 | gpt-5-mini | pending |

### W9: Pilot & Canary Rollout
Status: pending (0/5)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| T9-01 | Shadow mode: full pipeline, no side effects | P0 | gpt-5 | pending |
| T9-02 | Canary gate with Maranello benchmark + rollback | P0 | gpt-5 | pending |
| T9-03 | Promotion pipeline: shadow→canary→staged→full | P0 | gpt-5 | pending |
| T9-04 | First pilot: Maranello bundle size optimization | P1 | gpt-5 | pending |
| T9-05 | Rollout pipeline integration tests | P1 | gpt-5 | pending |

### WF: Closure
Status: pending (0/3)

| Task | Description | Priority | Model | Status |
|------|-------------|----------|-------|--------|
| TF-doc | Complete documentation package | P0 | claude-sonnet-4.6 | pending |
| TF-pr | Final PR with changelog and rollout plan | P0 | gpt-5-mini | pending |
| TF-tests | Final E2E integration test suite | P0 | gpt-5 | pending |

## LEARNINGS LOG
| Wave | Issue | Root Cause | Resolution | Preventive Rule |
|------|-------|------------|------------|-----------------|
