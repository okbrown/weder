'use strict'

export const _replace = (text, regex) => text.replace(regex, '');

export const _trim = text => text.trim();

export const getTextValues = (element, arr = []) => {
	element.text((i,v) => {
		arr[i] = v
	})
	return arr;
}

export const getEachAttrib = (element, type, arr = []) => {
	element.each((i, v) => {
		arr[i] = v.attribs[type]
	});
	return arr;
}