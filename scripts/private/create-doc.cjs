// @ts-nocheck
const path = require('path');
const { readFile, readdir, writeFile, mkdir, existsSync } = require('fs-extra');
const { Project, SyntaxKind, ScriptKind, Node } = require('ts-morph');
const { spinner, log, note } = require('@clack/prompts');
const { exec } = require('child_process');
const { unique, sleep } = require('radash');
const { PrivatePackagesFolder } = require('../scripts-utils.cjs');

/**
 * Change or comment the content or this array
 * to test doc data generator only on selected components
 */
/* const testOnPackages = [
	'Alert',
	'Aside',
	'Card',
	'Avatar',
	'Button',
	'Checkbox',
	'Datepicker',
	'Notif',
	'TabPane',
	'Tour',
]; */

const packageDocDataTemplate = `[
		'{packageName}',
		{packageData},
	],`;

const sharedProps = new Map();
const cleanString = /^'|'$/g;


/**
 * @typedef {Record<string, any>} PackageData
 *
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 * @property {boolean} [verbose]
 */

module.exports.default = async (/** @type {Options} */ options) => {
	if (!existsSync(path.resolve(process.cwd(), 'dist'))) {
		throw `./dist folder missing. You should first build the lib locally`;
	}

	const factory = new DocFactory(options);
	await factory.scanPackages();
	await factory.writeFilePackagesDataDocFile();
	const serviceFactory = new ServiceFileScanner(options);
	await serviceFactory.scanServices();
	await serviceFactory.writeFileServicesDataDocFile();
	await serviceFactory.writeFileToolsDataDocFile();

	const globalTypesFactory = new globalTypeFileScanner(options);
	await globalTypesFactory.scanGlobalTypes();
	await globalTypesFactory.writeFileTypesDataDocFile();
};


class DocUtility {
	missingDoc = `Missing @doc`;
	docFlags = {
		en: '',
		fr: '',
		private: '',
	};

	packagesFolderPath = path.resolve(__dirname, '../../packages');
	servicesFolderPath = path.resolve(__dirname, '../../services');
	toolsFolderPath = path.resolve(__dirname, '../../utils');
	globalTypesFolderPath = path.resolve(__dirname, '../../lib');
	packagesFolderRelativePath = this.packagesFolderPath.replace(process.cwd(), '');

	extractDocFlags (/** @type {string} */ text) {
		return {
			en: (text.match(/@doc (.|\s)*?\n/g)?.map(x => x.replace('@doc ', '')) ?? []).join(''),
			fr: (text.match(/@doc\/fr (.|\s)*?\n/g)?.map(x => x.replace('@doc\/fr ', '')) ?? []).join(''),
			private: (text.match(/@doc\/private (.|\s)*?\n/g)?.map(x => x.replace('@doc\/private ', '')) ?? []).join(''),
		};
	}

	getDoc (/** @type {string} */ regexPattern, flags = 'gm') {
		if (this.docFlags === undefined) log.error(`Forgot to extract doc flags`);
		const privateRegexWithDesc = new RegExp(regexPattern, flags);
		const privateRegexWithoutDesc = new RegExp(regexPattern.replace(' (.*)$', '$'), flags);
		return {
			en: new RegExp(regexPattern, flags).exec(this.docFlags.en)?.[1] ?? this.missingDoc,
			fr: new RegExp(regexPattern, flags).exec(this.docFlags.fr)?.[1] ?? this.missingDoc,
			private: privateRegexWithDesc.test(this.docFlags.private) || privateRegexWithoutDesc.test(this.docFlags.private),
		};
	}

	getPropsDesciption (/** @type {string} */ name) {
		log.warn('Getting prop description for:', name);
		const desc = this.getDoc(`props\/${name} (.*)$`);
		return desc;
	}
}


class DocScanner extends DocUtility {
	constructor (/** @type {Options} */ options, /** @type {Project} */ tsMorphProject, /** @type {string} */ pack) {
		super();
		this.options = options;
		this.project = tsMorphProject;
		this.pack = pack;
	}
}


class DocFactory extends DocUtility {
	/** @type {Array<{ package: string, data: PackageData }>} */
	packagesDataDocFile = [];

	constructor (/** @type {Options} */ options) {
		super();
		this.options = options;
		this.packages = [];

		this.docFolderPath = path.resolve(__dirname, '../../docs');
		this.docFolderRelativePath = this.docFolderPath.replace(process.cwd(), '');
	}

	async setPackagesList () {
		this.packages = (await readdir(this.packagesFolderPath)).filter((x) => {
			return testOnPackages.length
				? !(/(\.d)?\.ts$/).test(x) && testOnPackages.includes(x)
				: !(/(\.d)?\.ts$/).test(x) && !PrivatePackagesFolder.includes(x);
		});
	}

	createTsMorphProject () {
		this.project = new Project({
			compilerOptions: {
				allowJs: true,
				baseUrl: './',
				declaration: true,
				emitDeclarationOnly: true,
				'paths': { 'packages': path.resolve(__dirname, '../../packages') },
			},
			skipAddingFilesFromTsConfig: true,
		});
	}

	async scanPackages () {
		this.createTsMorphProject();

		await this.setPackagesList();

		if (this.options?.verbose) note(this.packages.join('\n'));

		await this.parseSharedProps();

		const scanSpinner = spinner();
		scanSpinner.start(`Scanning ${this.packages.length} packages`);
		await sleep(1000);

		for await (const pack of this.packages) {
			const vueFileScanner = new VueFileScanner(this.options, this.project, pack);
			const vueFileData = await vueFileScanner.scan();

			const setupServiceDtsFileScanner = new SetupServiceDtsFileScanner(this.options, this.project, pack);
			const setupServiceDtsFileData = await setupServiceDtsFileScanner.scan();

			const setupServiceFileScanner = new SetupServiceFileScanner(this.options, this.project, pack);
			const setupServiceFileData = await setupServiceFileScanner.scan();

			this.packagesDataDocFile.push({
				package: pack,
				data: {
					...vueFileData,
					...setupServiceFileData,
					...setupServiceDtsFileData,
				},
			});
		}

		scanSpinner.stop(`${this.packages.length} packages scanned`);
	}

	async writeFilePackagesDataDocFile () {
		const filePath = path.resolve(this.docFolderPath, 'packages-doc-data.ts');
		let content = await readFile(path.resolve(__dirname, 'templates/packages-doc-data.tstemplate'), { encoding: 'utf-8' });

		content = content.replace(/{data}/gm, this.packagesDataDocFile.map((pack) => {
			return packageDocDataTemplate
				.replace(/{packageName}/gm, pack.package)
				.replace(/{packageData}/gm, this.formatPackageDataForWriteFile(pack.data));
		}).join('\n\t'));

		if (this.options.verbose) {
			note(`🥨 --> Orion would write following content in ${this.docFolderRelativePath}`);
			log.message(content);
		}

		if (!this.options.dryRun) {
			await mkdir(this.docFolderPath, { recursive: true });
			await writeFile(filePath, content, 'utf8');
			log.step(`🥨 --> Lint output file for packages`);
			exec(`npx eslint --fix "${filePath}"`);
		}
	}

	formatPackageDataForWriteFile (/** @type {PackageData} */ data) {
		const dataToInsert = [];
		Object.keys(data).forEach((dataKey) => {
			let dataContent = `${dataKey}: {dataContent},`;
			dataContent = dataContent
				.replace(/{dataContent}/gm, JSON.stringify(data[dataKey]));
			dataToInsert.push(dataContent);
		});

		return `{
			${dataToInsert.join('\n\t\t\t')}
		}`;
	}

	async parseSharedProps () {

		const sharedPropsContent = this.project.addSourceFileAtPath(path.resolve(
			this.packagesFolderPath,
			'Shared', 'SharedProps.ts',
		)).getText(true);

		this.docFlags.en += this.extractDocFlags(sharedPropsContent).en;
		this.docFlags.fr += this.extractDocFlags(sharedPropsContent).fr;

		const sharedPropsFile = this.project.getSourceFileOrThrow(path.resolve(this.packagesFolderPath, 'Shared', 'SharedProps.ts'));

		const sharedPropsClass = sharedPropsFile.getClassOrThrow('SharedProps');
		sharedPropsClass.getStaticProperties().forEach((prop) => {
			const propName = prop.getName(); // Nom de la propriété statique
			const initializer = prop.getInitializer();

			if (initializer?.getKindName() === 'ObjectLiteralExpression') {
				initializer.getProperties().forEach((child) => {
					if (Node.isPropertyAssignment(child)) {
						const name = child.getName();
						const desc = this.getPropsDesciption(name);
						const value = child.getInitializer()?.getText().replace(/as Orion.*/, '');
						const type = child.getType().getText().replace(/as Orion.*/, '');
						sharedProps.set(name, {
							name,
							type,
							name,
							desc,
							defaultValue: value || 'undefined',
						});
					}
				});
			}
		});
	}
}


