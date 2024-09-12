import * as vscode from 'vscode';

let noCommas: boolean = false;


export function activate(context: vscode.ExtensionContext) {

	const noCommasDisp = vscode.commands.registerCommand('java-shortcuts.noCommas', () => {
		noCommas = !noCommas;

	})

	context.subscriptions.push(noCommasDisp);



	const provider1 = vscode.languages.registerCompletionItemProvider({ language: 'java', scheme: 'file' }, {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			const linePrefix = document.lineAt(position).text.slice(0, position.character);
			if ((linePrefix.endsWith('sout') || linePrefix.endsWith('for') || linePrefix.endsWith('while') || linePrefix.endsWith('doWhile') || linePrefix.endsWith('soutln') ||  linePrefix.endsWith('sqrt') || linePrefix.endsWith('abs') || linePrefix.endsWith('ran'))){


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

			// Math Shortcuts

			const sqrtComplete = new vscode.CompletionItem('sqrt');
			sqrtComplete.insertText = new vscode.SnippetString('Math.sqrt($1)$0');

			const absComplete = new vscode.CompletionItem('abs');
			absComplete.insertText = new vscode.SnippetString('Math.abs($1)$0');

			const randomComplete = new vscode.CompletionItem('ran');
			randomComplete.insertText = new vscode.SnippetString('Math.random($1)$0');


			return [
				printCompletion,
				printlnCompletion,
				forComplete,
				forEachComplete,
				whileComplete,
				doWhileComplete,
				sqrtComplete,
				absComplete,
				randomComplete,
			];}

			// Multiple Argument Shortcuts, noComma command chooses
			if ((linePrefix.endsWith('min') || linePrefix.endsWith('max')) && noCommas){
				const minComplete = new vscode.CompletionItem('min');
				minComplete.insertText = new vscode.SnippetString('Math.min($1)$0');
	
				const maxComplete = new vscode.CompletionItem('max');
				maxComplete.insertText = new vscode.SnippetString('Math.max($1)$0');


				return [
					minComplete,
					maxComplete,
				]

			}

			if ((linePrefix.endsWith('min') || linePrefix.endsWith('max')) && !noCommas){
				const minComplete = new vscode.CompletionItem('min');
				minComplete.insertText = new vscode.SnippetString('Math.min($1,$2)$0');

				const maxComplete = new vscode.CompletionItem('max');
				maxComplete.insertText = new vscode.SnippetString('Math.max($1,$2)$0');

				return [
					minComplete,
					maxComplete
				]
			}

		}
	});


	context.subscriptions.push(provider1);
}

module.exports = {
    activate,
    deactivate
};

export function deactivate() {}
