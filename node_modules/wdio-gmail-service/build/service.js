import { check_inbox } from 'gmail-tester';
export default class GmailService {
    constructor(serviceOptions) {
        this._credentialsJsonPath = serviceOptions.credentialsJsonPath;
        this._tokenJsonPath = serviceOptions.tokenJsonPath;
        this._intervalSec = serviceOptions.intervalSec ?? 10;
        this._timeoutSec = serviceOptions.timeoutSec ?? 60;
    }
    async before(_, __, browser) {
        browser.addCommand('checkInbox', this._checkInbox.bind(this));
    }
    async _checkInbox({ from, to, subject, includeBody = true, before, after, includeAttachments = false, label = 'INBOX' }) {
        if (!from && !to && !subject) {
            throw new Error('At least one of `from`, `to` or `subject` need to be provided to checkInbox');
        }
        if (typeof this._credentialsJsonPath !== 'string') {
            throw new Error('Service option "credentialsJsonPath" not set, but required');
        }
        if (typeof this._tokenJsonPath !== 'string') {
            throw new Error('Service option "tokenJsonPath" not set, but required');
        }
        const wait_time_sec = this._intervalSec;
        const max_wait_time_sec = this._timeoutSec;
        return await check_inbox(this._credentialsJsonPath, this._tokenJsonPath, {
            from,
            to,
            subject,
            include_body: includeBody,
            before,
            after,
            include_attachments: includeAttachments,
            label,
            wait_time_sec,
            max_wait_time_sec
        });
    }
}
