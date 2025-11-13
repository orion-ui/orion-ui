import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
    deps: {
      inline: true,
    },
  },
  plugins: [vue(),
            tsconfigPaths({ projects: [path.resolve(__dirname, '../../tsconfig.json')] })],
  resolve: {
    alias: {
      'packages': path.resolve(__dirname, '../../packages'),
      'utils': path.resolve(__dirname, '../../utils'),
      'services': path.resolve(__dirname, '../../services'),
      'devtool': path.resolve(__dirname, '../../devtool'),
      'lib': path.resolve(__dirname, '../../lib'),
      'assets': path.resolve(__dirname, '../../assets'),
      'lang': path.resolve(__dirname, '../../lang'),
    }
  },
  test: {
    testTimeout: 30000,
    deps: {
      moduleDirectories: [path.resolve(__dirname, '__mocks__'), 'node_modules'],
    },
    onInitialize(config) {
      console.log('Vitest config:', config);
    },
    include: ['test-src/{utils,services}/**/*.test.ts'],
    includeSource: [path.resolve(__dirname, '../../{utils,services,devtool,assets}/**/*.ts').replace(/\\/g, '/')],
    environment: 'jsdom',
    globals: true,
    verbose: true,
    setupFiles: ['./test-src/vitest.setup.ts'],
    reporters: [
      'default',
      [
        'junit',
        {
          suiteName: 'SuiteDeTests',
          outputFile: './test-results/junit-report.xml',
        },
      ],
    ],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['cobertura'],
      reportsDirectory: './coverage/cobertura',
      exclude: [],
      include: [path.resolve(__dirname, '../../{utils,services,devtool,assets}/**/*.ts').replace(/\\/g, '/')],
      allowExternal: true,
      all: true,
      clean: true,
      extension: ['.ts'],
    },
  },
});
