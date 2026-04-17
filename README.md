FRONTEND
- npm run dev
- pnpm install package-name

BACKEND
- Data:
  - Create migration
    - dotnet ef migrations add MigrationName
  - Apply migration
    - dotnet ef database update

  - Generate SQL script
    - dotnet ef migrations script
  - List: dotnet ef migrations list