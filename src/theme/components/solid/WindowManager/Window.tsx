import { WindowShell, type WindowShellProps } from './WindowShell'

export function Window(props: Omit<WindowShellProps, 'children'>) {
	return (
		<WindowShell {...props}>
			<iframe
				class="h-full w-full rounded-inherit"
				src={props.url.toString()}
				title={props.title}
			/>
		</WindowShell>
	)
}
