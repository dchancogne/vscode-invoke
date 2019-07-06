# Visual Studio Code extension for Invoke

Invoke is a Python (2.7 and 3.4+) task execution tool & library, drawing inspiration from various sources to arrive at a powerful & clean feature set.

This VS Code extension lets you execute tasks directly from your editor.

## Features

Use the command palette (`CMD + SHIFT + P`) and type `invoke`. Once you call the extension, a list of all tasks available will be displayed. Select the one you want to run. If your task requires any argument you can specify them next.

### Which `tasks.py` file is used?

This extension will make best effort to use the proper `tasks.py` file:
   - If a file is open in the editor, the extension will look for a `tasks.py` file at the top level of the folder that file is in
   - Otherwise the extension will use the first `tasks.py` file found at the top level of the folders in the Workspace.

## Requirements

Invoke needs to be installed on your system. If the `invoke` command is not available in your path you can use the user settings variable `vsc-invoke.invoke.cmd` to define the path where `invoke` lives. This is the path to the `invoke` command (including `invoke` itself) that a shell should know to execute. This alaso allows you to specify a different name for the `invoke` command if it is installed under a different name on your system (e.g. `Invoke.py`)

### 0.0.1
Initial release

### 0.0.2
Documentation improvements

### 0.0.3
Documentation improvements

### 0.0.4
Added debug info to display error when failing to load tasks

### 0.0.5
Added logic to try to discover a `tasks.py` file when there are multiple folders in the Workspace

### 0.0.6
Introduced used setting `vsc-invoke.invoke.path` to define path to `invoke` command if it's not available in your path

### 0.0.7
Rename `vsc-invoke.invoke.path` to `vsc-invole.invoke.cmd` to include the full path to `invoke`. Fixed a few gugs.

### 0.0.8
Requires `invoke` version 1.x or better (technically 0.23.0 or better will work) to leverage the new JSON output format for tasks list

### 0.0.9
Handles more complex tasks definition that use collections

### 0.0.10
Add support for tasks package/collection

### 0.0.11
Better support for Windows (handling of files path)

### 0.0.12
Better handling of collections