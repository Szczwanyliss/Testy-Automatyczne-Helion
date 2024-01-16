import type { Services } from '@wdio/types';
import { WdioGmailServiceOptions } from './types.js';
export default class GmailService implements Services.ServiceInstance {
    private _credentialsJsonPath;
    private _tokenJsonPath;
    private _intervalSec;
    private _timeoutSec;
    constructor(serviceOptions: WdioGmailServiceOptions);
    before(_: never, __: never, browser: WebdriverIO.Browser): Promise<void>;
    private _checkInbox;
}
//# sourceMappingURL=service.d.ts.map