class VueFileScanner extends DocScanner {
	constructor (...args) {
		super(...args);
	}

	async createTsMorphTmpFile () {
		this.vue = await readFile(path.resolve(
			this.packagesFolderPath,
			this.pack,
			'src',
			`Orion${this.pack}.vue`,
		), { encoding: 'utf-8' });
		const groups = /<script\s+setup\s+lang="ts"(?:\s+generic="([^"]*)")?\s*>(?<content>(.|\n)*)<\/script>/gm.exec(this.vue)?.groups;
		const vueScript = groups?.content;
		this.file = this.project.createSourceFile('tmp/tmp.ts', vueScript, { overwrite: true });
	}

	async scan () {
		await this.createTsMorphTmpFile();
		this.docFlags.en = this.extractDocFlags(this.vue).en;
		this.docFlags.fr = this.extractDocFlags(this.vue).fr;

		return {
			localTypes: this.getLocalTypes(),
			provide: this.getProvide(),
			slots: this.getSlots(),
			vModel: this.getVmodels(),
		};
	}

	getLocalTypes () {
		this.localTypes = {};

		this.file.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration).forEach((type) => {
			this.localTypes[type.getName()] = type
				.getFirstChildByKind(SyntaxKind.Identifier)
				.getNextSiblings()
				.filter(x => x.getKind() !== SyntaxKind.EqualsToken)
				?.[0].getText();
		});

		if (this.options?.verbose) {
			if (Object.keys(this.localTypes).length) {
				note(this.localTypes);
			} else {
				log.warn('No Types has been declared in vue file');
			}
		}

		return this.localTypes;
	}

	getProvide () {
		const provide = [];

		this.file.getDescendantsOfKind(SyntaxKind.CallExpression)
			.filter(x => x.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText() === 'provide')
			.forEach((x) => {
				provide.push({
					name: x.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().replace(cleanString, ''),
					data: x.getFirstDescendantByKind(SyntaxKind.PropertyAccessExpression)?.getText().replace('setup.publicInstance', 'publicInstance'),
				});
			});

		if (this.options?.verbose) {
			if (Object.keys(provide).length) {
				note(provide.join('\n'));
			} else {
				log.warn('No Types has been declared in vue file');
			}
		}

		return provide;
	}

	getSlots () {
		const slots = [];

		const vueTemplate = this.vue.match(/<template>((.|\n)*)<\/template>/gm)?.[0];
		vueTemplate.match(/<slot(?:.|\s)*?(?:(\/>)|(<\/slot>))/g)?.map((x) => {
			return x.replace(/\t{2,}/g, '').replace(/\n/g, ' ');
		}).forEach((x) => {
			if (this.options?.verbose) log.message(x);

			const slotOpeningTag = x.match(/<slot[^>]*>/)[0];
			const name = /name="([^"]*)"/g.exec(slotOpeningTag)?.[1] ?? 'default';
			const useVBind = /v-bind/.test(slotOpeningTag);
			let bindings = slotOpeningTag.match(/:([\w-]*)="[^"]*"/g)?.map(x => /:([^=]*)/.exec(x)[1]) ?? [];

			if (useVBind) {
				const regexDocBinds = new RegExp(`slot\/(${name})\/(?<bind>[^/]*)\/`, 'g');
				const detectedBinds = (this.docFlags.en.match(regexDocBinds) ?? [])
					.map(x => regexDocBinds.exec(x)?.groups?.bind)
					.filter(x => !!x);

				bindings.push(...detectedBinds);
			}

			bindings = unique(bindings);

			slots.push(this.getSlotsDetails(name, bindings));
		});

		return slots;
	}

	getVmodels () {
		const modelRefs = this.file.getVariableDeclarations()?.map((variable) => {
			const initializer = variable.getInitializer();
			if (!initializer) return;

			// Vérifier si c'est un appel à defineModel<T>()
			if (!initializer.getText().startsWith('defineModel<')) return;

			// Récupérer le type générique
			const typeArgument = initializer.getTypeArguments()[0]?.getText() || 'unknown';

			// Vérifier s'il y a un deuxième argument (objet d'options avec default)
			let defaultValue = null;
			const args = initializer.getArguments();
			if (args.length > 1) {
				const optionsArg = args[1];
				if (optionsArg.getKind() === SyntaxKind.ObjectLiteralExpression) {
					const defaultProp = optionsArg.getProperty('default');
					if (defaultProp?.getKind() === SyntaxKind.PropertyAssignment) {
						defaultValue = defaultProp.getInitializer()?.getText() || null;
					}
				}
			}
			return {
				name: variable.getName(),
				type: typeArgument,
				desc: this.getvModelDesciption(variable.getName()),
				defaultValue: defaultValue ?? 'undefined',
			};
		}).filter(x => !!x);

		return modelRefs;
	}

	getvModelDesciption (/** @type {string} */ name) {
		return this.getDoc(`^vModel\/${name} (.*)$`);
	}

	getSlotsDetails (/** @type {string} */ name, /** @type {string[]} */ bindings) {
		const desc = this.getDoc(`^slot\/${name} (.*)$`);

		bindings = bindings.map((bind) => {
			const type = this.getDoc(`^slot\/${name}\/${bind}\/type (.*)$`).en;
			const desc = this.getDoc(`^slot\/${name}\/${bind}\/desc (.*)$`);

			return {
				bind,
				type,
				desc,
			};
		});

		return {
			name,
			desc,
			bindings,
		};
	}
}

