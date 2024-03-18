# ayapingping-ts

![npm package](https://nodei.co/npm/ayapingping-ts.png?downloads=true&downloadRank=true&stars=true)

![version](https://img.shields.io/npm/v/ayapingping-ts.svg?style=flat)
![download](https://img.shields.io/npm/dt/ayapingping-ts.svg?style=flat)
![dependents](https://img.shields.io/librariesio/dependents/npm/ayapingping-ts.svg?style=flat)

![build](https://img.shields.io/circleci/project/github/dalikewara/ayapingping-ts.svg?style=flat)
![language](https://img.shields.io/github/languages/top/dalikewara/ayapingping-ts.svg?style=flat)
![issue](https://img.shields.io/github/issues/dalikewara/ayapingping-ts.svg?style=flat)
![last_commit](https://img.shields.io/github/last-commit/dalikewara/ayapingping-ts.svg?style=flat)
![github_tag](https://img.shields.io/github/v/tag/dalikewara/ayapingping-ts.svg?style=flat)
![github_license](https://img.shields.io/github/license/dalikewara/ayapingping-ts.svg?style=flat)

**ayapingping-ts** generates standard project structure to build applications in NodeJS-TypeScript that follow Clean
Architecture and Feature-Driven Design concept.

> Golang variant: [ayapingping-go](https://github.com/dalikewara/ayapingping-go)

> Python variant: [ayapingping-py](https://github.com/dalikewara/ayapingping-py)

## Requirements

- NodeJS>=20.11.1
- Operating systems supporting `/bin/sh` with **POSIX** standards ([WHY?](https://github.com/dalikewara/ayapingping-sh)).
  **Linux** and **macOS** should have no issues here as they support it by default. For **Windows** users, consider using WSL instead

## Getting started

### Installation

You can use the `npm install -g` method to install as global:

```bash
npm install -g ayapingping-ts
```

#### Possible issue

If you're facing a warning or an error like **PERMISSION DENIED** when installing globally, it's likely due to an issue
with your Node.js installation, possibly related to your global directory or **PATH**.
To resolve this, you can follow the instructions at [https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally).

On the command line, in your home directory, create a directory for global installations:

```bash
mkdir ~/.npm-global
```

Configure npm to use the new directory path:

```bash
npm config set prefix '~/.npm-global'
```

Open your shell configuration file (e.g., `.bashrc`, `.zshrc`, `.profile`, or similar) and add the following line:

```bash
export PATH=~/.npm-global/bin:$PATH
```

Then, restart your shell or run:

```bash
source ~/.bashrc   # or source ~/.zshrc, ~/.profile or similiar
```

This will make the changes take effect immediately.

### Usage

To generate a new project, simply run the `ayapingping-ts` command:

```bash
ayapingping-ts
```

Then enter your project name, the **ayapingping-ts** generator will set up the project for you.

![Alt Text](https://lh3.googleusercontent.com/drive-viewer/AKGpihZVKfRP1YbgPEilKjEypqE84gyuFpsONb8qqVY2qrnZsAkBo68gqR1UioKlq0G2gW_kCZqFVIPYA7kbRJBrRqb-vl3OnA=w840-h939)

> The animated example uses the Golang version, but it essentially follows the same approach

### What's next?

Simply start working on your project and make changes.

## Project Structure

To implement the concept of Clean Architecture and ~~Domain-Driven Design~~ Feature-Driven Design, and to keep them understandable, we structure the project like this:

### main.go

- In this file, you initialize dependencies, injections, and anything required to start and run your application.
- You can use the command `tsc && tsc-alias && node ./dist/main.js` or `make start` to run your application.

### domain

- The **Domain** represents your primary business model or entity
- Define your main object models or properties for your business here, including database models, DTOs (Data Transfer Objects), etc
- Keep this package as straightforward as possible. Avoid including any code that is not directly related to the model itself
- If a **Feature** imports anything from this location, and you want the **Feature** to be accessible through the `importFeature` or `exportFeature` command
  without the risk of missing package errors, **DON'T FORGET** to include them in the `features/yourFeature/dependency.json` file

### features

- A **Feature** encapsulates your main business feature, logic, or service
- Here, you include everything necessary to ensure the proper functioning of the feature
- Please prioritize **Feature-Driven Design**, ensuring that features can be easily adapted and seamlessly integrated and imported into different projects
- If another **Feature** imports anything from this location (the current **Feature**), and you want the current **Feature** to be
  accessible through the `importFeature` or `exportFeature` command without the risk of missing package errors, **DON'T FORGET** to include them in the `dependency.json` file
- The `dependency.json` is **OPTIONAL**, and **ONLY USEFUL WHEN** you use the `importFeature` command. It serves to define
  the **Feature** dependencies and avoids possible missing package errors
- A standard **Feature** comprises the following parts: `delivery`, `repositories`, `usecases` and `utility`
  - **delivery**
    - Hosts feature handlers like HTTP handlers, gRPC handlers, cron jobs, or anything serving between the client and your application or feature
    - For config variables, external clients, or use cases, pass or inject them as dependencies
  - **repositories**
    - Handles communication with external data resources like databases, cloud services, or external services
    - Keep your repositories as simple as possible; avoid adding excessive logic
    - If necessary, separate operations into smaller methods
    - Changes outside the `repositories` should not affect them (except changes for business domain/model/entity)
    - For config variables, database frameworks, or external clients, pass or inject them as dependencies
  - **usecases**
    - Contains the main feature logic
    - Changes outside the `usecases` should not impact them (except changes for business domain/model/entity and repositories)
    - For config variables, external clients, or repositories, pass or inject them as dependencies
  - **utility**
    - Accommodates functions tailored to help with common tasks specifically for the **Feature**—treat them as helpers
- Feel free to adopt your own style as long as it aligns with the core concept

### common

- In this place, you can implement various functions to assist you in performing common tasks—consider them as helpers
- Common functions can be directly called from any location
- If a **Domain** or **Feature** imports anything from this location, and you want the **Feature** to be accessible through
  the `importFeature` or `exportFeature` command without the risk of missing package errors, **DON'T FORGET** to include
  them in the `features/yourFeature/dependency.json` file

### infra

- This is the location to house infrastructure configurations or scripts to facilitate the deployment of your project on a server or VM

### Make It Your Own

Feel free to create your own style to suit your requirements, as long as you still follow the main architecture concept.
You can create folders such as `migration` to store your database migrations, `tmp` for temporary files, etc.

## Importing Features from Another Project

To seamlessly incorporate or import features from another project, use the `importFeature` command:

```bash
ayapingping-ts importFeature [feature1,feature2,...] from [/local/project or https://example.com/user/project.git or git@example.com:user/project.git]
```

For example:

```bash
ayapingping-ts importFeature exampleFeature from /path/to/your/project
```

```bash
ayapingping-ts importFeature exampleFeature1,exampleFeature2 from git@github.com:username/project.git
```

### Feature dependency

If your feature relies on external packages, it's crucial to address dependencies properly during the import process.
Failure to import necessary dependencies may result in missing packages. To prevent this, please document your feature
dependencies in the `dependency.json` file. Supported dependencies are limited to the following directories: `domain`, `common`, and `features`.
Ensure that your feature dependencies strictly adhere to these directories, avoiding reliance on other locations.
You can also include any external packages to `externals` param to install them automatically using the `npm install` method.

Example `dependency.json` file:

```json
{
  "domains": [
    "domain1.ts",
    "domain2.ts"
  ],
  "features": [
    "feature1",
    "feature2"
  ],
  "commons": [
    "commonFunction1.ts",
    "commonFunction2.ts"
  ],
  "externals": [
    "dotenv@16.4.5",
    "express@4.18.3",
    "mysql2@3.9.2"
  ]
}
```

## Other Commands

There are several commands similar to `importFeature` above, such as `importDomain`, `importCommon`, `exportFeature`, `exportDomain`, etc.
They function in the same way, for example:

```bash
ayapingping-ts importDomain example.ts from /path/to/your/project
```

```bash
ayapingping-ts importCommon commonFunction1.ts from https://example.com/user/project.git
```

For `export` command, the behavior is similar to the `import` command, but now uses `export` as the prefix and `to` instead of
`from` when pointing to the source, for example:

```bash
ayapingping-ts exportFeature exampleFeature to /path/to/your/project
```

For more detail and explanation, please visit [ayapingping-sh](https://github.com/dalikewara/ayapingping-sh)

## Release

### Changelog

Read at [CHANGELOG.md](https://github.com/dalikewara/ayapingping-ts/blob/master/CHANGELOG.md)

### Credits

Copyright &copy; 2024 [Dali Kewara](https://www.dalikewara.com)

### License

[MIT License](https://github.com/dalikewara/ayapingping-ts/blob/master/LICENSE)
