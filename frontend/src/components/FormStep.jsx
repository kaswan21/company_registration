export default function FormStep({ title, children }) {
	return (
		<section>
			{title ? <h2>{title}</h2> : null}
			<div>{children}</div>
		</section>
	);
}
