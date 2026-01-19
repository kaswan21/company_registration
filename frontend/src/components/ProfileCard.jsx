export default function ProfileCard({ title, children }) {
	return (
		<div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
			{title ? <h3 style={{ marginTop: 0 }}>{title}</h3> : null}
			{children}
		</div>
	);
}
