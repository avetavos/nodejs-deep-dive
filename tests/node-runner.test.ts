import { describe, it, expect } from 'vitest';
import { buildJsSrcdoc, wantsStrict } from '../src/components/node-runner';

describe('wantsStrict', () => {
  it('detects a leading directive, also after marker comments', () => {
    expect(wantsStrict("'use strict';\nfoo()")).toBe(true);
    expect(wantsStrict("// @browser\n'use strict';\nfoo()")).toBe(true);
    expect(wantsStrict('"use strict";')).toBe(true);
  });
  it('ignores a directive that is not in the prologue', () => {
    expect(wantsStrict("foo();\n'use strict';")).toBe(false);
    expect(wantsStrict("// 'use strict' mentioned in a comment\nfoo()")).toBe(false);
  });
});

describe('buildJsSrcdoc', () => {
  it('puts the directive first inside the wrapper so it takes effect', () => {
    const doc = buildJsSrcdoc("// @browser\n'use strict';\nconsole.log(1)");
    expect(doc).toContain("(async function(){'use strict';");
  });
  it('leaves sloppy snippets sloppy', () => {
    expect(buildJsSrcdoc('console.log(1)')).not.toContain("(async function(){'use strict'");
  });
});
