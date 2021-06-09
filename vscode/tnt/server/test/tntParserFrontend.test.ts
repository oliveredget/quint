import 'mocha';
import { assert } from 'chai';
import { ErrorMessage, ParseErrors, parseModule } from "../src/parser/tntParserFrontend";
import { readFileSync } from 'fs';
import { resolve } from 'path';


function readTest(name: string): string {
	const p = resolve(__dirname, '../testFixture', name + ".tnt")
	return readFileSync(p).toString('utf8')
}

describe('parse empty module', () => {
	it('no parse errors', () => {
	  const result = parseModule(readTest("_0001emptyModule"));
	  assert.deepEqual(result, {kind: 'ok'}, "expected ok")
	}); 
  });

describe('parse module with error', () => {
	it('error message on error in module', () => {
		const result = parseModule(readTest("_0002emptyWithError"));
		const msg: ErrorMessage = {
			explanation: "TNT001: expected a const, var, def, typedef, etc.",
			 lineNo: 4,
			 charNo: 0,
			 length: 3
		};
		const expected: ParseErrors = { kind: 'error', messages: [ msg ] };
		assert.deepEqual(result, expected, "expected error");
	}); 
  });
