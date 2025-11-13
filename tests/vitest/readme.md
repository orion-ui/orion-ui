# pour installer

## faire un npm à la racine du frontend

```
npm install
```

## dans le repertoire vitest

```
npm install

```

## pour lancer les tests en cli

```
npm run test
```

## pour lancer les tests en cli avec coverage sans rapport

```
npm run test:coverage
```

## pour lancer les tests avec l export cobertura et l'export des tests en junit

```
npm run test:reports:cobertura
```

le rapport cobertura est initié sous l'arborescence ./tests/vitest/coverage/cobertura/cobertura-coverage.xml
le rapport junit est initié sous l'arborescence ./tests/vitest/test-results/junit-report.xml

# pour configurer

## vitest/__mocks__

les mocks utilisés dans les tests

## vitest/test-src

les tests sur les repertoires