export default function ImageUploader({ label = 'Upload', onChange }) {
	return (
		<label style={{ display: 'block' }}>
			<div style={{ marginBottom: 8 }}>{label}</div>
			<input
				type="file"
				accept="image/*"
				onChange={(e) => onChange?.(e.target.files?.[0] || null)}
			/>
		</label>
	);
}
