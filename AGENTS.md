# Repository Guidelines

## Project Structure & Module Organization
This repository is currently a minimal scaffold. Keep new code organized using standard Go layout:
- `cmd/password-gen/`: CLI entrypoint (`main.go`).
- `internal/`: non-exported application logic (generation rules, validators).
- `pkg/`: reusable public packages only when needed.
- `testdata/`: fixtures used by tests.
- `docs/`: design notes and usage examples.

Prefer small focused packages. Keep password policy logic separate from CLI I/O.

## Build, Test, and Development Commands
Use Go tooling directly:
- `go mod tidy`: sync dependencies.
- `go build ./...`: compile all packages.
- `go test ./...`: run all tests.
- `go test -cover ./...`: run tests with coverage.
- `go run ./cmd/password-gen --length 20`: run the CLI locally.

Run `go test ./...` before opening a PR.

## Coding Style & Naming Conventions
- Follow standard Go formatting: run `gofmt -w .` (or `go fmt ./...`).
- Use `go vet ./...` for static checks.
- Package names: short, lowercase, no underscores.
- File names: lowercase, descriptive (e.g., `generator.go`, `policy_test.go`).
- Exported identifiers: `CamelCase`; unexported: `camelCase`.
- Prefer table-driven tests and explicit error handling (`if err != nil`).

## Testing Guidelines
- Use Go’s built-in `testing` package.
- Place tests in `*_test.go` files beside the code they validate.
- Name tests like `TestGeneratePassword_ValidLength`.
- Cover boundary cases (min/max length, empty charset, invalid policy).
- Aim for meaningful coverage of core generation and validation logic (target: >=80% for core packages).

## Commit & Pull Request Guidelines
No established Git history is available yet; use this convention going forward:
- Commit format: `type(scope): summary` (e.g., `feat(cli): add length flag`).
- Keep commits small and single-purpose.
- PRs should include:
  - What changed and why.
  - Test evidence (`go test ./...` output summary).
  - Linked issue (if applicable).
  - Example CLI usage for behavior changes.

## Security & Configuration Tips
Never commit real secrets or generated passwords used in production. Keep defaults secure (strong charset, sensible minimum length), and validate all user-supplied flags.
