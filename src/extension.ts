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



	const provider2 = vscode.languages.registerCompletionItemProvider(
		'plaintext',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				const linePrefix = document.lineAt(position).text.slice(0, position.character);
				if (linePrefix.endsWith('glorb') || linePrefix.endsWith('blorb')) {
				
				
				const test = new vscode.CompletionItem('glorb'); // Do-While loop shortcut
				test.insertText = new vscode.SnippetString('asdfasdfasdf');
				// return [
				// 	new vscode.CompletionItem('out.print', vscode.CompletionItemKind.Method),
				// 	new vscode.CompletionItem('test', vscode.CompletionItemKind.Method),
				// 	new vscode.CompletionItem('colin', vscode.CompletionItemKind.Method),
				// ];

				const t2 = new vscode.CompletionItem('blorb'); // Do-While loop shortcut
				t2.insertText = new vscode.SnippetString('asdfasdfasdf');

				return [test, t2];

				}
			}
		},  // triggered whenever a '.' is being typed
	);

	context.subscriptions.push(provider1, provider2);
}


module.exports = {
    activate,
    deactivate
};




// This method is called when your extension is deactivated
export function deactivate() {}
