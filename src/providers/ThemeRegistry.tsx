'use client';
import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

type NextAppDirEmotionCacheProviderProps = {
	CacheProvider?: (props: {
		value: EmotionCache;
		children: React.ReactNode;
	}) => React.JSX.Element | null;
	children: React.ReactNode;
};

const theme = createTheme({
	// Colors
	palette: {},
	// Custom font
	typography: {},
	// Components
	components: {},
});

const cacheOptions = { key: 'mui' };

export const ThemeRegistry = (
	props: NextAppDirEmotionCacheProviderProps
): React.JSX.Element => {
	const { children } = props;

	const [{ cache, flush }] = useState(() => {
		const cache = createCache(cacheOptions);
		cache.compat = true;
		const prevInsert = cache.insert;
		let inserted: string[] = [];
		cache.insert = (...args) => {
			const serialized = args[1];
			if (cache.inserted[serialized.name] === undefined) {
				inserted.push(serialized.name);
			}
			return prevInsert(...args);
		};
		const flush = (): string[] => {
			const prevInserted = inserted;
			inserted = [];
			return prevInserted;
		};
		return { cache, flush };
	});

	useServerInsertedHTML(() => {
		const names = flush();
		if (names.length === 0) {
			return null;
		}
		let styles = '';
		for (const name of names) {
			styles += cache.inserted[name];
		}
		return (
			<style
				key={cache.key}
				data-emotion={`${cache.key} ${names.join(' ')}`}
				dangerouslySetInnerHTML={{
					__html: styles,
				}}
			/>
		);
	});

	return (
		<CacheProvider value={cache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</CacheProvider>
	);
};