class SetupServiceDtsFileScanner extends DocScanner {
	packagesFolderPath = path.resolve(__dirname, '../../dist/types/packages');
	tsFileFolderPath = path.resolve(__dirname, '../../packages');
	tsFile;

	constructor (...args) {
		super(...args);

		this.draft = this.project.createSourceFile('draft.ts', '', {
			overwrite: true,
			scriptKind: ScriptKind.TS,
		});
	}

	addFileToTsMorphProject () {
		this.file = this.project.addSourceFileAtPath(path.resolve(
			this.packagesFolderPath,
			this.pack,
			'src',
			`Orion${this.pack}SetupService.d.ts`,
		));
	}

	scan () {
		this.addFileToTsMorphProject();
		const packClass = this.file.getClass(`Orion${this.pack}SetupService`);
		const publicInstance = this.extractPublicIntance(this.getPublicInstance(packClass));

		return { publicInstance };
	}

	getPublicInstance (/** @type {import('ts-morph').ClassDeclaration} */ packClass) {
		const publicInstance = packClass.getGetAccessor('publicInstance');

		if (!publicInstance) {
			return this.getSharedPublicInstance(packClass);
		}

		return publicInstance;
	}

	getSharedPublicInstance (/** @type {import('ts-morph').ClassDeclaration} */ packClass) {
		const sharedClass = packClass.getExtends().getFirstDescendantByKind(SyntaxKind.Identifier).getText();

		const source = this.project.addSourceFileAtPath(path.resolve(
			this.packagesFolderPath,
			'Shared',
			`${sharedClass}.d.ts`,
		));

		return this.getPublicInstance(source.getClass(sharedClass));
	}

	extractPublicIntance (/** @type {import('ts-morph').GetAccessorDeclaration} */ accessor) {
		if (/^get publicInstance.*any;$/gm.test(accessor.getText())) return;

		return accessor
			.getLastChildByKind(SyntaxKind.TypeLiteral)
			?.getProperties()
			.map(x => ({
				name: x.getName(),
				type: this.handleNameSpecificCases(x.getName())
					?? this.handleTypeSpecificCases(
						x.getFirstChildByKind(SyntaxKind.ColonToken)
							.getNextSibling()
							.getText(),
					),
			}));
	}

	handleNameSpecificCases (/** @type {string} */ name) {
		if (name === '_loader') return '() => OrionLoader';
		if (name === 'bus') return 'Bus';
		if (name === 'icon') return 'Orion.Icon';
		if (name === 'options') return 'Orion.Popable.Options';
	}

	handleTypeSpecificCases (/** @type {string} */ type) {
		if (/^import\("lodash"\)\.DebouncedFuncLeading<.*>$/.test(type)) {
			return 'Lodash.debounce';
		}

		let indent = '';
		type = type.split('\n')
			.map(x => x.replace(/\s{2,}/g, ''))
			.map((x, index, array) => {
				if (/^\}/.test(x)) indent = indent.replace(/\t$/, '');
				const res = (index > 0 && index < array.length - 1) ? `${indent}${x}` : x;
				if (/\{$/.test(x)) indent += '\t';
				return res;
			})
			.join('\n');

		return type;
	}

	async readTsTmpFile () {
		this.tsFile = await readFile(path.resolve(
			this.tsFileFolderPath,
			this.pack,
			'src',
			`Orion${this.pack}.vue`,
		), { encoding: 'utf-8' });
	}
}


class SetupServiceFileScanner extends DocScanner {

	fullText;

	constructor (...args) {
		super(...args);
	}

