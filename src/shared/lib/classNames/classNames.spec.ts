import { classNames } from './classNames'

describe('classNames', () => {
	test('With only first param', () => {
		expect(classNames('someClass')).toBe('someClass')
	})
	test('With additional class', () => {
		const expected = 'someClass additional additional-2'
		expect(classNames('someClass', {}, ['additional', 'additional-2']))
			.toBe(expected)
	})
	test('With mods', () => {
		const expected = 'someClass mod hovered'
		expect(classNames('someClass', { mod: true, hovered: true }))
			.toBe(expected)
	})
	test('With mods and some mods are false', () => {
		const expected = 'someClass class1 class2 mod hovered'
		expect(classNames(
			'someClass',
			{ mod: true, hovered: true, noMod: false, clickable: false },
			['class1', 'class2']
		)).toBe(expected)
	})
	test('With mods undefined', () => {
		const expected = 'someClass class1 class2 mod hovered'
		expect(classNames(
			'someClass',
			{ mod: true, hovered: true, noMod: false, clickable: undefined },
			['class1', 'class2']
		)).toBe(expected)
	})
})