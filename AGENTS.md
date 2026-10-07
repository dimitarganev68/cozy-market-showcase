<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the storefront in TanStack Start and React because the hosting environment does not support Laravel.
- Define storefront styling through semantic tokens and reusable classes in the global stylesheet to keep the visual system consistent.
- Product browsing is an informational catalog, not a checkout; do not imply orders are submitted without a connected ordering service.