	addFileToTsMorphProject () {
		this.file = this.project.addSourceFileAtPath(path.resolve(
			this.packagesFolderPath,
			this.pack,
			'src',
			`Orion${this.pack}SetupService.ts`,
		));

		this.fullText = this.file.getText(true);
	}

	scan () {
		this.props = new Map();
		this.addFileToTsMorphProject();
		this.docFlags = this.extractDocFlags(this.fullText);
		const props = this.extractPropsFromClassDeclaration();
		const events = this.extractEmitsFromClassDeclaration();
		return {
			props: props.props,
			events: events,
		};
	}

	resolveSpreadProps (expression) {
		const resolvedProps = {};
		if (Node.isPropertyAccessExpression(expression)) {
			const className = expression.getExpression().getText();
			const propertyName = expression.getName();

			// Charger la classe ou l'objet correspondant
			const referencedClass = this.file.getClass(className) ||
            this.project.getSourceFileOrThrow(path.resolve(this.packagesFolderPath, 'Shared', `${className}.ts`)).getClassOrThrow(className);

			const sharedPropsContent = this.project.addSourceFileAtPath(path.resolve(
				this.packagesFolderPath,
				'Shared',
				`${className}.ts`)).getText(true);

			this.docFlags.en += this.extractDocFlags(sharedPropsContent).en;
			this.docFlags.fr += this.extractDocFlags(sharedPropsContent).fr;

			if (referencedClass) {
				const defaultPropsProperty = referencedClass.getStaticProperty(propertyName);
				if (defaultPropsProperty) {
					const initializer = defaultPropsProperty.getInitializer();

					if (initializer?.getKindName() === 'ObjectLiteralExpression') {
						initializer.getProperties().forEach((prop) => {
							if (Node.isPropertyAssignment(prop)) {
								const name = prop.getName();
								const desc = this.getPropsDesciption(name);
								const value = prop.getInitializer()?.getText().replace(/as Orion.*/, '');
								const type = prop.getType().getText().replace(/as Orion.*/, '');

								resolvedProps[name] = {
									name,
									type,
									desc,
									defaultValue: value || 'undefined',
								};
							}
						});
					}
				}
			}
		}

		return resolvedProps;
	}

	parseDefaultProps () {
		const classDeclaration = this.file.getClassOrThrow(`Orion${this.pack}SetupService`);
		const defaultPropsProperty = classDeclaration.getStaticPropertyOrThrow('defaultProps');
		const initializer = defaultPropsProperty.getInitializer();

		const resolvedProps = {};

		if (initializer?.getKindName() === 'ObjectLiteralExpression') {
			initializer.getProperties().forEach((prop) => {
				if (Node.isPropertyAssignment(prop)) {
					const name = prop.getName();
					const desc = this.getPropsDesciption(name);
					const value = prop.getInitializer()?.getText().replace(/as Orion.*/, '');
					const type = prop.getType().getText().replace(/as Orion.*/, '');

					resolvedProps[name] = {
						name,
						type,
						desc,
						defaultValue: value || 'undefined',
					};
				} else if (Node.isSpreadAssignment(prop)) {
					const expression = prop.getExpression();
					const spreadProps = this.resolveSpreadProps(expression);

					// Fusionner les propriétés résolues avec celles existantes
					Object.keys(spreadProps).forEach((key) => {
						if (!resolvedProps[key]) {
							resolvedProps[key] = spreadProps[key];
						}
					});
				}
			});
		}

		return resolvedProps;
	}

	extractPropsFromClassDeclaration () {
		const fileTypeAlias = this.file.getTypeAliasOrThrow(`Orion${this.pack}Props`);

		let type = fileTypeAlias.getType();

		//HANDLE DEFAULT PROPS
		const defaultProps = this.parseDefaultProps();

		const properties = {};

		// PARSE PROPS IN FILE
		type.getProperties().forEach((prop) => {
			const name = prop.getName();
			const desc = this.getPropsDesciption(name);

			const valueDeclaration = prop.getValueDeclaration();
			let type = 'unknown';

			if (valueDeclaration) {
				type = valueDeclaration.getTypeNode().getText().replace(/as Orion.*/, '');
			} else {
				const symbolType = prop.getTypeAtLocation(this.file);
				type = symbolType.getText().replace(/as Orion.*/, '');
			}

			if (! desc.private) {
				properties[name] = {
					name,
					type,
					desc,
				};

				// Add sharedProps value
				properties[name].defaultValue = sharedProps.get(name)?.defaultValue;
				properties[name].desc = sharedProps.get(name)?.desc ?? properties[name].desc;
			}
		});


		const mergedProps = { ...properties };

		for (const key in defaultProps) {
			if (mergedProps[key]) {
				mergedProps[key].defaultValue = defaultProps[key].defaultValue;
			}
		}

		return { props: Object.values(mergedProps).sort((a, b) => a.name.localeCompare(b.name)) };
	}

	extractEmitsFromClassDeclaration () {
		const fileTypeAlias = this.file.getTypeAliasOrThrow(`Orion${this.pack}Emits`);
		let type = fileTypeAlias.getType();

		const callSignatures = type.getCallSignatures();

		const events = [];

		// PARSE EVENTS IN FILE
		for (const signature of callSignatures) {
			const params = signature.getParameters();

			const [eventParam, payloadParam] = params;

			const eventDecl = eventParam?.getDeclarations()[0];
			const payloadDecl = payloadParam?.getDeclarations()[0];

			const name = eventDecl?.getType().getLiteralValue?.(); // e.g. 'click'
			const payloadTypeText = payloadDecl?.getType().getText();
			if (typeof name === 'string') {
				events.push({
					name,
					payload: payloadTypeText,
					desc: this.getEventDescription(name),
				});
			}
		}


		return events;
	}

	getDesc (name) {
		if (this.props.has(name)) {
			let desc = this.props.get(name)?.desc;
			if (typeof desc === 'string') desc = desc.replace(cleanString, '');
			return String(desc);
		} else {
			return 'Props description value missing';
		}
	}

	getPropsDesciption (/** @type {string} */ name) {
		const desc = this.getDoc(`^props\/${name} (.*)$`);
		return desc;
	}

	getvModelDesciption (/** @type {string} */ name) {
		const desc = this.getDoc(`^vModel\/${name} (.*)$`);
		return desc;
	}

	getEventDescription (/** @type {string} */ name) {
		const desc = this.getDoc(`^event\/${name}/desc (.*)$`);
		return desc;
	}
}


class ServiceFileScanner extends DocUtility {
	servicesDataDocFile = [];
	toolsDataDocFile = [];

	constructor (/** @type {Options} */ options) {
		super();
		this.options = options;

		this.docFolderPath = path.resolve(__dirname, '../../docs');
		this.docFolderRelativePath = this.docFolderPath.replace(process.cwd(), '');
	}

	async setServicesList () {
		this.services = (await readdir(this.servicesFolderPath)).filter((x) => {
			return (/\.ts/).test(x) && !x.match('index.ts');
		});
	}

	extractClass (/** @type {string} */ text) {
		const result = new Map();
		// REGEX to capture the content of each class of Monkey
		const regex = /.* extends (?<type>\w*).* {(\n.*\n*)*class/g;

		var match;
		while (match = regex.exec(text)) {
			result.set(match.groups?.type, this.extractJSDocTags(match));
		}
		return result;
	}

	extractJSDocTags (/** @type {string} */ text, tools = false) {
		const result = new Map();
		const regex = /(\/\*{2})(?<comment>(.|\s)*?)(\*\/)\s*(?<function>\w+)/g;
		const regexTools = /(\/\*{2})(?<comment>(.|\s)*?)(\*\/)\s*export( async)? function (?<function>\w+)/g;

		var match;
		while (match = tools ? regexTools.exec(text)?.groups : regex.exec(text)?.groups) {
			result.set(match.function, this.parseServiceComment(match.comment));
		}
		return result;
	}

	parseServiceComment (/** @type {string} */ comment) {
		const result = new Map();
		var params = [];
		var paramFormatted = [];
		const regex = /((@desc\s)(?<description>.+))|(@param\s)(?<param>.+)|((@return\s)(?<return>.+))|((@deprecated\s)(?<deprecated>.+))/g;
		const regexParam = /{(?<type>.+)}\s+((?<name>\w+)|(\[(?<nameWith>\w+)=(?<value>.+)\]))\s+(?<description>.*)/g;

		result.set('description', comment.match(regex)?.find(x => /@desc/.test(x))?.replace(/@desc\s*/, ''));
		result.set('return', comment.match(regex)?.find(x => /@return/.test(x))?.replace(/@return\s*/, ''));
		result.set('deprecated', comment.match(regex)?.find(x => /@deprecated/.test(x))?.replace(/@deprecated\s*/, ''));
		params = comment.match(regex)?.filter(x => /@param/.test(x)).map(x => x.replace(/@param\s*/, ''));

		params.filter((x) => {
			var match;
			while (match =regexParam.exec(x)?.groups) {
				var format = {
					name: match.name ?? match.nameWith,
					type: match.type,
					defaultValue: match.value,
					description: match.description,
				};
				paramFormatted.push(format);
			}
		});

		if (paramFormatted !== []) result.set('param', paramFormatted);

		return result;
	}

	parseDesc (desc) {
		const regex = /(\*\s@desc\s)(?<description>.*)/g;
		const result = [];
		var match;
		while (match = regex.exec(desc)?.groups) {
			result.push(match.description);
		}
		return result;
	}

	async writeFileServicesDataDocFile () {
		const filePath = path.resolve(this.docFolderPath, 'services-doc-data.ts');
		let content = await readFile(path.resolve(__dirname, 'templates/services-doc-data.tstemplate'), { encoding: 'utf-8' });

		content = content.replace(/{data}/gm, this.servicesDataDocFile.map((service) => {
			return packageDocDataTemplate
				.replace(/{packageName}/gm, service.service)
				.replace(/{packageData}/gm, this.formatServiceDataForWriteFile(service.data, service.service === 'Monkey'));
		}).join('\n\t'));

		if (this.options.verbose) {
			note(`🥨 --> Orion would write following content in ${this.docFolderRelativePath}`);
			log.message(content);
		}

		if (!this.options.dryRun) {
			await mkdir(this.docFolderPath, { recursive: true });
			await writeFile(filePath, content, 'utf8');
			log.step(`🥨 --> Lint output file for Services`);
			exec(`npx eslint --fix "${filePath}"`);
		}
	}

	async writeFileToolsDataDocFile () {
		const filePath = path.resolve(this.docFolderPath, 'tools-doc-data.ts');
		let content = await readFile(path.resolve(__dirname, 'templates/tools-doc-data.tstemplate'), { encoding: 'utf-8' });

		content = content.replace(/{data}/gm, this.formatToolsDataForWriteFile(this.toolsDataDocFile[0].data));

		if (this.options.verbose) {
			note(`🥨 --> Orion would write following content in ${this.docFolderRelativePath}`);
			log.message(content);
		}

		if (!this.options.dryRun) {
			await mkdir(this.docFolderPath, { recursive: true });
			await writeFile(filePath, content, 'utf8');
			log.step(`🥨 --> Lint output file for Tools`);
			exec(`npx eslint --fix "${filePath}"`);
		}
	}

	formatServiceDataForWriteFile (/** @type {PackageData} */ data, isMonkey = false) {
		const dataToInsert = [];
		data.forEach(function (value, key) {
			if (isMonkey) {
				let dataContent = `'${key}': { {value} },`;
				const monkeyToInsert = [];
				let content = '';
				value.forEach(function (desc, funct) {
					content += `${funct}: ${JSON.stringify(Object.fromEntries(desc))},\n`;
					monkeyToInsert.push(content);
				});
				dataContent = dataContent
					.replace(/{value}/gm, content),
				dataToInsert.push(dataContent);
			} else {
				let dataContent = `${key}: {value},`;
				dataContent = dataContent
					.replace(/{value}/gm, JSON.stringify(Object.fromEntries(value)));
				dataToInsert.push(dataContent);
			}
		});

		return `{
			${dataToInsert.join('\n\t\t\t')}
		}`;
	}

	formatToolsDataForWriteFile (/** @type {PackageData} */ data) {
		const dataToInsert = [];
		data.forEach(function (value, key) {
			let dataContent = `${key}: {value},`;
			dataContent = dataContent
				.replace(/{value}/gm, JSON.stringify(Object.fromEntries(value)));
			dataToInsert.push(dataContent);
		});

		return `{
			${dataToInsert.join('\n\t\t\t')}
		}`;
	}

	async scanServices () {
		await this.setServicesList();

		const scanSpinner = spinner();
		scanSpinner.start(`Scanning ${this.services.length} services`);
		await sleep(1000);

		for await (const service of this.services) {
			const serviceFile = await readFile(path.resolve(
				this.servicesFolderPath,
				service,
			), { encoding: 'utf-8' });

			const serviceData = this.extractJSDocTags(serviceFile);
			const serviceName = service.split('Service.ts')[0];
			this.servicesDataDocFile.push({
				service: serviceName,
				data: serviceName === 'Monkey' ? this.extractClass(serviceFile) : serviceData,
			});
		}

		scanSpinner.stop(`${this.services.length} services scanned`);

		const toolsSpinner = spinner();
		toolsSpinner.start(`Scanning tools`);
		await sleep(1000);

		const toolsFile = await readFile(path.resolve(
			this.toolsFolderPath,
			'tools.ts',
		), { encoding: 'utf-8' });

		const toolsData = this.extractJSDocTags(toolsFile, true);
		this.toolsDataDocFile.push({ data: toolsData });

		toolsSpinner.stop(`Tools scanned`);
	}
}


class globalTypeFileScanner extends DocUtility {
	globalTypesDataDocFile = [];

	constructor (/** @type {Options} */ options) {
		super();
		this.options = options;

		this.docFolderPath = path.resolve(__dirname, '../../docs');
		this.libFolderPath = path.resolve(__dirname, '../../lib');
		this.libFolderRelativePath = this.libFolderPath.replace(process.cwd(), '');
	}

	async scanGlobalTypes () {
		let globalData = await this.extractNamespace('global.d.ts');
		const privateData = await this.extractNamespace('private.d.ts');
		globalData = globalData.concat(privateData);

		const typesSpinner = spinner();
		typesSpinner.start(`Scanning types`);
		await sleep(1000);

		this.globalTypesDataDocFile.push({ data: globalData });
		typesSpinner.stop(`Types scanned`);
	}

	async extractNamespace (filename) {
		var file = await readFile(path.resolve(
			this.libFolderPath,
			filename,
		), { encoding: 'utf-8' });

		/** @type { { ns: string, type: string, generic: string, description: string}[] } */
		const types = [];
		var currentNS = 'global';
		var currentNSBracket = 0;

		function ns (line, bracketCount) {
			if (match = singleTypeRegex.exec(line)?.groups) {
				types.push({
					ns: currentNS,
					type: match.name,
					generic: match.parameter ?? '',
					description: match.description,
				});
			} else if (line.includes('namespace')) {
				var namespace = line.split('namespace')[1].split(' ')[1];
				currentNS = currentNS === 'global' ? namespace : currentNS +`.${namespace}`;
				currentNSBracket = bracketCount;
			} else {
				if (types[types.length - 1]?.description && (bracketCount > (currentNSBracket - 1)))
					types[types.length - 1].description += ' \n' + line;
			}
		}


		var fileArray = file.split('\n');
		var i = 0;
		var bracketCount = 0;
		const singleTypeRegex = /\s*type\s*(?<name>\w*)(<(?<parameter>.*)>)? = (?<description>(\w+<.*\s*.*\s*}>)|(.*);?\n?)/g;
		for (i in fileArray) {
			var line = fileArray[i];
			var match;

			bracketCount += (line.match(/{/g) || []).length;
			bracketCount -= (line.match(/}/g) || []).length;


			ns(line, bracketCount);

			if ((line.match(/}/g) || []).length && bracketCount === (currentNSBracket - 1)) {
				currentNS = currentNS.split('.').slice(0, -1).join('.');
			}
		}
		return types;
	}

	async writeFileTypesDataDocFile () {
		const filePath = path.resolve(this.docFolderPath, 'global-types-doc-data.ts');
		let content = await readFile(path.resolve(__dirname, 'templates/global-types-doc-data.tstemplate'), { encoding: 'utf-8' });

		content = content.replace(/{data}/gm, this.formatTypesDataForWriteFile(this.globalTypesDataDocFile[0].data));

		if (this.options.verbose) {
			note(`🥨 --> Orion would write following content in ${this.docFolderRelativePath}`);
			log.message(content);
		}

		if (!this.options.dryRun) {
			await mkdir(this.docFolderPath, { recursive: true });
			await writeFile(filePath, content, 'utf8');
			log.warn(`🥨 --> Lint output file for global types`);
			exec(`npx eslint --fix "${filePath}"`);
		}
	}

	formatTypesDataForWriteFile (/** @type {{ ns: string, type: string, generic: string, description: string}[]} */data) {
		const dataToInsert = [];
		const result = new Map();
		data.forEach((element) => {
			if (result.has(element.ns))
				result.set(element.ns, [...result.get(element.ns), element]);
			else
				result.set(element.ns, [element]);
		});

		result.forEach(function (value, key) {
			let dataContent = `'${key}': {value},`;
			dataContent = dataContent
				.replace(/{value}/gm, JSON.stringify(value));
			dataToInsert.push('\n' + dataContent);
		});


		return `{
			${dataToInsert.join('\n\t\t\t')}
		}`;
	}

}

if (require.main === module) {
	module.exports.default({});
}

module.exports.scanner = {
	SetupServiceFileScanner,
	VueFileScanner,
};
