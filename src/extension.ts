// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {



	const provider1 = vscode.languages.registerCompletionItemProvider({ language: 'java', scheme: 'file' }, {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			const linePrefix = document.lineAt(position).text.slice(0, position.character);
			if (linePrefix.endsWith('sout') || linePrefix.endsWith('for') || linePrefix.endsWith('while') || linePrefix.endsWith('doWhile') || linePrefix.endsWith('soutln')){


			const printCompletion = new vscode.CompletionItem('sout'); // shortcut for 'System.out.print'
			printCompletion.insertText = new vscode.SnippetString('System.out.print("$1")$0');

			const printlnCompletion = new vscode.CompletionItem('soutln'); // shortcut for 'System.out.println'
			printlnCompletion.insertText = new vscode.SnippetString('System.out.println($1)$0');

			const forComplete = new vscode.CompletionItem('for'); // Iterative for-loop shortcut
			forComplete.insertText = new vscode.SnippetString('for ($1;$2;$3;){\n\t$0\n}');
			forComplete.detail = 'For Loop';
			

			const forEachComplete = new vscode.CompletionItem('for'); // For-earch loop shortcut
			forEachComplete.insertText = new vscode.SnippetString('for ($1: $2){\n\t$0\n}');
			forEachComplete.detail = 'For-Each loop';
			

			const whileComplete = new vscode.CompletionItem('while'); // While loop shortcut
			whileComplete.insertText = new vscode.SnippetString('while ($1){\n\t$0\n}');

			const doWhileComplete = new vscode.CompletionItem('dowhile'); // Do-While loop shortcut
			doWhileComplete.insertText = new vscode.SnippetString('do{\n\t$0\n}\nwhile($1);');

			

			// return all completion items as array
			return [
				printCompletion,
				printlnCompletion,
				forComplete,
				forEachComplete,
				whileComplete,
				doWhileComplete,
			];}

		}
	});


	context.subscriptions.push(provider1);
}


module.exports = {
    activate,
    deactivate
};




// This method is called when your extension is deactivated
export function deactivate() {}
