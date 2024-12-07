module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            1,
            'always',
            [
                'feat',     // New feature
                'fix',      // Bug fix
                'docs',     // Documentation
                'style',    // Formatting, missing semi colons, etc
                'refactor', // Code change that neither fixes a bug nor adds a feature
                'perf',     // Code change that improves performance
                'test',     // Adding tests
                'chore',    // Maintain
                'revert',   // Revert changes
                'ci',       // CI/CD related changes
            ]
        ]
    }
  };