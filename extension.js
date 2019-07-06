// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const exec = require('child_process').exec
const fs = require('fs')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

   // Use the console to output diagnostic information (console.log) and errors (console.error)
   // This line of code will only be executed once when your extension is activated
   console.log('Congratulations, your extension "vsc-invoke" is now active!')

   //var c = vscode.workspace.getConfiguration()
   //if ( c.has('vsc-invoke.invoke.paaaath') ) {
   //  console.log('Found section')
   //}

   // Look config for 'vsc-invoke.invoke.path' that defines custom path to invoke command
   let invokeCmd = 'invoke'
   let c = vscode.workspace.getConfiguration()
   if (c.has('vsc-invoke.invoke.cmd')) {
      invokeCmd = c.get('vsc-invoke.invoke.cmd')
   }
   //let invokeExecPath = vscode.workspace.getConfiguration('vsc-invoke').get('invoke.path')
   //let invokeCmd = invokeExecPath ? invokeExecPath+"invoke" : 'invoke'
   console.log('Using this command: ' + invokeCmd)

   // The command has been defined in the package.json file
   // Now provide the implementation of the command with  registerCommand
   // The commandId parameter must match the command field in package.json
   let showVersion = vscode.commands.registerCommand('extension.invokeVersion', function () {
      exec(invokeCmd + ' -V', function (err, stdOut, stdErr) {
         if (err) {
            vscode.window.showInformationMessage(stdErr)
         }
         else {
            vscode.window.showInformationMessage(stdOut)
         }
      })
   })

   let callTask = vscode.commands.registerCommand('extension.invokeTask', function () {

      if (!vscode.workspace.workspaceFolders) {
         vscode.window.showErrorMessage('No Project/Workspace opened')
         return
      }

      // Current file open to help find active workspace
      var currentFile
      // Default to first workspace in case we don't have an open file or
      // can't find a tasks.py file
      var path = vscode.workspace.workspaceFolders[0].uri.path
      // Determine path to currently open and active file
      if (vscode.window.activeTextEditor) {
         currentFile = vscode.window.activeTextEditor.document.uri.path
      }
      // For each workspace see if folder matches path of currently open
      // file, i.e. are we in the active workspace
      vscode.workspace.workspaceFolders.forEach((folder, _index) => {
         const p = folder.uri.fsPath
         if (currentFile && currentFile.startsWith(p)) {
            // Is there a tasks.py at the root of the active workspace?
            if (fs.existsSync(`${p}/tasks.py`) || fs.existsSync(`${p}/tasks`)) {
               // Use active workspace path 
               path = p
            }
         }
         // Otherwise grab with workspace with a tasks.py file
         else {
            if (fs.existsSync(`${p}/tasks.py`) || fs.existsSync(`${p}/tasks`)) {
               // Use active workspace path 
               path = p
            }
         }
      })
      if (fs.existsSync(`${path}/tasks.py`)) {
         vscode.window.showInformationMessage("Using task definitions: " + path + "/tasks.py")
      }
      if (fs.existsSync(`${path}/tasks`)) {
         vscode.window.showInformationMessage("Using tasks package definitions: " + path + "/tasks")
      }
      if (!fs.existsSync(`${path}/tasks.py`) && !fs.existsSync(`${path}/tasks`)) {
         vscode.window.showErrorMessage('No task definition file found (tasks or tasks.py)')
         return
      }
      // Get list of tasks. --list-format returns JSON
      exec(`cd ${path} && ${invokeCmd} --list --list-format=json`, function (err, stdOut, stdErr) {
         if (err) {
            vscode.window.showErrorMessage(`Unable to get list of tasks in ${path}: ${stdErr}`)
            return
         }
         // Parse JSON result
         // Get tasks that are part of collections. This will only go 1 level deep.
         // For each collection maps tasks' name (internally Invoke adds '-<collection-name>'
         // to the name, so remove that)
         // Final reduce is to flatten returned aray
         var collections = JSON.parse(stdOut).collections
            .map(c => c.tasks.map(t => c.name + '.' + t.name.replace(new RegExp(`-${c.name}$`), '')))
            .reduce((prev, cur) => prev.concat(cur), [])
         // Get simple tasks and add tasks from collections from above 
         var tasks = JSON.parse(stdOut).tasks.map(e => e.name).concat(collections)
         var lastArgs = ''
         vscode.window.showQuickPick(tasks, { placeHolder: "Select or type a task" }).then(function (aTask) {
            if (typeof aTask != 'undefined') {
               console.log('Task selected: ')
               console.log(aTask)
               vscode.window.showInputBox({ prompt: "Task arguments", placeHolder: "arguments", value: this.lastArgs }).then(function (args) {
                  // args is undefined if the user escaped
                  if (typeof args != 'undefined') {
                     if (args) this.lastArgs = args
                     var term = vscode.window.createTerminal(`Invoke ${aTask}`)
                     term.show()
                     term.sendText(`${invokeCmd} ${aTask} ${args}`)
                  }
               })
            }
         })
      })

   })

   context.subscriptions.push(showVersion)
   context.subscriptions.push(callTask)
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate