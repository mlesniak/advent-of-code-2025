import test from 'node:test';
import assert from 'node:assert/strict';
import {invalidId} from './day02.js';

test('invalidId', () => {
    assert.equal(invalidId(11), true);
    assert.equal(invalidId(123123), true);
});
