# FEOD rules for this project

- Use `app`, `pages`, `modules`, `common`, `global` as top-level folders.
- Import external modules only through `@/modules/<name>`.
- Do not import files from another module's `ui`, `model`, `api` or `lib`.
- Keep domain-specific code out of `common`.
- Do not create new top-level folders without updating the architecture decision.
