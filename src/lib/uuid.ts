export default function uuid() {
	return String(self.crypto.randomUUID());
}
