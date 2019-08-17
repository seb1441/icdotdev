---
id: editors
title: Editors
---

The IC project source and parameters files have an `.ic` and an `.icp`
extension, respectively, and contain Python code. However, it is only a
**subset of Python** intended for expressing infrastructure
configurations in the context of the IC project.

In general, you have to associate the `.ic` and `.icp` extensions with
your editor's Python syntax highlighter while disabling other
Python-related features for these extensions.

## Visual Studio Code

1. Install the [Python extension][vscode-pythonext].

2. Update your [editor's settings][vscode-settings] as follows:

   ```json
   {
     "files.associations": {
       "*.ic": "python",
       "*.icp": "python"
     },
     "python.linting.ignorePatterns": ["**/*.ic", "**/**.icp"]
   }
   ```

[vscode-pythonext]: https://marketplace.visualstudio.com/items?itemName=ms-python.python
[vscode-settings]: https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations
