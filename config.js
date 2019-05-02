'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/cce';
    // You can define a test database url in Travis under Settings
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                      'mongodb://127.0.0.1/test-character-app';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';