# Sample env file

Create a file named `.env.[environment]` (e.g., `.env.development`) and place it in this directory. Copy the below properties and populate them with the appropriate values for that environment. Make sure not to commit any env files to the repository. The gitignore is already setup to ignore any files containing `.env` in their name.

Properties prefixed with `VITE_` can be accessed in the source code via `import.meta.env.[property-name]`. Properties without the prefix will be undefined.

The following order of precedence (from highest to lowest) is followed when loading properties from env files.

1. `.env.[environment].local`
2. `.env.[environment]`
3. `.env.local`
4. `.env`

```

```
